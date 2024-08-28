import express from "express";
import {
  bookSlot,
  cancelSlotBooking,
  createSlot,
} from "../controller/slot.controller";
import { isAdmin, verifyUser } from "../middleware/auth.middleware";

const slotRouter = express.Router();

slotRouter.post("/", verifyUser, isAdmin, createSlot);
slotRouter.put("/:id", verifyUser, bookSlot);
slotRouter.delete("/:id", verifyUser, cancelSlotBooking);

export default slotRouter;
