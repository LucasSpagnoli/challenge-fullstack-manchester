import { apiFetch } from "./client";
import type {
    PreferencesResponse,
    UpdatePreferencesPayload,
} from "./types/preferences.interfaces";

/**
 * GET /preferences
 * Retorna a lista de interesses cadastrados do usuário autenticado.
 */
export async function getPreferences(): Promise<PreferencesResponse> {
    return apiFetch<PreferencesResponse>("/preferences", {
        method: "GET",
    });
}

/**
 * PATCH /preferences
 * Atualiza a lista completa de interesses do usuário.
 */
export async function updatePreferences(
    payload: UpdatePreferencesPayload
): Promise<PreferencesResponse> {
    return apiFetch<PreferencesResponse>("/preferences", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}