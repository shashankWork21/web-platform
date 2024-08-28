"use server";

import { currencyUrl, currencyUrlById } from "@/utils/paths";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCurrencies() {
  try {
    const currencies = await axios.get(currencyUrl(), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    return currencies.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
}

export async function addCurrency(formState: any, formData: FormData) {
  try {
    const service = await axios.post(
      currencyUrl(),
      {
        name: formData.get("name"),
        shortform: formData.get("shortform"),
        inrConversion: parseInt(formData.get("inrConversion") as string),
        symbol: formData.get("symbol"),
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard");
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

export async function modifyCurrency(
  id: string,
  isDisabled: boolean,
  formState: any,
  formData: FormData
) {
  const name = formData.get("name");
  const shortform = formData.get("shortform");
  const inrConversion = parseInt(formData.get("inrConversion") as string);
  const symbol = formData.get("symbol");
  try {
    const service = await axios.put(
      currencyUrlById(id),
      {
        name,
        shortform,
        inrConversion,
        isDisabled,
        symbol,
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/services");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error instanceof AxiosError) {
        console.log(error);
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

export async function toggleCurrency(
  id: string,
  isDisabled: boolean,
  name: string,
  shortform: string,
  inrConversion: number,
  symbol: string,
  formState: any
) {
  try {
    await axios.put(
      currencyUrlById(id),
      {
        name,
        shortform,
        inrConversion,
        isDisabled,
        symbol,
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard");
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

export async function deleteCurrency(id: string) {
  try {
    const currency = await axios.delete(currencyUrlById(id), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    revalidatePath("/admin/dashboard");
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
