import { z } from "zod";
import type { Category } from "@prisma/client";

const categorySchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

export function verifyCategoryData(category: Category) {
  const result = categorySchema.safeParse(category);

  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { success: result.success };
}
