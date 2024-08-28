import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import api from "./routes/allRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("combined"));
app.use(bodyParser.json());

app.use("/api", api);

export default app;
