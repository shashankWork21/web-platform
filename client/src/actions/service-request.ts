"use server";

import {
  contactFormUrl,
  getServiceRequestUrl,
  getServiceRequestUrlAdmin,
} from "@/utils/paths";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function createServiceRequestFromContactForm(
  countryCode: number,
  variantId: string,
  formState: any,
  formData: FormData
): Promise<any> {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phoneNumber = `${countryCode}${formData.get("number")}`;
  const organisation = formData.get("organisation");
  const orgRole = formData.get("orgRole");
  const subject = formData.get("subject");
  const description = formData.get("description");
  try {
    const user = await axios.post(contactFormUrl(), {
      firstName,
      lastName,
      email,
      phoneNumber,
      organisation,
      orgRole,
    });
    const serviceRequest = await axios.post(getServiceRequestUrl(), {
      subject,
      description,
      userId: user.data.id,
      variantId,
    });
    return { ...formState, success: true };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { errors: error.response?.data.errors };
    } else {
      return { errors: { _form: "Sorry, something went wrong!" } };
    }
  }
}

export async function getServiceRequestsAdmin() {
  try {
    const serviceRequests = await axios.get(getServiceRequestUrlAdmin(), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    return serviceRequests.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
}
