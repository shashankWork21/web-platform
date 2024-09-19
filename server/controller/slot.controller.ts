// import { Request, Response } from "express";

// import type { Slot, User } from "@prisma/client";
// import { db } from "../db";
// import { getUserFromSessionToken } from "../utils/session.utils";
// import type { SlotWithHost, SlotWithDetails } from "../utils/types/slot.types";
// import type { ServiceRequestWithResource } from "../utils/types/service-request.types";
// import {
//   bookSlotWithCalendar,
//   cancelBookingWithCalendar,
//   findSlotWithDetailsById,
// } from "../utils/slot.utils";

// export async function createSlot(request: Request, response: Response) {
//   try {
//     const sessionToken = request.headers.authorization as string;
//     const { user } = await getUserFromSessionToken(sessionToken);
//     const { dateTime } = request.body;
//     const timestamp = new Date(dateTime);
//     const slot = (await db.slot.create({
//       data: { hostId: user.id, timestamp },
//     })) as Slot;
//     return response.status(201).json(slot);
//   } catch (error) {
//     return response.status(403).json({ error: "Unauthorized" });
//   }
// }

// export async function bookSlot(request: Request, response: Response) {
//   try {
//     const { id } = request.params;
//     const sessionToken = request.headers.authorization as string;
//     const { user } = await getUserFromSessionToken(sessionToken);

//     const { serviceRequestId } = request.body;
//     const slotWithHost = (await db.slot.findUnique({
//       where: { id },
//       include: {
//         host: {
//           select: {
//             firstName: true,
//             lastName: true,
//             adminCredentials: true,
//             email: true,
//           },
//         },
//       },
//     })) as SlotWithHost;
//     const serviceRequestWithService = (await db.serviceRequest.findUnique({
//       where: { id: serviceRequestId },
//       include: {
//         variant: {
//           select: {
//             details: true,
//           },
//           include: { resource: { select: { title: true, description: true } } },
//         },
//       },
//     })) as ServiceRequestWithResource;
//     const slotWithDetails = (await bookSlotWithCalendar(
//       user as User,
//       serviceRequestWithService,
//       slotWithHost
//     )) as SlotWithDetails;
//     return response.status(200).json(slotWithDetails);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }

// export async function cancelSlotBooking(request: Request, response: Response) {
//   try {
//     const { id } = request.params;
//     const { cancellationReason } = request.body;
//     const sessionToken = request.headers.authorization as string;
//     const { user } = await getUserFromSessionToken(sessionToken);
//     const slot = await findSlotWithDetailsById(id);
//     const updatedSlot = await cancelBookingWithCalendar(
//       slot,
//       cancellationReason,
//       user.role
//     );
//     return response.status(200).json(updatedSlot);
//   } catch (error) {
//     if (error instanceof Error) {
//       return response.status(400).json({ error: error.message });
//     }
//     return response.status(400).json({ error: "Something went wrong" });
//   }
// }
