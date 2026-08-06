import { apiFetch } from "./apiClient";
import type { Client, CreateClientPayload, UpdateClientPayload } from "./types/client.interfaces";

export async function getClients(): Promise<Client[]> {
    const data = await apiFetch<any[]>("/clients", { method: "GET" });
    return data.map((c) => ({
        client_id: c.id,
        name: c.name,
        number: c.number,
        user_id: c.user_id,
    }));
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

export function createClient(payload: CreateClientPayload): Promise<{ Client: Client; }> {
    return apiFetch<{ Client: Client; }>(`/clients`, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export function deleteClient(client_id: number): Promise<Client> {
    return apiFetch<Client>(`/clients/${client_id}`, {
        method: "DELETE"
    });
}