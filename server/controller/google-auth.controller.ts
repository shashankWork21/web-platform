import axios from "axios";
import { environment } from "../utils/environment";
import { Request, Response } from "express";
import type { PlatformRole, User } from "@prisma/client";
import { db } from "../db";
import jwt from "jsonwebtoken";
import { getClient, loginGoogleUniversal } from "../utils/auth.utils";
import {
  createTokenAndSessionGoogle,
  GoogleAuthTokens,
} from "../utils/auth-callback.utils";

export async function loginGoogle(request: Request, response: Response) {
  loginGoogleUniversal(environment.redirectUri as string, request, response);
}

export async function loginGoogleCallback(
  request: Request,
  response: Response
) {
  try {
    const accessDenied = request.query?.error;
    if (accessDenied) {
      return response.redirect(environment.frontendUrl as string);
    }
    const authClient = getClient(environment.redirectUri as string);
    console.log(authClient);
    let user: User;
    const { tokens } = await authClient.getToken(request.query.code as string);

    authClient.setCredentials(tokens);

    console.log(tokens);

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${authClient.credentials.access_token}`,
        },
      }
    );

    const { email } = data;

    user = (await db.user.findUnique({ where: { email } })) as User;

    let isNewUser: boolean,
      redirectUrl: string = environment.existingUserLink;

    if (user) {
      isNewUser = false;
      if (user.platformRole === "ADMIN") {
        redirectUrl = environment.adminLink;
      }
    } else {
      isNewUser = true;
      let platformRole: PlatformRole = "USER";
      redirectUrl = environment.newUserLink;
      if (email === "shashank@smartalgorhythm.com") {
        platformRole = "ADMIN";
        redirectUrl = environment.adminLink;
      }
      user = await db.user.create({
        data: {
          firstName: data.given_name,
          lastName: data.family_name,
          email,
          oAuthProfile: "GOOGLE",
          platformRole,
        },
      });
    }
    const sessionToken = await createTokenAndSessionGoogle(
      user,
      tokens as GoogleAuthTokens
    );

    response.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response.redirect(redirectUrl as string);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error });
  }
}
