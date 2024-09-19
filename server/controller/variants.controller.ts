// import { Request, Response } from "express";
// import type { Variant } from "@prisma/client";
// import { db } from "../db";
// import { verifyVariantData } from "../utils/validations/variant.validation";

// export async function modifyResourceVariant(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const { id } = request.params;
//     const data = request.body as Variant;
//     const result = verifyVariantData({
//       title: data.title,
//       details: data.details,
//       price: data.price,
//       pricingModel: data.pricingModel,
//     } as Variant);
//     console.log(data);
//     if (!result.success) {
//       throw new Error(JSON.stringify({ errors: result.errors }));
//     }
//     const variant = await db.variant.update({
//       where: { id },
//       data: { ...data, includedVariantId: data.includedVariantId || null },
//     });
//     return response.status(201).json(variant);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(error.message);
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }

// export async function disableResourceVariant(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const { id } = request.params;
//     const variant = await db.variant.update({
//       where: { id },
//       data: { isDisabled: true },
//     });
//     return response.status(201).json(variant);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }
// export async function deleteResourceVariant(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const { id } = request.params;
//     const variant = await db.variant.delete({
//       where: { id },
//     });
//     return response.status(201).json(variant);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }
