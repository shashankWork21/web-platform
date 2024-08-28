import express from "express";
import { isAdmin, verifyUser } from "../middleware/auth.middleware";
import {
  createCategory,
  modifyCategory,
  deleteCategory,
  getAllCategories,
  getActiveCategories,
  filterCategoriesBySearchTerm,
} from "../controller/category.controller";

const categoryRouter = express.Router();

categoryRouter.post("/", verifyUser, isAdmin, createCategory);
categoryRouter.put("/:id", verifyUser, isAdmin, modifyCategory);

categoryRouter.delete("/:id", verifyUser, isAdmin, deleteCategory);
categoryRouter.get("/search", filterCategoriesBySearchTerm);
categoryRouter.get("/", verifyUser, isAdmin, getAllCategories);
categoryRouter.get("/active", getActiveCategories);

export default categoryRouter;
