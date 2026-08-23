import { useCallback, useEffect, useState } from "react";
import { createUser as apiCreateUser, getAllUsers as apiGetUsers, deleteUser as apiDeleteUser } from "../users";
import type { UserRecord, CreateUserPayload } from "../types/user.interfaces";

export function useUser() {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiGetUsers();
            setUsers(data.filter((u) => u.role === "user"));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Falha ao carregar os operadores.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const addUser = useCallback(async (payload: CreateUserPayload) => {
        setError(null);
        try {
            const response = await apiCreateUser(payload);
            setUsers((prev) => [...prev, response]);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao cadastrar operador.");
            throw err;
        }
    }, []);

    const deleteUser = useCallback(async (id: number) => {
        setError(null);
        setLoading(true);
        try {
            await apiDeleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao deletar operador.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        users,
        loading,
        error,
        addUser,
        deleteUser,
        getUsers,
    };
}
