import {createSSEServer} from "./sse-server.js";

import dotenv from 'dotenv'
dotenv.config()

const sseServer = createSSEServer();

sseServer.listen(process.env.PORT || 3001);