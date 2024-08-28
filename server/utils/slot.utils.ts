import type { Role, Slot, User } from "@prisma/client";
import { getClient, calendar } from "../utils/auth.utils";
import { createId } from "@paralleldrive/cuid2";
import type { SlotWithHost, SlotWithDetails } from "./types/slot.types";
import type { ServiceRequestWithResource } from "./types/service-request.types";
import { db } from "../db";
import { slotInclusions } from "./slot.inclusions";
import { environment } from "./environment";

export async function findSlotWithDetailsById(
  slotId: string
): Promise<SlotWithDetails> {
  return (await db.slot.findUnique({
    where: { id: slotId },
    include: slotInclusions,
  })) as SlotWithDetails;
}

export async function updateSlotWithDetails(
  slotId: string,
  data: Partial<Slot>
): Promise<SlotWithDetails> {
  return (await db.slot.update({
    where: { id: slotId },
    data,
    include: slotInclusions,
  })) as SlotWithDetails;
}

export async function bookSlotWithCalendar(
  user: User,
  serviceRequest: ServiceRequestWithResource,
  slot: SlotWithHost
): Promise<SlotWithDetails> {
  try {
    const authClient = getClient(environment.redirectUriAdmin);
    const host = (await db.user.findUnique({
      where: { id: slot.hostId },
      select: { adminCredentials: true },
    })) as User;
    authClient.setCredentials(JSON.parse(host.adminCredentials as string));
    const timeZone = "Asia/Kolkata";
    const calendarInvite = await calendar.events.insert({
      calendarId: "primary",
      auth: authClient,
      sendUpdates: "all",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Discovery call - ${slot.host.firstName} & ${user.firstName}`,
        description: `Service Request: ${serviceRequest.variant.resource.title}\nRequirement Brief: ${serviceRequest.subject}\nDetails: ${serviceRequest.description}`,
        start: {
          dateTime: slot.timestamp.toISOString(),
          timeZone,
        },
        end: {
          dateTime: new Date(
            slot.timestamp.getTime() + 30 * 60 * 1000
          ).toISOString(),
          timeZone,
        },
        conferenceData: {
          createRequest: { requestId: createId() },
        },
        attendees: [
          {
            email: slot.host.email,
            organizer: true,
            responseStatus: "accepted",
          },
          {
            email: user.email,
            organizer: false,
            responseStatus: "accepted",
          },
        ],
      },
    });
    const updatedSlot = await updateSlotWithDetails(slot.id as string, {
      userId: user.id,
      meetingLink: calendarInvite.data.hangoutLink,
      serviceRequestId: serviceRequest.id,
      calendarEventId: calendarInvite.data.id,
    });
    return updatedSlot;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function cancelBookingWithCalendar(
  slot: SlotWithDetails,
  cancellationReason: string,
  cancelledBy: Role
) {
  try {
    const authClient = getClient(environment.redirectUriAdmin);
    const host = (await db.user.findUnique({
      where: { id: slot.hostId },
      select: { adminCredentials: true },
    })) as User;
    authClient.setCredentials(JSON.parse(host.adminCredentials as string));
    await calendar.events.delete({
      calendarId: "primary",
      auth: authClient,
      sendUpdates: "all",
      eventId: slot.calendarEventId as string,
    });

    const updatedSlot = (await db.slot.update({
      where: { id: slot.id },
      data: {
        cancellationReason,
        cancelledBy,
        isCancelled: true,
        meetingLink: null,
        calendarEventId: null,
        userId: null,
      },
      include: {
        host: {
          select: { email: true, firstName: true, lastName: true },
        },
      },
    })) as SlotWithHost;
    return updatedSlot;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
