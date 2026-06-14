import { apiFetch } from "./client";
import type {
    PreferencesResponse,
    UpdatePreferencesPayload,
} from "./types/preferences.interfaces";

/**
 * GET /preferences/:id
 * Retorna a lista de interesses cadastrados do usuário.
 * O backend retorna o array de tópicos diretamente (string[]).
 */
export async function getPreferences(
    userId: number
): Promise<PreferencesResponse> {
    return apiFetch<PreferencesResponse>(`/preferences/${userId}`, {
        method: "GET",
    });
}

/**
 * POST /preferences
 * Cria o registro de preferências de um usuário (primeira vez).
 */
export async function createPreferences(
    payload: UpdatePreferencesPayload
): Promise<UpdatePreferencesPayload> {
    return apiFetch<UpdatePreferencesPayload>("/preferences", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

/**
 * PATCH /preferences
 * Atualiza a lista completa de interesses do usuário.
 * Usado também para remover interesses: envia a lista sem o item removido.
 */
export async function updatePreferences(
    payload: UpdatePreferencesPayload
): Promise<UpdatePreferencesPayload> {
    return apiFetch<UpdatePreferencesPayload>("/preferences", {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}