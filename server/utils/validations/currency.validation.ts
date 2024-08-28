import { z } from "zod";
import type { Currency } from "@prisma/client";

const currencySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Currency name must be at least 3 characters long" }),
  shortform: z
    .string()
    .length(3, { message: "Shortform must be at exactly 3 characters long" }),
  symbol: z
    .string()
    .length(1, { message: "Symbol must be at exactly 1 character long" }),
  inrConversion: z
    .number({
      required_error: "Conversion factor for INR is required",
      invalid_type_error: "Conversion factor for INR must be a number",
    })
    .int({ message: "Conversion factor for INR must be an integer" }),
});

export function verifyCurrencyData(currency: Currency) {
  const result = currencySchema.safeParse(currency);

  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { success: result.success };
}
