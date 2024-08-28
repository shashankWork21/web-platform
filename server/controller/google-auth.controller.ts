import axios from "axios";
import { environment } from "../utils/environment";
import { Request, Response } from "express";
import type { Role, User } from "@prisma/client";
import { db } from "../db";
import jwt from "jsonwebtoken";
import { adminScopes, getClient, userScopes } from "../utils/auth.utils";

export async function loginGoogle(request: Request, response: Response) {
  try {
    const authClient = getClient(environment.redirectUri as string);
    const url = authClient.generateAuthUrl({
      access_type: "offline",
      scope: userScopes,
    });
    response.redirect(url);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}
export async function loginGoogleAdmin(request: Request, response: Response) {
  try {
    const authClient = getClient(environment.redirectUriAdmin as string);
    const url = authClient.generateAuthUrl({
      access_type: "offline",
      scope: adminScopes,
    });
    response.redirect(url);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
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
    let user: User;
    const { tokens } = await authClient.getToken(request.query.code as string);

    authClient.setCredentials(tokens);

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
    let isNewUser: boolean;
    if (user) {
      console.log("User found");
      isNewUser = false;
      if (user.role === "ADMIN") {
        return response.redirect(environment.frontendUrl as string);
      }
    } else {
      isNewUser = true;
      let role: Role = "USER",
        adminCredentials: string = "";
      if (email === "shashank@smartalgorhythm.com") {
        return response.redirect(environment.frontendUrl as string);
      }
      user = await db.user.create({
        data: {
          firstName: data.given_name,
          lastName: data.family_name,
          email,
          oAuthProfile: "GOOGLE",
          role,
          adminCredentials: (adminCredentials as string) || null,
        },
      });
    }
    const userData = {
      userId: user.id,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      role: user.role,
      isNewUser,
    };
    const sessionToken = jwt.sign(userData, environment.oauthSecret as string, {
      expiresIn: "15m",
    });

    return response.redirect(
      `${environment.googleRedirectUrl}?google_session=${sessionToken}`
    );
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
}

export async function loginGoogleCallbackAdmin(
  request: Request,
  response: Response
) {
  try {
    const accessDenied = request.query?.error;
    if (accessDenied) {
      return response.redirect(environment.frontendUrl as string);
    }
    const authClient = getClient(environment.redirectUriAdmin as string);
    let user: User;
    const { tokens } = await authClient.getToken(request.query.code as string);

    authClient.setCredentials(tokens);

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
    let isNewUser: boolean;
    if (user) {
      isNewUser = false;
      if (user.role === "ADMIN") {
        console.log(JSON.parse(user.adminCredentials as string).refresh_token);
        await db.user.update({
          where: { id: user.id },
          data: {
            adminCredentials: JSON.stringify({
              ...authClient.credentials,
              refresh_token:
                authClient.credentials.refresh_token ||
                JSON.parse(user.adminCredentials as string).refresh_token,
            }),
          },
        });
      } else {
        return response.redirect(environment.frontendUrl as string);
      }
    } else {
      isNewUser = true;
      let role: Role = "ADMIN",
        adminCredentials: string = "";
      if (email === "shashank@smartalgorhythm.com") {
        adminCredentials = JSON.stringify(authClient.credentials);
        user = await db.user.create({
          data: {
            firstName: data.given_name,
            lastName: data.family_name,
            email,
            oAuthProfile: "GOOGLE",
            role,
            adminCredentials: (adminCredentials as string) || null,
          },
        });
      } else {
        return response.redirect(environment.frontendUrl as string);
      }
    }
    const userData = {
      userId: user.id,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      role: user.role,
      isNewUser,
    };
    const sessionToken = jwt.sign(userData, environment.oauthSecret as string, {
      expiresIn: "15m",
    });

    return response.redirect(
      `${environment.googleRedirectUrl}?google_session=${sessionToken}`
    );
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
}
