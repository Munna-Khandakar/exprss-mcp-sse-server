import {mcpServer} from "./mcp-server.js";
import {createSSEServer} from "./sse-server.js";

import dotenv from 'dotenv'
dotenv.config()

const sseServer = createSSEServer(mcpServer);

sseServer.listen(process.env.PORT || 3001);