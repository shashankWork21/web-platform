import { google } from "googleapis";
import { environment } from "./environment";

export function getClient(redirectUri: string) {
  return new google.auth.OAuth2(
    environment.clientId,
    environment.clientSecret,
    redirectUri
  );
}

export const calendar = google.calendar({
  version: "v3",
  auth: environment.apiKey,
});

export const adminScopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const userScopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
