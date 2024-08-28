import { Request, Response } from "express";
import type { Role, User } from "@prisma/client";
import { db } from "../db";
import { hashPassword } from "../utils/password";
import {
  verifyContactFormData,
  verifyUserData,
} from "../utils/validations/user.validation";
import { exclude } from "../utils/exclude";

export async function registerUser(request: Request, response: Response) {
  const verificationResult = verifyUserData(request.body);
  console.log(request.body);
  if (!verificationResult.success) {
    console.log(verificationResult.errors);
    return response.status(400).json({ errors: verificationResult.errors });
  }
  const existingUser = await db.user.findUnique({
    where: { email: request.body.email },
  });
  if (existingUser) {
    console.log("User found");
    return response.status(400).json({ error: "User already exists" });
  }

  let user: User;

  try {
    if (request.body.password) {
      const hashedPassword = await hashPassword(request.body.password);
      user = await db.user.create({
        data: {
          ...request.body,

          password: hashedPassword,
        },
      });
    } else {
      user = await db.user.create({
        data: { ...request.body },
      });
    }
    return response.status(201).json(exclude(user, ["password"]));
  } catch (error: unknown) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAllUsers(request: Request, response: Response) {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });
    return response.status(200).json(users);
  } catch (error: unknown) {
    console.log(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
}

export async function getUserById(request: Request, response: Response) {
  try {
    const id = request.params.id as string;
    if (!id) {
      return response.status(400).json({ error: "Invalid id" });
    }
    const user = await db.user.findFirst({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        organisation: true,
        orgRole: true,
        role: true,
      },
    });
    return response.status(200).json(user);
  } catch (error: unknown) {
    console.log(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
}

export async function modifyUser(request: Request, response: Response) {
  try {
    const id = request.params.id as string;
    if (!id) {
      return response.status(400).json({ error: "Invalid id" });
    }
    const user = await db.user.update({ where: { id }, data: request.body });
    return response.status(200).json(user);
  } catch (error: unknown) {
    console.log(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
}

export async function registerGoogleUser(request: Request, response: Response) {
  try {
    const id = request.params.id as string;
    const verificationResult = verifyUserData(request.body);
    if (!verificationResult.success) {
      return response.status(400).json({ errors: verificationResult.errors });
    }
    if (!id) {
      return response.status(400).json({ error: "Invalid id" });
    }
    const user = await db.user.update({ where: { id }, data: request.body });
    return response.status(200).json(user);
  } catch (error: unknown) {
    console.log(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteUserById(request: Request, response: Response) {
  try {
    const id = request.params.id as string;
    if (!id) {
      return response.status(400).json({ error: "Invalid id" });
    }
    await db.user.delete({ where: { id } });
    return response.status(200).json({ status: "done" });
  } catch (error: unknown) {
    console.log(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
}

// DEV ONLY!!!!
export async function deleteAllUsers(request: Request, response: Response) {
  try {
    await db.user.deleteMany({});
    return response.status(200).json({ status: "done" });
  } catch (error: unknown) {
    console.log(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
}

export async function createUserFromContactForm(
  request: Request,
  response: Response
) {
  const verificationResult = verifyContactFormData(request.body);
  if (!verificationResult.success) {
    console.log(verificationResult.errors);
    return response.status(400).json({ errors: verificationResult.errors });
  }
  const existingUser = await db.user.findUnique({
    where: { email: request.body.email },
  });
  if (existingUser) {
    console.log("User found");
    return response.status(200).json(exclude(existingUser, ["password"]));
  }

  let user: User;

  try {
    user = await db.user.create({
      data: { ...request.body },
    });
    return response.status(201).json(user);
  } catch (error: unknown) {
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
