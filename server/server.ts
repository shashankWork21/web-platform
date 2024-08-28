import http from "http";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

import { environment } from "./utils/environment";

const PORT = environment.port || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
