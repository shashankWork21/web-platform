import express from "express";
import { isAdmin, verifyUser } from "../middleware/auth.middleware";
import {
  addCurrency,
  deleteCurrency,
  getCurrencies,
  modifyCurrency,
} from "../controller/currency.controller";

const currencyRouter = express.Router();

currencyRouter.get("/", verifyUser, isAdmin, getCurrencies);
currencyRouter.post("/", verifyUser, isAdmin, addCurrency);
currencyRouter.put("/:id", verifyUser, isAdmin, modifyCurrency);
currencyRouter.delete("/:id", verifyUser, isAdmin, deleteCurrency);

export default currencyRouter;
