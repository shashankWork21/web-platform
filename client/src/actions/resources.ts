"use server";

import { resourceUrlById, resourcesUrlAll } from "@/utils/paths";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getAllResources() {
  try {
    const allResources = await axios.get(resourcesUrlAll(), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    return allResources.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
}
export async function getActiveResources() {
  try {
    const resources = await axios.get(`${resourcesUrlAll()}/active`);
    console.log(resources.data);
    return resources.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
}

export async function createResource(
  categoryId: string,
  resourceType: string,
  formState: any,
  formData: FormData
) {
  try {
    const resource = await axios.post(
      resourcesUrlAll(),
      {
        title: formData.get("title"),
        description: formData.get("description"),
        categoryId,
        resourceType,
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/categories");
    revalidatePath("/contact");
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

export async function modifyResource(
  id: string,
  categoryId: string,
  resourceType: string,
  formState: any,
  formData: FormData
) {
  const title = formData.get("title");
  const description = formData.get("description");
  try {
    const resource = await axios.put(
      resourceUrlById(id),
      {
        title,
        resourceType,
        categoryId,
        description,
      },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/categories");
    revalidatePath("/contact");
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

export async function deleteResource(id: string) {
  try {
    const resource = await axios.delete(resourceUrlById(id), {
      headers: {
        Authorization: cookies().get("session")?.value,
      },
    });
    revalidatePath("/admin/dashboard/categories");
    revalidatePath("/contact");
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
export async function disableResource(
  id: string,
  title: string,
  description: string,
  categoryId: string,
  resourceType: string,
  formState: any
) {
  console.log(categoryId);
  try {
    await axios.put(
      `${resourceUrlById(id)}`,
      { title, description, isDisabled: true, categoryId, resourceType },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard/categories");
    revalidatePath("/contact");
  } catch (error: unknown) {
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
  return { ...formState, submitted: true };
}

export async function enableResource(
  id: string,
  title: string,
  description: string,
  categoryId: string,
  resourceType: string,
  formState: any
) {
  try {
    const resource = await axios.put(
      `${resourceUrlById(id)}`,
      { title, description, isDisabled: false, categoryId, resourceType },
      {
        headers: {
          Authorization: cookies().get("session")?.value,
        },
      }
    );
    revalidatePath("/admin/dashboard");
    revalidatePath("/contact");
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
