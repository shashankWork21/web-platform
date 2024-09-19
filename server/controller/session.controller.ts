import { Request, Response } from "express";
import { db } from "../db";
import {
  generateSessionToken,
  generateTokens,
  verifyPasswordDetails,
  getUserFromSessionToken,
  validatePasswordSession,
  validateGoogleSession,
  getSesssionTokenFromCookie,
} from "../utils/session.utils";

import { LoginSource, type User } from "@prisma/client";
import { exclude } from "../utils/exclude";

export async function createSessionWithEmailAndPassword(
  request: Request,
  response: Response
) {
  try {
    const { email, password } = request.body;
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

    const tokens = await db.token.create({
      data: {
        userId: user.id,
        loginSource: "PASSWORD",
        accessToken,
        refreshToken,
        scope: ["EMAIL", "PROFILE"],
      },
    });
    const sessionToken = await generateSessionToken(user, [tokens]);

    response.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response.status(201).json({ user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(403).json({ error: error.message });
    }
    return response.status(403).json({ error: "Something went wrong" });
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
    let updatedSessionToken: string, user: User, validationResult: any;
    if (
      session.tokens.find((token) => token.loginSource === LoginSource.PASSWORD)
    ) {
      validationResult = await validatePasswordSession(
        initialUser as User,
        session
      );
    }
    if (
      session.tokens.find((token) => token.loginSource === LoginSource.GOOGLE)
    ) {
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
    return response.status(200).json({ user: exclude(user, ["password"]) });
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
