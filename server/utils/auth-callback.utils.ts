import { LoginSource, Token, User } from "@prisma/client";
import { db } from "../db";
import { scopes } from "./auth.utils";
import { generateSessionToken } from "./session.utils";

export interface GoogleAuthTokens {
  access_token: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token: string;
  expiry_date: number;
}

export async function createTokenAndSessionGoogle(
  user: User,
  tokens: GoogleAuthTokens
) {
  const scope = tokens.scope.split(" ").map((value) => {
    const scopeItem = scopes.find((item) => item.value === value);
    return scopeItem?.scope || "EMAIL";
  });
  const existingToken = await db.token.findFirst({
    where: { userId: user.id, scope: { hasEvery: scope } },
  });
  let token: Token;
  if (!existingToken) {
    token = await db.token.create({
      data: {
        userId: user.id,
        scope,
        loginSource: LoginSource.GOOGLE,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || "",
      },
    });
  } else {
    token = await db.token.update({
      where: { id: existingToken.id },
      data: {
        userId: user.id,
        scope,
        loginSource: LoginSource.GOOGLE,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || "",
      },
    });
  }
  const session = await generateSessionToken(user, [token]);
  return session;
}
