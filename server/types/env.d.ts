// src/types/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    FRONTEND_URL: string;
    PORT: string;
    TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    SESSION_SECRET: string;
    OAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    BACKEND_URL: string;
    API_KEY_ADMIN: string;
    NODE_ENV: "dev" | "production" | "test"; // Adjust based on your environments
  }
}
