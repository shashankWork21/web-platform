"use server";

import axios, { AxiosError } from "axios";
import { resourceUrlById, variantUrlById } from "@/utils/paths";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createResourceVariant(
  resourceId: string,
  currencyId: string,
  pricingModel: string,
  includedVariantId: string,
  formState: any,
  formData: FormData
) {
  try {
    await axios.post(
      resourceUrlById(resourceId),
      {
        title: formData.get("title"),
        details: formData.getAll("detail"),
        price: parseFloat(formData.get("price") as string),
        currencyId,
        pricingModel,
        includedVariantId,
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/categories");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.error);
      if (error instanceof AxiosError) {
        return {
          errors: JSON.parse(error.response?.data.error).errors,
          submitted: false,
        };
      } else {
        return {
          errors: { _form: "Sorry, something went wrong!" },
          submitted: false,
        };
      }
    }
  }
  return { ...formState, submitted: true };
}

export async function modifyResourceVariant(
  variantId: string,
  currencyId: string,
  pricingModel: string,
  includedVariantId: string,
  formState: any,
  formData: FormData
) {
  console.log(variantId);
  try {
    await axios.put(
      variantUrlById(variantId),
      {
        title: formData.get("title"),
        details: formData.getAll("detail"),
        price: parseFloat(formData.get("price") as string),
        currencyId,
        pricingModel,
        includedVariantId,
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/categories");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error);
      if (error instanceof AxiosError) {
        return {
          errors: JSON.parse(error.response?.data.error).errors,
          submitted: false,
        };
      } else {
        return {
          errors: { _form: "Sorry, something went wrong!" },
          submitted: false,
        };
      }
    }
  }
  return { ...formState, submitted: true };
}

export async function toggleVariantAvailability(
  variantId: string,
  title: string,
  details: string[],
  price: number,
  currencyId: string,
  pricingModel: string,
  includedVariantId: string,
  isDisabled: boolean
) {
  try {
    const service = await axios.put(
      variantUrlById(variantId),
      {
        title,
        details,
        price,
        currencyId,
        isDisabled,
        pricingModel,
        includedVariantId,
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/categories");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.error);
      if (error instanceof AxiosError) {
        return {
          errors: JSON.parse(error.response?.data.error).errors,
          submitted: false,
        };
      } else {
        return {
          errors: { _form: "Sorry, something went wrong!" },
          submitted: false,
        };
      }
    }
  }
}

export async function deleteVariant(id: string) {
  try {
    await axios.delete(variantUrlById(id), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    revalidatePath("/admin/dashboard/services");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error instanceof AxiosError) {
        return {
          errors: JSON.parse(error.response?.data.error).errors,
          submitted: false,
        };
      } else {
        return {
          errors: { _form: "Sorry, something went wrong!" },
          submitted: false,
        };
      }
    }
  }
}
