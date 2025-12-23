
import { authClient } from "./auth-client";

type FetchOptions = RequestInit & {
    params?: Record<string, string>;
};

const BASE_URL = "http://localhost:3000/api";

export const apiClient = {
    fetch: async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
        const { params, ...init } = options;
        const session = await authClient.getSession();

        // Construct URL with params
        const url = new URL(`${BASE_URL}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        // Set headers
        const headers = new Headers(init.headers);
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }

        const response = await fetch(url.toString(), {
            ...init,
            headers,
            credentials: "include",
        });

        if (!response.ok) {
            // Try to parse error message
            try {
                const errorData = await response.json();
                throw new Error(errorData.message || errorData.error || "API Request Failed");
            } catch (e) {
                throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
            }
        }

        return response.json();
    },

    get: <T>(endpoint: string, params?: Record<string, string>) => {
        return apiClient.fetch<T>(endpoint, { method: "GET", params });
    },

    post: <T>(endpoint: string, body: any) => {
        return apiClient.fetch<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        });
    },
};
