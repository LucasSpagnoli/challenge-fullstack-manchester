import { apiFetch } from "./client";

import type {
    PreferencesResponse,
    UpdatePreferencesPayload,
} from "./types/preferences.interfaces";

export async function getPreferences(
    userId: number
): Promise<PreferencesResponse> {
    return apiFetch<PreferencesResponse>(`/preferences/${userId}`, {
        method: "GET",
    });
}

export async function createPreferences(
    payload: UpdatePreferencesPayload
): Promise<UpdatePreferencesPayload> {
    return apiFetch<UpdatePreferencesPayload>("/preferences", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function updatePreferences(
    payload: UpdatePreferencesPayload
): Promise<UpdatePreferencesPayload> {
    return apiFetch<UpdatePreferencesPayload>("/preferences", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}