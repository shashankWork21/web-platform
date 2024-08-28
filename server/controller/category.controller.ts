import { Request, Response } from "express";
import { getUserFromSessionToken } from "../utils/session.utils";
import { verifyCategoryData } from "../utils/validations/category.validation";
import type { Category } from "@prisma/client";
import { db } from "../db";

export async function createCategory(request: Request, response: Response) {
  try {
    const sessionToken = request.headers.authorization as string;
    const { title, description } = request.body;
    const { user } = await getUserFromSessionToken(sessionToken);
    const result = verifyCategoryData({ title, description } as Category);
    if (!result.success) {
      throw new Error(JSON.stringify({ errors: result.errors }));
    }
    const resource = await db.category.create({
      data: {
        title,
        description,
        createdById: user.id,
      },
    });
    return response.status(201).json(resource);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function modifyCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const data = request.body;
    console.log(data);
    const result = verifyCategoryData({
      title: data.title,
      description: data.description,
    } as Category);
    if (!result.success) {
      throw new Error(Object.values(result.errors).join(", "));
    }
    const resource = await db.category.update({ where: { id }, data });
    return response.status(201).json(resource);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function deleteCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const resource = await db.category.delete({
      where: { id },
    });
    return response.status(201).json(resource);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function getAllCategories(request: Request, response: Response) {
  const categories = await db.category.findMany({
    where: {},
    include: {
      createdBy: {
        select: { firstName: true, lastName: true, email: true },
      },
      resources: {
        orderBy: [{ createdAt: "desc" }],
        include: {
          createdBy: {
            select: { firstName: true, lastName: true, email: true },
          },
          variants: {
            orderBy: [{ createdAt: "desc" }],
            include: {
              currency: {
                select: { symbol: true, shortform: true, inrConversion: true },
              },
              includedVariant: {
                select: { id: true, title: true },
              },
            },
          },
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });
  return response.status(200).json(categories);
}

export async function getActiveCategories(
  request: Request,
  response: Response
) {
  const categories = await db.category.findMany({
    where: { OR: [{ isDisabled: null }, { isDisabled: false }] },
    include: {
      createdBy: {
        select: { firstName: true, lastName: true, email: true },
      },
      resources: {
        orderBy: [{ createdAt: "desc" }],
        include: {
          createdBy: {
            select: { firstName: true, lastName: true, email: true },
          },
          variants: {
            orderBy: [{ createdAt: "desc" }],
            include: {
              currency: {
                select: { symbol: true, shortform: true, inrConversion: true },
              },
              includedVariant: {
                select: { id: true, title: true },
              },
            },
          },
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });
  return response.status(200).json(categories);
}

export async function filterCategoriesBySearchTerm(
  request: Request,
  response: Response
) {
  const term = request.query?.term as string;
  const categories = await db.category.findMany({
    where: {
      isDisabled: null,
      OR: [{ title: { contains: term } }, { description: { contains: term } }],
    },
    include: {
      createdBy: {
        select: { firstName: true, lastName: true, email: true },
      },
      resources: {
        where: { isDisabled: null },
      },
    },
  });
  return response.status(200).json(categories);
}
