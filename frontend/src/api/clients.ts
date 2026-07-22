import { apiFetch } from "./client";
import type { Client, UpdateClientPayload } from "./types/client.interfaces";

export function getClients(user_id: number): Promise<Client[]> {
    return apiFetch<Client[]>(`/clients/${user_id}`, {
        method: "GET",
    });
}

export function updateClient(client: UpdateClientPayload): Promise<Client> {
    return apiFetch<Client>(`/clients/${user_id}`, {
        method: "GET",
    });
}

export function addClient

export function deleteClient