import { mcpServer } from "./mcp-server.js";
import { createSSEServer } from "./sse-server.js";
import dotenv from 'dotenv';
dotenv.config();
const sseServer = createSSEServer(mcpServer);
console.log("PORT", process.env.PORT);
console.log("WORKSPACE_URL", process.env.WORKSPACE_URL);
console.log("API_TOKEN", process.env.API_TOKEN);
sseServer.listen(process.env.PORT || 3001);
