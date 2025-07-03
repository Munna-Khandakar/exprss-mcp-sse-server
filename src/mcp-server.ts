import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {ApiClient} from "./utils/ApiClient.js";
import {Idea} from "./types/Idea.js";
import {User} from "./types/User.js";
import {formatIdea, formatMember} from "./utils/FormatResponse.js";

export function createMcpServer(baseUrl: string, token: string) {
    const apiClient = new ApiClient(baseUrl, token);

    const mcpServer = new McpServer({
        name: "ideascale-mcp-server",
        version: "1.0.0",
    });

    mcpServer.tool(
        "get_ideas",
        "Get Ideas from the IdeaScale",
        async () => {
            const ideas = await apiClient.get<Idea[]>("/ideas");
            if (!ideas || ideas.length === 0) {
                return {
                    content: [
                        {
                            type: "text",
                            text: ideas ? "No ideas found." : "Failed to retrieve data.",
                        },
                    ],
                };
            }

            const formattedIdeas = ideas.map(formatIdea);
            return {
                content: [
                    {
                        type: "text",
                        text: `Ideas from the response:\n\n${formattedIdeas.join("\n")}`,
                    },
                ],
            };
        }
    );

    mcpServer.tool(
        "get_members",
        "Get all members information",
        async () => {
            const members = await apiClient.get<User[]>("/members");
            if (!members || members.length === 0) {
                return {
                    content: [
                        {
                            type: "text",
                            text: members ? "No members found." : "Failed to retrieve data.",
                        },
                    ],
                };
            }

            const formattedMembers = members.map(formatMember);
            return {
                content: [
                    {
                        type: "text",
                        text: `Members from the response:\n\n${formattedMembers.join("\n")}`,
                    },
                ],
            };
        }
    );

    return mcpServer;
}
