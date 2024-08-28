import express from "express";

import {
  loginGoogle,
  loginGoogleAdmin,
  loginGoogleCallback,
  loginGoogleCallbackAdmin,
} from "../controller/google-auth.controller";

const authRouter = express.Router();

authRouter.get("/google", loginGoogle);
authRouter.get("/google/admin", loginGoogleAdmin);
authRouter.get("/google/callback", loginGoogleCallback);
authRouter.get("/google/admin/callback", loginGoogleCallbackAdmin);

export default authRouter;
