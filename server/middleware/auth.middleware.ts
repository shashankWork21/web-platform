import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { environment } from "../utils/environment";
import { db } from "../db";
import type { Session, User } from "@prisma/client";
import { getUserFromSessionToken } from "../utils/session.utils";

const sessionSecret = environment.sessionSecret as string;

export async function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let step: number = 0;
  try {
    const sessionToken = request.headers.authorization as string;
    step++;
    const existingSession = jwt.verify(
      sessionToken,
      sessionSecret
    ) as JwtPayload & {
      id: string;
    };
    step++;

    const id = existingSession.id;
    step++;
    let session = (await db.session.findUnique({
      where: { id },
    })) as Session;
    step++;
    const user = (await db.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    })) as User;
    step++;
    if (user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }
    step++;
    next();
  } catch (error: unknown) {
    console.log(`Step: ${step}`);
    return response
      .status(403)
      .json({ error: "You are not authorized to access this resource" });
  }
}

export async function verifyUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let step: number = 0;
  try {
    const sessionToken = request.headers.authorization as string;
    step++;
    const { user, session } = await getUserFromSessionToken(sessionToken);
    step++;
    next();
  } catch (error: unknown) {
    console.log(`Step: ${step}`);
    return response
      .status(403)
      .json({ error: "You are not authorized to access this resource" });
  }
}

export async function isOwnerOrAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id as string;
    const sessionToken = request.headers.authorization as string;
    const { session, user } = await getUserFromSessionToken(sessionToken);
    if (!session || !user || (user.id !== id && user.role !== "ADMIN")) {
      throw new Error("Unauthorized");
    }
    next();
  } catch (error: unknown) {
    return response
      .status(403)
      .json({ error: "You are not authorized to access this resource" });
  }
}
