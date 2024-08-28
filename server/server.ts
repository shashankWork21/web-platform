import http from "http";
import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();
console.log(process.env.BACKEND_URL);

import { environment } from "./utils/environment";

const PORT = environment.port || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
