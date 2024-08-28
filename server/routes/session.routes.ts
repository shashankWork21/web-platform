import express from "express";
import {
  createSessionWithEmailAndPassword,
  createSessionWithGoogleLogin,
  deleteAllSessions,
  deleteSession,
  validateSession,
} from "../controller/session.controller";

const sessionRouter = express.Router();

sessionRouter.post("/password", createSessionWithEmailAndPassword);
sessionRouter.get("/google", createSessionWithGoogleLogin);
sessionRouter.delete("/", deleteSession);
sessionRouter.get("/", validateSession);
sessionRouter.delete("/", deleteAllSessions);

export default sessionRouter;
