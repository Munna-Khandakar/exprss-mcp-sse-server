type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
};

export class ApiClient {
    private defaultHeaders: Record<string, string>;
    private API_PATH_PREFIX = "/a/rest/v1";

    constructor(
        private baseUrl: string,
        token?: string,
    ) {
        this.defaultHeaders = {
            "User-Agent": 'ideacale-mcp-server/1.0.0',
            ...(token && {"api_token": token}),
        };
    }

    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T | null> {
        const url = this.baseUrl + this.API_PATH_PREFIX + endpoint;

        const headers = {
            ...this.defaultHeaders,
            ...options.headers,
        };

        try {
            console.log("Making request to:", url);
            const response = await fetch(url, {
                method: options.method ?? "GET",
                headers,
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return (await response.json()) as T;
        } catch (error) {
            console.error("API request error:", error);
            return null;
        }
    }

    get<T>(endpoint: string, headers?: Record<string, string>) {
        return this.request<T>(endpoint, {method: "GET", headers});
    }

    post<T>(endpoint: string, body: any, headers?: Record<string, string>) {
        return this.request<T>(endpoint, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });
    }
}
