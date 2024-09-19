// import express from "express";
// import { isAdmin, verifyUser } from "../middleware/auth.middleware";
// import {
//   createResource,
//   createResourceVariant,
//   deleteResource,
//   filterResourcesAndVariantsBySearchTerm,
//   getActiveResources,
//   getAllResources,
//   modifyResource,
// } from "../controller/resources.controller";

// const resourceRouter = express.Router();

// resourceRouter.post("/", verifyUser, isAdmin, createResource);
// resourceRouter.put("/:id", verifyUser, isAdmin, modifyResource);
// resourceRouter.post("/:id", verifyUser, isAdmin, createResourceVariant);
// resourceRouter.delete("/:id", verifyUser, isAdmin, deleteResource);
// resourceRouter.get("/search", filterResourcesAndVariantsBySearchTerm);
// resourceRouter.get("/", verifyUser, isAdmin, getAllResources);
// resourceRouter.get("/active", getActiveResources);

// export default resourceRouter;
