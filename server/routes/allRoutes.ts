import express from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import sessionRouter from "./session.routes";
import variantRouter from "./variants.router";
import slotRouter from "./slot.routes";
import serviceRequestRouter from "./service-request.router";
import currencyRouter from "./currencyRoutes";
import categoryRouter from "./category.routes";
import resourceRouter from "./resources.routes";

const api = express();

api.use("/users", userRouter);
api.use("/auth", authRouter);
api.use("/sessions", sessionRouter);
api.use("/resources", resourceRouter);
api.use("/categories", categoryRouter);
api.use("/variants", variantRouter);
api.use("/slots", slotRouter);
api.use("/currencies", currencyRouter);
api.use("/service-requests", serviceRequestRouter);

export default api;
