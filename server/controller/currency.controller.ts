import { Request, Response } from "express";
import type { Currency } from "@prisma/client";
import { db } from "../db";
import { getUserFromSessionToken } from "../utils/session.utils";
import { verifyCurrencyData } from "../utils/validations/currency.validation";

export async function getCurrencies(request: Request, response: Response) {
  try {
    const sessionToken = request.headers.authorization as string;
    const { user } = await getUserFromSessionToken(sessionToken);
    const currencies = (await db.currency.findMany({
      where: {},
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
      orderBy: [{ createdAt: "desc" }],
    })) as Currency[];
    return response.status(200).json(currencies);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function addCurrency(request: Request, response: Response) {
  try {
    const sessionToken = request.headers.authorization as string;
    const { user } = await getUserFromSessionToken(sessionToken);
    const { name, shortform, inrConversion, symbol } = request.body;
    const result = verifyCurrencyData({
      name,
      shortform,
      inrConversion,
    } as Currency);
    if (!result.success) {
      throw new Error(JSON.stringify({ errors: result.errors }));
    }
    const currency = await db.currency.create({
      data: {
        name,
        shortform,
        inrConversion,
        createdById: user.id,
        symbol,
      },
    });
    return response.status(201).json(currency);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function modifyCurrency(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const sessionToken = request.headers.authorization as string;
    const { user } = await getUserFromSessionToken(sessionToken);
    const { name, shortform, inrConversion, isDisabled, symbol } = request.body;
    const result = verifyCurrencyData({
      name,
      shortform,
      inrConversion,
      isDisabled,
      symbol,
    } as Currency);
    if (!result.success) {
      throw new Error(JSON.stringify({ errors: result.errors }));
    }
    const currency = await db.currency.update({
      where: { id },
      data: {
        name,
        shortform,
        inrConversion,
        isDisabled,
        createdById: user.id,
        symbol,
      },
    });
    return response.status(200).json(currency);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function deleteCurrency(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const sessionToken = request.headers.authorization as string;
    const { user } = await getUserFromSessionToken(sessionToken);

    const currency = await db.currency.delete({
      where: { id },
    });
    return response.status(200).json(currency);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}
