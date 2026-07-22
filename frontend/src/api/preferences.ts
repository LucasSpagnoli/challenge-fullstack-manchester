import { apiFetch } from "./client";
import type {
    UpdatePreferencesPayload,
} from "./types/preferences.interfaces";

export async function getPreferences(owner_id: number, role: 'user' | 'client'): Promise<string[]> {
    return apiFetch<string[]>(`/preferences?target_id=${owner_id}&role=${role}`, {
        method: "GET",
    });
}

export async function createPreferences(payload: UpdatePreferencesPayload): Promise<UpdatePreferencesPayload> {
    return apiFetch<UpdatePreferencesPayload>(`/preferences?target_id=${payload.owner_id}&role=${payload.role}`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function updatePreferences(payload: UpdatePreferencesPayload): Promise<UpdatePreferencesPayload> {
    return apiFetch<UpdatePreferencesPayload>(`/preferences?target_id=${payload.owner_id}&role=${payload.role}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}