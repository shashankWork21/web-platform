import { Request, Response } from "express";
import { db } from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { environment } from "../utils/environment";
import {
  generateSessionToken,
  generateTokens,
  verifyPasswordDetails,
  getUserFromSessionToken,
  validatePasswordSession,
  validateGoogleSession,
  getSesssionTokenFromCookie,
} from "../utils/session.utils";

import type { User } from "@prisma/client";
import { exclude } from "../utils/exclude";

const oauthSecret = environment.oauthSecret as string;

export async function createSessionWithEmailAndPassword(
  request: Request,
  response: Response
) {
  try {
    const { email, password } = request.body;
    console.log(password);
    if (!email || !password) {
      throw new Error("Email and Password required!");
    }
    const user = (await db.user.findUnique({ where: { email } })) as User;
    if (!user) {
      throw new Error("User not found! Please register");
    }
    const isValid = await verifyPasswordDetails(user, password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken } = generateTokens(user);
    const sessionToken = await generateSessionToken(
      user,
      accessToken,
      refreshToken,
      "PASSWORD"
    );

    response.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      domain: "http://localhost:3000",
    });
    return response.status(201).json({ user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(403).json({ error: error.message });
    }
    return response.status(403).json({ error: "Something went wrong" });
  }
}

export async function createSessionWithGoogleLogin(
  request: Request,
  response: Response
) {
  try {
    const googleUserToken = request.query?.google_session as string;
    const userData = jwt.verify(googleUserToken, oauthSecret) as JwtPayload & {
      userId: string;
      accessToken: string;
      refreshToken: string;
      role: string;
      isNewUser: boolean;
    };

    const user = (await db.user.findUnique({
      where: { id: userData.userId },
    })) as User;

    const sessionToken = await generateSessionToken(
      user,
      userData.accessToken,
      userData.refreshToken,
      "GOOGLE"
    );

    let redirectUrl: string;
    if (userData.role === "ADMIN") {
      redirectUrl = environment.adminLink;
    } else {
      if (userData.isNewUser) {
        redirectUrl = environment.newUserLink;
      } else {
        redirectUrl = environment.existingUserLink;
      }
    }

    response.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response.redirect(redirectUrl);
  } catch (error: unknown) {
    console.log(error);
    return response
      .status(403)
      .json({ error: "Invalid user credentials. Try again" });
  }
}

export async function deleteSession(request: Request, response: Response) {
  try {
    const sessionToken = request.headers.authorization as string;
    const { session } = await getUserFromSessionToken(sessionToken);
    await db.session.delete({ where: { id: session.id } });
    response.cookie("session", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response
      .status(200)
      .json({ status: "Session deleted successfully" });
  } catch (error) {
    return response.status(404).json({ error: "Session expired" });
  }
}

export async function validateSession(request: Request, response: Response) {
  try {
    const sessionToken = getSesssionTokenFromCookie(
      request.headers.cookie as string
    );
    const { user: initialUser, session } = await getUserFromSessionToken(
      sessionToken
    );
    const { loginSource } = session;
    let updatedSessionToken: string, user: User, validationResult: any;
    switch (loginSource) {
      case "PASSWORD":
        validationResult = await validatePasswordSession(
          initialUser as User,
          session
        );
        break;
      case "GOOGLE":
        validationResult = await validateGoogleSession(
          initialUser as User,
          session
        );
    }
    updatedSessionToken = validationResult.sessionToken;
    user = validationResult.user;
    response.cookie("session", updatedSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response
      .status(200)
      .json({ user: exclude(user, ["adminCredentials", "password"]) });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(403).json({ error: error.message });
    } else {
      return response.status(403).json({ error: "Something went wrong" });
    }
  }
}

export async function deleteAllSessions(request: Request, response: Response) {
  try {
    await db.session.deleteMany({});
    return response
      .status(200)
      .json({ status: "Sessions deleted successfully" });
  } catch (error) {
    return response.status(404).json({ error: "Session expired" });
  }
}
