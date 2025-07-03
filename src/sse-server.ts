import {SSEServerTransport} from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import {createMcpServer} from "./mcp-server.js";

export function createSSEServer() {

    const app = express();

    const transportMap = new Map<string, SSEServerTransport>();

    app.get("/sse", async (req, res) => {
        const transport = new SSEServerTransport("/messages", res);

        const queryString = req.originalUrl.split('?')[1];
        const params = new URLSearchParams(queryString);
        const workspaceUrl = params.get('WORKSPACE_URL');
        const apiToken = req.headers.api_token as string;

        if (!workspaceUrl || !apiToken) {
            console.error("Missing WORKSPACE_URL or API_TOKEN")
            res.status(400).json({error: 'Missing WORKSPACE_URL or API_TOKEN'});
            return;
        }
        transportMap.set(transport.sessionId, transport);
        const mcpServer = createMcpServer(workspaceUrl, apiToken);
        await mcpServer.connect(transport);
    });

    app.post("/messages", (req, res) => {
        const sessionId = req.query.sessionId as string;
        if (!sessionId) {
            console.error('Message received without sessionId');
            res.status(400).json({error: 'sessionId is required'});
            return;
        }

        const transport = transportMap.get(sessionId);

        if (transport) {
            transport.handlePostMessage(req, res);
        }
    });

    return app;
}
