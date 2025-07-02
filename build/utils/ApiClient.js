import dotenv from 'dotenv';
dotenv.config();
export class ApiClient {
    baseUrl;
    defaultHeaders;
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            "User-Agent": 'ideacale-mcp-server/1.0.0',
            ...(token && { "api_token": token }),
        };
    }
    async request(endpoint, options = {}) {
        const url = this.baseUrl + endpoint;
        const headers = {
            ...this.defaultHeaders,
            ...options.headers,
        };
        try {
            const response = await fetch(url, {
                method: options.method ?? "GET",
                headers,
                body: options.body ? JSON.stringify(options.body) : undefined,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return (await response.json());
        }
        catch (error) {
            console.error("API request error:", error);
            return null;
        }
    }
    get(endpoint, headers) {
        return this.request(endpoint, { method: "GET", headers });
    }
    post(endpoint, body, headers) {
        return this.request(endpoint, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });
    }
}
if (!process.env.WORKSPACE_URL) {
    throw new Error("WORKSPACE_URL environment variable is not set");
}
if (!process.env.API_TOKEN) {
    throw new Error("API_TOKEN environment variable is not set");
}
export const apiClient = new ApiClient(process.env.WORKSPACE_URL, process.env.API_TOKEN);
