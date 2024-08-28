import express from "express";
import { isAdmin, verifyUser } from "../middleware/auth.middleware";
import {
  createServiceRequest,
  deleteServiceRequest,
  getAllServiceRequests,
  getServiceRequestsByUser,
  modifyServiceRequest,
} from "../controller/service-request.controller";

const serviceRequestRouter = express.Router();

serviceRequestRouter.post("/", createServiceRequest);
serviceRequestRouter.put("/:id", verifyUser, modifyServiceRequest);
serviceRequestRouter.delete("/:id", verifyUser, deleteServiceRequest);
serviceRequestRouter.get("/", verifyUser, getServiceRequestsByUser);
serviceRequestRouter.get("/admin", verifyUser, isAdmin, getAllServiceRequests);
export default serviceRequestRouter;
