import { google } from "googleapis";
import { environment } from "./environment";
import { Request, Response } from "express";
import { Scope } from "@prisma/client";

export function getClient(redirectUri: string) {
  console.log(environment.googleClientId);
  return new google.auth.OAuth2(
    environment.googleClientId,
    environment.googleClientSecret,
    redirectUri
  );
}

export const calendar = google.calendar({
  version: "v3",
  auth: environment.apiKey,
});

export const scopes = [
  { scope: Scope.CALENDAR, value: "https://www.googleapis.com/auth/calendar" },
  { scope: Scope.GMAIL, value: "https://www.googleapis.com/auth/gmail.send" },
  {
    scope: Scope.EMAIL,
    value: "https://www.googleapis.com/auth/userinfo.email",
  },
  {
    scope: Scope.PROFILE,
    value: "https://www.googleapis.com/auth/userinfo.profile",
  },
  { scope: Scope.DRIVE, value: "https://www.googleapis.com/auth/drive" },
  { scope: Scope.FORM, value: "https://www.googleapis.com/auth/forms.body" },
  { scope: Scope.DOCS, value: "https://www.googleapis.com/auth/documents" },
  {
    scope: Scope.SHEETS,
    value: "https://www.googleapis.com/auth/spreadsheets",
  },
  {
    scope: Scope.SLIDES,
    value: "https://www.googleapis.com/auth/presentations",
  },
  {
    scope: Scope.OPENID,
    value: "openid",
  },
];

export async function loginGoogleUniversal(
  redirectUri: string,
  request: Request,
  response: Response
) {
  try {
    const authClient = getClient(redirectUri);

    const requestedScopes =
      typeof request.query.requestedScopes === "string"
        ? request.query.requestedScopes.split(",")
        : [];

    const allScopes: string[] = requestedScopes.length
      ? scopes
          .filter((item) => requestedScopes.includes(item.scope))
          .map((item) => item.value)
      : [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ];

    const url = authClient.generateAuthUrl({
      access_type: "offline",
      scope: allScopes,
    });

    response.redirect(url);
  } catch (error) {
    console.log(error);
    response
      .status(400)
      .json({ error: "An error occurred during authentication." });
  }
}
