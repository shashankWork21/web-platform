import express from "express";
import { isAdmin, verifyUser } from "../middleware/auth.middleware";
import {
  disableResourceVariant,
  deleteResourceVariant,
  modifyResourceVariant,
} from "../controller/variants.controller";

const variantRouter = express.Router();

variantRouter.put("/:id", verifyUser, isAdmin, modifyResourceVariant);
variantRouter.put("/:id/disable", verifyUser, isAdmin, disableResourceVariant);
variantRouter.delete("/:id", verifyUser, isAdmin, deleteResourceVariant);

export default variantRouter;
