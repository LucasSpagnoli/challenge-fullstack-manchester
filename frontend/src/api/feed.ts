import { apiFetch } from "./apiClient";
import type { FeedResponse } from "./types/feed.interfaces";

export async function getUserFeed(): Promise<FeedResponse> {
    return apiFetch<FeedResponse>("/feed", {
        method: "GET",
    });
}

export async function getClientFeed(client_id: number): Promise<FeedResponse> {
    return apiFetch<FeedResponse>(`/feed/${client_id}`, {
        method: "GET",
    });
}

export async function refreshUserFeed(): Promise<FeedResponse> {
    return apiFetch<FeedResponse>("/feed/refresh", {
        method: "GET",
    });
}

export async function refreshClientFeed(client_id: number): Promise<FeedResponse> {
    return apiFetch<FeedResponse>(`/feed/refresh/${client_id}`, {
        method: "GET",
    });
}