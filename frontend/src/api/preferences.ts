import { apiFetch } from "./apiClient";

export async function getUserPreferences(): Promise<string[]> {
    return apiFetch<string[]>("/preferences", {
        method: "GET",
    });
}

export async function getClientPreferences(client_id: number): Promise<string[]> {
    return apiFetch<string[]>(`/preferences/${client_id}`, {
        method: "GET",
    });
}

export async function updateUserPreferences(preferences: string[]): Promise<string[]> {
    return apiFetch<string[]>("/preferences", {
        method: "PATCH",
        body: JSON.stringify({ preferences }),
    });
}

export async function updateClientPreferences(client_id: number, preferences: string[]): Promise<string[]> {
    return apiFetch<string[]>(`/preferences/${client_id}`, {
        method: "PATCH",
        body: JSON.stringify({ preferences }),
    });
}