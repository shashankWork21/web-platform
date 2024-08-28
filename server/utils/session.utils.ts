import jwt, { JwtPayload } from "jsonwebtoken";
import type { LoginSource, Session, User } from "@prisma/client";
import { comparePassword } from "./password";
import { environment } from "./environment";
import { db } from "../db";
import axios from "axios";
import { getClient } from "./auth.utils";

const accessTokenSecret = environment.tokenSecret as string;
const refreshTokenSecret = environment.refreshTokenSecret as string;
const sessionSecret = environment.sessionSecret as string;

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

export async function generateSessionToken(
  user: User,
  accessToken: string,
  refreshToken: string,
  loginSource: LoginSource
) {
  try {
    const endsAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

    const existingSession = await db.session.findFirst({
      where: { userId: user.id },
    });

    if (existingSession) {
      const updatedSession = await db.session.update({
        where: { id: existingSession.id },
        data: { accessToken, refreshToken, endsAt, loginSource },
      });

      return jwt.sign(
        { id: updatedSession.id, loginSource: updatedSession.loginSource },
        sessionSecret,
        {
          expiresIn: "4h",
        }
      );
    }

    const session = await db.session.create({
      data: {
        userId: user.id,
        accessToken,
        refreshToken,
        endsAt,
        loginSource,
      },
    });

    return jwt.sign(
      { id: session.id, loginSource: session.loginSource },
      sessionSecret,
      {
        expiresIn: "4h",
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error("Blah");
  }
}

export function validateAccessTokenPassword(session: Session) {
  jwt.verify(session.accessToken, accessTokenSecret);
  return jwt.sign(
    { id: session.id, loginSource: session.loginSource },
    sessionSecret,
    {
      expiresIn: "4h",
    }
  );
}

export async function refreshAccessTokenPassword(session: Session) {
  const user = jwt.verify(session.refreshToken as string, refreshTokenSecret);
  const accessToken = jwt.sign(user, accessTokenSecret, {
    expiresIn: "4h",
  });

  session = await db.session.update({
    where: { id: session.id },
    data: { accessToken },
  });

  return jwt.sign(
    { id: session.id, loginSource: session.loginSource },
    sessionSecret,
    {
      expiresIn: "4h",
    }
  );
}

export async function validateAccessTokenGoogle(
  session: Session,
  accessToken: string
) {
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
    throw new Error("No user found");
  }

  const sessionToken = jwt.sign(
    { id: session.id, loginSource: session.loginSource },
    sessionSecret,
    {
      expiresIn: "4h",
    }
  ) as string;
  return sessionToken;
}

export async function refreshAccessTokenGoogle(
  authClient: any,
  session: Session
) {
  const data = await authClient.refreshAccessToken();
  if (!data) {
    throw new Error("There's no refresh token, or it's expired");
  }
  session = await db.session.update({
    where: { id: session.id },
    data: {
      accessToken: data.credentials.access_token as string,
      refreshToken: data.credentials.refresh_token as string,
    },
  });

  return await validateAccessTokenGoogle(
    session,
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
  })) as Session;
  const user = (await db.user.findUnique({
    where: { id: session.userId },
  })) as User;
  if (!session || !user) {
    throw new Error("Unauthorized");
  }
  return { session, user };
}

export async function validatePasswordSession(user: User, session: Session) {
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

export async function validateGoogleSession(user: User, session: Session) {
  try {
    if (session.endsAt.getTime() < Date.now()) {
      throw new Error("Session Expired");
    }

    const authClient =
      user.role === "USER"
        ? getClient(environment.redirectUri)
        : getClient(environment.redirectUriAdmin);

    authClient.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    });

    try {
      const sessionToken = await validateAccessTokenGoogle(
        session as Session,
        authClient.credentials.access_token as string
      );
      return { user, sessionToken };
    } catch (error) {
      try {
        const sessionToken = await refreshAccessTokenGoogle(
          authClient,
          session as Session
        );
        return { user, sessionToken };
      } catch (error) {
        throw new Error("You must login again");
      }
    }
  } catch (error) {
    throw new Error("You must login again");
  }
}

export async function deleteExpiredSessions() {
  try {
    const expiredSessions = await db.session.deleteMany({
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
