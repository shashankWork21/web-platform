"use server";

import {
  createPasswordSessionUrl,
  registerUrl,
  registerUrlGoogle,
  validateSessionUrl,
} from "@/utils/paths";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateSession() {
  const user = await axios.get(validateSessionUrl(), { withCredentials: true });
  return user;
}

export async function registerUser(
  id: string,
  countryCode: number,
  formState: any,
  formData: FormData
): Promise<any> {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phoneNumber = `${countryCode}${formData.get("number")}`;
  const organisation = formData.get("organisation");
  const orgRole = formData.get("orgRole");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (id) {
    try {
      const Authorization = cookies().get("session")?.value as string;
      const user = await axios.post(
        registerUrlGoogle(id),
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          organisation,
          orgRole,
          oAuthProfile: "GOOGLE",
        },
        {
          headers: {
            Authorization,
          },
        }
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return { errors: error.message };
      } else {
        return { errors: { _form: "Sorry, something went wrong!" } };
      }
    }
    redirect("/dashboard");
  } else {
    if (password !== confirmPassword) {
      return {
        errors: {
          passwordMismatch: ["The two passwords don't match. Try again"],
        },
      };
    } else {
      try {
        const user = await axios.post(registerUrl(), {
          firstName,
          lastName,
          email,
          phoneNumber,
          organisation,
          orgRole,
          password,
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          return { errors: error.response?.data.errors };
        } else {
          return { errors: { _form: "Sorry, something went wrong!" } };
        }
      }
      redirect("/login");
    }
  }
}

export async function loginUser(
  formState: any,
  formData: FormData
): Promise<any> {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const user = await axios.post(createPasswordSessionUrl(), {
      email,
      password,
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.error);
      return { error: error.response?.data.error };
    } else {
      return { errors: { _form: "Sorry, something went wrong!" } };
    }
  }
  redirect("/dashboard");
}

export async function logoutUser(
  formState: any,
  formData: FormData
): Promise<any> {
  try {
    await axios.delete(validateSessionUrl(), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    revalidatePath("/");
    return {
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.error);
      return { error: error.response?.data.error, success: true };
    } else {
      return {
        errors: { _form: "Sorry, something went wrong!", success: true },
      };
    }
  }
}
