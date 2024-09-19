import express from "express";
import {
  createSessionWithEmailAndPassword,
  deleteAllSessions,
  deleteSession,
  validateSession,
} from "../controller/session.controller";

const sessionRouter = express.Router();

sessionRouter.post("/password", createSessionWithEmailAndPassword);
sessionRouter.delete("/", deleteSession);
sessionRouter.get("/", validateSession);
sessionRouter.delete("/", deleteAllSessions);

export default sessionRouter;
