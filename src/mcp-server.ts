import {McpServer, ResourceTemplate} from "@modelcontextprotocol/sdk/server/mcp.js";
import {apiClient} from "./utils/ApiClient.js";
import {Idea} from "./types/Idea.js";
import {formatIdea, formatMember} from "./utils/FormatResponse.js";
import {User} from "./types/User.js";

const mcpServer = new McpServer({
    name: "ideascale-mcp-server",
    version: "1.0.0"
}, {
    capabilities: {},
});

mcpServer.tool(
    "get_ideas",
    "Get Ideas from the IdeaScale",
    async () => {
        const ideas = await apiClient.get<Idea[]>("/a/rest/v1/ideas");

        if (!ideas) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve data.",
                    },
                ],
            };
        }

        if (ideas.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No ideas found.",
                    },
                ],
            };
        }

        const formattedIdeas = ideas.map(formatIdea);
        const ideasIntoText = `Ideas from the response:\n\n${formattedIdeas.join("\n")}`;

        return {
            content: [
                {
                    type: "text",
                    text: ideasIntoText,
                },
            ],
        };
    }
)

mcpServer.tool(
    "get_members",
    "Get all members information",
    async () => {
        const members = await apiClient.get<User[]>("/a/rest/v1/members");

        if (!members) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve data.",
                    },
                ],
            };
        }

        if (members.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No members found.",
                    },
                ],
            };
        }

        const formattedMembers = members.map(formatMember);
        const membersIntoText = `Members from the response:\n\n${formattedMembers.join("\n")}`;

        return {
            content: [
                {
                    type: "text",
                    text: membersIntoText,
                },
            ],
        };
    }
)

export {mcpServer};