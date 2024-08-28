import { z } from "zod";
import { Variant, PricingModel } from "@prisma/client";
const variantSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  details: z
    .string()
    .array()
    .nonempty({ message: "We need minimum of one entry in the details field" }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  pricingModel: z.nativeEnum(PricingModel, {
    message: "Invalid Pricing Model",
  }),
});

export function verifyVariantData(variant: Variant) {
  const result = variantSchema.safeParse(variant);

  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { success: result.success };
}
