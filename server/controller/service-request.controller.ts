import { Request, Response } from "express";
import type { ServiceRequest } from "@prisma/client";
import { db } from "../db";
import { getUserFromSessionToken } from "../utils/session.utils";
import { verifyServiceRequestData } from "../utils/validations/service-request.validation";
import { serviceRequestInclusions } from "../utils/service-request.inclusions";

export async function createServiceRequest(
  request: Request,
  response: Response
) {
  try {
    const { userId, variantId, subject, description } = request.body;
    const verificationResult = verifyServiceRequestData({
      subject,
    } as ServiceRequest);
    if (!verificationResult.success) {
      throw new Error(Object.values(verificationResult.errors).join(", "));
    }
    const serviceRequest = await db.serviceRequest.create({
      data: {
        userId,
        variantId,
        subject,
        description: description || "",
      },
      include: serviceRequestInclusions,
    });
    return response.status(201).json(serviceRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function getServiceRequestsByUser(
  request: Request,
  response: Response
) {
  try {
    const sessionToken = request.headers.authorization as string;
    const { user } = await getUserFromSessionToken(sessionToken);
    const serviceRequests = await db.serviceRequest.findMany({
      where: { userId: user.id },
      include: serviceRequestInclusions,
    });
    return response.status(200).json(serviceRequests);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}
export async function getAllServiceRequests(
  request: Request,
  response: Response
) {
  try {
    const serviceRequests = await db.serviceRequest.findMany({
      where: {},
      include: serviceRequestInclusions,
    });
    return response.status(200).json(serviceRequests);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function modifyServiceRequest(
  request: Request,
  response: Response
) {
  try {
    const { id } = request.params;
    const { data } = request.body;
    const updatedRequest = await db.serviceRequest.update({
      where: { id },
      data,
      include: serviceRequestInclusions,
    });
    return response.status(200).json(updatedRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}

export async function deleteServiceRequest(
  request: Request,
  response: Response
) {
  try {
    const { id } = request.params;
    const updatedRequest = await db.serviceRequest.update({
      where: { id },
      data: { isDisabled: true },
      include: serviceRequestInclusions,
    });
    return response.status(200).json(updatedRequest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(400).json({ error: "Something went wrong" });
  }
}
