import jwt, { JwtPayload } from "jsonwebtoken";
import {
  LoginSource,
  type Session,
  type Token,
  type User,
} from "@prisma/client";
import { comparePassword } from "./password";
import { environment } from "./environment";
import { db } from "../db";
import axios from "axios";
import { getClient } from "./auth.utils";

const accessTokenSecret = environment.tokenSecret as string;
const refreshTokenSecret = environment.refreshTokenSecret as string;
const sessionSecret = environment.sessionSecret as string;

export interface SessionWithTokens extends Session {
  tokens: Token[];
}

export async function verifyPasswordDetails(user: User, password: string) {
  const isPasswordVerified = await comparePassword(
    password,
    (user.password as string) || ""
  );
  return !!user && isPasswordVerified;
}

export function generateTokens(user: User) {
  const payload = { id: user.id, email: user.email };
  const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: "4h" });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

export async function generateSessionToken(user: User, tokens: Token[]) {
  try {
    const endsAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

    let session = await db.session.findFirst({
      where: { userId: user.id },
    });

    if (session) {
      session = await db.session.update({
        where: { id: session.id },
        data: {
          endsAt,
          tokens: {
            connect: tokens.map((token) => ({ id: token.id })),
          },
        },
      });

      return session;
    }

    session = await db.session.create({
      data: {
        userId: user.id,
        endsAt,
        tokens: {
          connect: tokens.map((token) => ({ id: token.id })),
        },
      },
    });

    return jwt.sign({ id: session.id }, sessionSecret, {
      expiresIn: "4h",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error("Unable to generate session token");
  }
}

export function validateAccessTokenPassword(session: SessionWithTokens) {
  const token = session.tokens.find(
    (token: Token) => token.loginSource === "PASSWORD"
  );
  jwt.verify(token?.accessToken as string, accessTokenSecret);
  return jwt.sign({ id: session.id }, sessionSecret, {
    expiresIn: "4h",
  });
}

export async function refreshAccessTokenPassword(session: SessionWithTokens) {
  const token = session.tokens.find(
    (token: Token) => token.loginSource === "PASSWORD"
  );
  const user = jwt.verify(token?.refreshToken as string, refreshTokenSecret);
  const accessToken = jwt.sign(user, accessTokenSecret, {
    expiresIn: "4h",
  });
  await db.token.update({
    where: { id: token?.id },
    data: { accessToken },
  });

  return jwt.sign({ id: session.id }, sessionSecret, {
    expiresIn: "4h",
  });
}

export async function validateAccessTokenGoogle(
  accessToken: string
): Promise<boolean> {
  const googleUser = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const user = (await db.user.findUnique({
    where: { email: googleUser.data.email },
    select: {
      id: true,
      email: true,
    },
  })) as User;

  if (!googleUser || !user) {
    return false;
  }
  return true;
}

export async function refreshAccessTokenGoogle(authClient: any) {
  const data = await authClient.refreshAccessToken();
  if (!data) {
    throw new Error("There's no refresh token, or it's expired");
  }
  return await validateAccessTokenGoogle(
    data.credentials.access_token as string
  );
}

export async function getUserFromSessionToken(sessionToken: string) {
  const existingSession = jwt.verify(
    sessionToken,
    sessionSecret
  ) as JwtPayload & {
    id: string;
  };

  const sessionId = existingSession.id;

  let session = (await db.session.findUnique({
    where: { id: sessionId },
    include: { tokens: {} },
  })) as SessionWithTokens;
  const user = (await db.user.findUnique({
    where: { id: session.userId },
  })) as User;
  if (!session || !user) {
    throw new Error("Unauthorized");
  }
  return { session, user };
}

export async function validatePasswordSession(
  user: User,
  session: SessionWithTokens
) {
  try {
    if (session.endsAt.getTime() < Date.now()) {
      throw new Error("Session expired");
    }
    try {
      const sessionToken = validateAccessTokenPassword(session);
      return { sessionToken, user };
    } catch (error) {
      try {
        const sessionToken = await refreshAccessTokenPassword(session);
        return { sessionToken, user };
      } catch (error) {
        throw new Error("You must login again");
      }
    }
  } catch (error: unknown) {
    throw new Error("You must login again");
  }
}

export async function validateGoogleSession(
  user: User,
  session: SessionWithTokens
) {
  try {
    if (session.endsAt.getTime() < Date.now()) {
      await db.session.delete({ where: { id: session.id } });
      throw new Error("Session Expired");
    }

    const googleTokens = session.tokens.filter(
      (token) => token.loginSource === LoginSource.GOOGLE
    );
    for (const token of googleTokens) {
      const authClient = getClient(environment.redirectUri);
      authClient.setCredentials({
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
      });
      try {
        const result = await validateAccessTokenGoogle(
          authClient.credentials.access_token as string
        );

        return { user, session };
      } catch (error) {
        try {
          const sessionToken = await refreshAccessTokenGoogle(authClient);
          await db.token.update({
            where: { id: token.id },
            data: {
              accessToken: authClient.credentials.access_token as string,
            },
          });
          return { user, session };
        } catch (error) {
          await db.token.delete({ where: { id: token.id } });
          throw new Error("You must login again");
        }
      }
    }
  } catch (error) {
    throw new Error("You must login again");
  }
}

export async function deleteExpiredSessions() {
  try {
    await db.session.deleteMany({
      where: { endsAt: { lt: new Date() } },
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export function getSesssionTokenFromCookie(cookie: string) {
  return (
    cookie
      .split(";")
      .find((item) => item.includes("session"))
      ?.split("=")[1] || ""
  );
}
