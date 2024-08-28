import dotenv from "dotenv";

export const environment = {
  tokenSecret: process.env.TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  oauthSecret: process.env.OAUTH_SECRET,
  frontendUrl: process.env.FRONTEND_URL,
  port: process.env.PORT,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUrl: `${process.env.BACKEND_URL}/sessions/google`,
  redirectUri: `${process.env.BACKEND_URL}/auth/google/callback`,
  redirectUriAdmin: `${process.env.BACKEND_URL}/auth/google/admin/callback`,
  existingUserLink: `${process.env.FRONTEND_URL}/dashboard`,
  newUserLink: `${process.env.FRONTEND_URL}/register`,
  adminLink: `${process.env.FRONTEND_URL}/admin/dashboard`,
  apiKey: process.env.API_KEY,
};
