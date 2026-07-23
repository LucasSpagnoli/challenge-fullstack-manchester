import { apiFetch } from "./apiClient";
import type { Client, CreateClientPayload, UpdateClientPayload } from "./types/client.interfaces";

export function getClients(): Promise<Client[]> {
    return apiFetch<Client[]>(`/clients`, {
        method: "GET",
    });
}

export function getClientById(client_id: number): Promise<Client[]> {
    return apiFetch<Client[]>(`/clients/${client_id}`, {
        method: "GET",
    });
}

export function updateClient(client_id: number, payload: UpdateClientPayload): Promise<Client> {
    return apiFetch<Client>(`/clients/${client_id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });
}

export function createClient(payload: CreateClientPayload): Promise<{ newClient: Client; Preferences: any }> {
    return apiFetch<{ newClient: Client; Preferences: any }>(`/clients`, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export function deleteClient(client_id: number): Promise<Client> {
    return apiFetch<Client>(`/clients/${client_id}`, {
        method: "DELETE"
    });
}