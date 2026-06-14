import { useCallback, useEffect, useState } from "react";
import { getPreferences, updatePreferences } from "../preferences";
import { useAuth } from "./useAuth";

interface UsePreferencesResult {
    interests: string[];
    loading: boolean;
    saving: boolean;
    removingTopic: string | null;
    error: string | null;
    addInterest: (topic: string) => void;
    removeInterest: (topic: string) => Promise<void>;
    save: () => Promise<void>;
}

export function usePreferences(): UsePreferencesResult {
    const { user } = useAuth();
    const [interests, setInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [removingTopic, setRemovingTopic] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Carrega os interesses cadastrados ao montar a página
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        let mounted = true;

        getPreferences(user.userId)
            .then((topics) => {
                if (mounted) setInterests(topics);
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
    }, [user]);

    // Adiciona um novo interesse à lista local (persistido apenas ao "Salvar")
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

    // Remove um interesse e persiste imediatamente via PATCH
    // (não há endpoint de remoção individual; envia a lista sem o item)
    const removeInterest = useCallback(
        async (topic: string) => {
            if (!user) {
                setError("Usuário não autenticado");
                return;
            }

            const updated = interests.filter((item) => item !== topic);

            setError(null);
            setRemovingTopic(topic);
            try {
                const data = await updatePreferences({
                    user_id: user.userId,
                    topic: updated,
                });
                setInterests(data.topic);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Erro ao remover interesse"
                );
            } finally {
                setRemovingTopic(null);
            }
        },
        [user, interests]
    );

    // Envia a lista atualizada (com novos itens adicionados) para o backend
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

    return {
        interests,
        loading,
        saving,
        removingTopic,
        error,
        addInterest,
        removeInterest,
        save,
    };
}