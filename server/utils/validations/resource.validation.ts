import { z } from "zod";
import type { Resource } from "@prisma/client";

const resourceSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

export function verifyResourceData(resource: Resource) {
  const result = resourceSchema.safeParse(resource);

  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { success: result.success };
}
