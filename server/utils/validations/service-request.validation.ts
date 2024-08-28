import { z } from "zod";
import type { ServiceRequest } from "@prisma/client";

const serviceRequestSchema = z.object({
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long" }),
});

export function verifyServiceRequestData(serviceRequest: ServiceRequest) {
  const result = serviceRequestSchema.safeParse(serviceRequest);

  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { success: result.success };
}
