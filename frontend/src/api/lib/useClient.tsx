import { useCallback, useEffect, useState } from "react";
import { createClient as apiCreateClient, getClients as apiGetClients, updateClient as apiUpdateClient, deleteClient as apiDeleteClient } from "../clients";
import type { Client, CreateClientPayload, UpdateClientPayload } from "../types/client.interfaces";

export function useClient() {
    const [loading, setLoading] = useState<boolean>(true);
    const [clients, setClients] = useState<Client[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getClients = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiGetClients();
            setClients(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Falha ao carregar os clientes.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getClients();
    }, [getClients]);

    const addClient = useCallback(async (payload: CreateClientPayload) => {
        setError(null)
        try {
            const response = await apiCreateClient(payload)
            setClients((prev) => [...prev, response.Client]);
            return response
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao cadastrar cliente.");
            throw err;
        }
    }, [])

    const updateClient = useCallback(async (client_id: number, payload: UpdateClientPayload) => {
        setError(null)
        try {
            const updatedClient = await apiUpdateClient(client_id, payload)
            setClients((prev) => prev.map((c) => (c.client_id === client_id ? updatedClient : c)));
            return updatedClient
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao atualizar cliente.");
            throw err;
        }
    }, [])

    const deleteClient = useCallback(async (client_id: number) => {
        setError(null)
        try {
            const deletedClient = await apiDeleteClient(client_id)
            setClients((prev) => prev.filter((c) => c.client_id !== client_id));
            return deletedClient
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao deletar cliente.");
            throw err;
        }
    }, [])

    return {
        clients,
        loading,
        error,
        addClient,
        updateClient,
        deleteClient,
        getClients
    };
}