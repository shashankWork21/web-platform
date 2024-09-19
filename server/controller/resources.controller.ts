// import { Request, Response } from "express";
// import { getUserFromSessionToken } from "../utils/session.utils";
// import { verifyResourceData } from "../utils/validations/resource.validation";
// import { ResourceType, type Resource, type Variant } from "@prisma/client";
// import { db } from "../db";
// import { verifyVariantData } from "../utils/validations/variant.validation";

// export async function createResource(request: Request, response: Response) {
//   let errors: any = {};
//   try {
//     const sessionToken = request.headers.authorization as string;
//     const { title, description, categoryId, resourceType } = request.body;
//     if (!categoryId) {
//       errors.category = ["Category is required"];
//     }
//     if (!resourceType) {
//       errors.resourceType = ["Resource Type is required"];
//     } else if (!Object.values(ResourceType).includes(resourceType)) {
//       errors.resourceType = ["Invalid Resource Type"];
//     }
//     const { user } = await getUserFromSessionToken(sessionToken);
//     const result = verifyResourceData({ title, description } as Resource);
//     if (!result.success) {
//       errors = { ...errors, ...result.errors };
//     }
//     if (Object.keys(errors).length) {
//       throw new Error(JSON.stringify({ errors }));
//     }
//     const resource = await db.resource.create({
//       data: {
//         title,
//         description,
//         createdById: user.id,
//         resourceType,
//         categoryId,
//       },
//     });
//     return response.status(201).json(resource);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }

// export async function modifyResource(request: Request, response: Response) {
//   try {
//     const { id } = request.params;
//     const data = request.body;
//     console.log(data);
//     const result = verifyResourceData({
//       title: data.title,
//       description: data.description,
//     } as Resource);
//     if (!result.success) {
//       throw new Error(Object.values(result.errors).join(", "));
//     }
//     const resource = await db.resource.update({ where: { id }, data });
//     return response.status(201).json(resource);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(error);
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }

// export async function deleteResource(request: Request, response: Response) {
//   try {
//     const { id } = request.params;
//     const resource = await db.resource.delete({
//       where: { id },
//     });
//     return response.status(201).json(resource);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }

// export async function createResourceVariant(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const { id } = request.params;
//     const {
//       title,
//       details,
//       price,
//       currencyId,
//       pricingModel,
//       includedVariantId,
//     } = request.body;
//     const result = verifyVariantData({
//       title,
//       details,
//       price,
//       pricingModel,
//     } as Variant);
//     if (!result.success) {
//       throw new Error(JSON.stringify({ errors: result.errors }));
//     }
//     const variant = await db.variant.create({
//       data: {
//         title,
//         resourceId: id,
//         details,
//         price,
//         currencyId,
//         pricingModel,
//         includedVariantId: includedVariantId || null,
//       },
//     });
//     return response.status(201).json(variant);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }

// export async function getAllResources(request: Request, response: Response) {
//   const services = await db.resource.findMany({
//     where: {},
//     include: {
//       createdBy: {
//         select: { firstName: true, lastName: true, email: true },
//       },
//       variants: {
//         orderBy: [{ createdAt: "desc" }],
//         include: {
//           currency: {
//             select: { symbol: true, shortform: true, inrConversion: true },
//           },
//           includedVariant: {
//             select: { id: true, title: true },
//           },
//         },
//       },
//     },
//     orderBy: [{ createdAt: "desc" }],
//   });
//   return response.status(200).json(services);
// }

// export async function getActiveResources(request: Request, response: Response) {
//   const services = await db.resource.findMany({
//     where: { OR: [{ isDisabled: null }, { isDisabled: false }] },
//     include: {
//       createdBy: {
//         select: { firstName: true, lastName: true, email: true },
//       },
//       variants: {
//         where: { isDisabled: null },
//         include: {
//           currency: {
//             select: { symbol: true, shortform: true, inrConversion: true },
//           },
//           includedVariant: {
//             select: { id: true, title: true },
//           },
//         },
//       },
//     },
//     orderBy: [{ createdAt: "desc" }],
//   });
//   return response.status(200).json(services);
// }

// export async function filterResourcesAndVariantsBySearchTerm(
//   request: Request,
//   response: Response
// ) {
//   const term = request.query?.term as string;
//   const currencyId = request.query?.currencyId as string;
//   const services = await db.resource.findMany({
//     where: {
//       isDisabled: null,
//       OR: [{ title: { contains: term } }, { description: { contains: term } }],
//     },
//     include: {
//       createdBy: {
//         select: { firstName: true, lastName: true, email: true },
//       },
//       variants: {
//         where: { isDisabled: null, currencyId },
//         select: { title: true, price: true, currency: true, details: true },
//       },
//     },
//   });
//   return response.status(200).json(services);
// }
