import { z } from "zod";
import type { User } from "@prisma/client";

const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First Name cannot be empty" }),
  lastName: z.string().min(1, { message: "Last Name cannot be empty" }),
  email: z.string().email(),
  organisation: z.string().min(3, {
    message: "Organisation name must be at least 3 characters long",
  }),
  orgRole: z.string().min(3, {
    message: "Your role in the organisation must be at least 3 characters long",
  }),
  phoneNumber: z
    .string()
    .regex(
      /^(?:(?:\+|00)([1-9]\d{0,2})[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)?((?:\d[-.\s]?){6,14}\d)$/,
      {
        message: "Enter a valid phone number format",
      }
    ),
});

const passwordRegisterSchema = registerSchema.extend({
  password: z
    .string()
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least one number.",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Password must contain at least one special character.",
    })
    .regex(/^(?!.*(\d)\1)/, {
      message: "Password must not have consecutive identical digits.",
    })
    .regex(/^(?!.*([a-zA-Z])\1)/, {
      message: "Password must not have consecutive identical letters.",
    })
    .regex(/^[^\s]{8,}$/, {
      message:
        "Password must be at least 8 characters long and must not contain spaces.",
    }),
});

const oauthRegisterSchema = registerSchema.extend({
  oAuthProfile: z.string().min(6, { message: "Oauth profile cannot be empty" }),
});

export function verifyUserData(data: Partial<User>) {
  const result = data.password
    ? passwordRegisterSchema.safeParse(data)
    : oauthRegisterSchema.safeParse(data);

  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { success: result.success };
}

export function verifyContactFormData(data: Partial<User>) {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { success: result.success };
}
