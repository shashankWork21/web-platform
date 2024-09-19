import express from "express";

import {
  loginGoogle,
  loginGoogleCallback,
} from "../controller/google-auth.controller";

const authRouter = express.Router();

authRouter.get("/google", loginGoogle);
authRouter.get("/google/callback", loginGoogleCallback);

export default authRouter;
