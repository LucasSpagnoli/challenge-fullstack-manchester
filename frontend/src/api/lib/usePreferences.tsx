import { useCallback, useEffect, useState } from "react";
import { getPreferences, updatePreferences } from "../preferences";
import { useAuth } from "./useAuth";

interface UsePreferencesResult {
    interests: string[];
    loading: boolean;
    saving: boolean;
    error: string | null;
    addInterest: (topic: string) => void;
    removeInterest: (topic: string) => void;
    save: () => Promise<void>;
}

export function usePreferences(): UsePreferencesResult {
    const { user } = useAuth();
    const [interests, setInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Carrega os interesses cadastrados ao montar a página
    useEffect(() => {
        let mounted = true;

        getPreferences()
            .then((data) => {
                if (mounted) setInterests(data.topic);
            })
            .catch((err) => {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Erro ao carregar preferências"
                    );
                }
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    // Adiciona um novo interesse à lista local (sem persistir ainda)
    const addInterest = useCallback((topic: string) => {
        const trimmed = topic.trim();
        if (!trimmed) return;

        setInterests((prev) => {
            // evita duplicados (case-insensitive)
            if (prev.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
                return prev;
            }
            return [...prev, trimmed];
        });
    }, []);

    // Remove um interesse da lista local (sem persistir ainda)
    const removeInterest = useCallback((topic: string) => {
        setInterests((prev) => prev.filter((item) => item !== topic));
    }, []);

    // Envia a lista atualizada para o backend via PATCH /preferences
    const save = useCallback(async () => {
        if (!user) {
            setError("Usuário não autenticado");
            return;
        }

        setError(null);
        setSaving(true);
        try {
            const data = await updatePreferences({
                user_id: user.userId,
                topic: interests,
            });
            setInterests(data.topic);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Erro ao salvar preferências"
            );
        } finally {
            setSaving(false);
        }
    }, [user, interests]);

    return { interests, loading, saving, error, addInterest, removeInterest, save };
}