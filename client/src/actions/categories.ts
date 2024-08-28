"use server";

import { categoriesUrlAll, categoryUrlById } from "@/utils/paths";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getAllCategories() {
  try {
    const allCategories = await axios.get(categoriesUrlAll(), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    return allCategories.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
}
export async function getActiveCategories() {
  const resources = await axios.get(`${categoriesUrlAll()}/active`);
  return resources;
}

export async function createCategory(formState: any, formData: FormData) {
  try {
    const resource = await axios.post(
      categoriesUrlAll(),
      {
        title: formData.get("title"),
        description: formData.get("description"),
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

export async function modifyCategory(
  id: string,
  formState: any,
  formData: FormData
) {
  const title = formData.get("title");
  const description = formData.get("description");
  try {
    const resource = await axios.put(
      categoryUrlById(id),
      {
        title,
        description,
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
      if (error instanceof AxiosError) {
        return { errors: error.response?.data.errors, submitted: false };
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

export async function deleteCategory(id: string) {
  try {
    const resource = await axios.delete(categoryUrlById(id), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    revalidatePath("/admin/dashboard/categories");
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
export async function disableCategory(
  id: string,
  title: string,
  description: string,
  formState: any
) {
  try {
    const resource = await axios.put(
      `${categoryUrlById(id)}`,
      { title, description, isDisabled: true },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/categories");
  } catch (error: unknown) {
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
  return { ...formState, submitted: true };
}

export async function enableCategory(
  id: string,
  title: string,
  description: string,
  formState: any
) {
  try {
    const resource = await axios.put(
      `${categoryUrlById(id)}`,
      { title, description, isDisabled: false },
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
  return { ...formState, submitted: true };
}
