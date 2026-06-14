import { apiFetch } from "./client";
import type { FeedResponse } from "./types/feed.interfaces";

export async function getFeed(): Promise<FeedResponse> {
    return apiFetch<FeedResponse>("/feed", {
        method: "GET",
    });
}

export async function refreshFeed(): Promise<FeedResponse> {
    return apiFetch<FeedResponse>("/feed/refresh", {
        method: "GET",
    });
}