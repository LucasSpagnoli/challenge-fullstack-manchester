import { useCallback, useEffect, useState } from "react";
import { getPreferences, updatePreferences } from "../preferences";
import { useAuth } from "./useAuth";
import type { UsePreferencesResult } from "../types/preferences.interfaces";

export function usePreferences(): UsePreferencesResult {
    const { user } = useAuth();
    const [prefs, setPrefs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [removingTopic, setRemovingTopic] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        getPreferences(user.userId)
            .then((topics) => {
                setPrefs(topics);
            })
            .catch((err) => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Erro ao carregar preferências"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]);

    const addPref = useCallback((topic: string) => {
        const trimmed = topic.trim();
        if (!trimmed) return;

        setPrefs((prev) => {
            if (prev.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
                return prev;
            }
            return [...prev, trimmed];
        });
    }, []);

    const removePref = useCallback(
        async (topic: string) => {
            if (!user) {
                setError("Usuário não autenticado");
                return;
            }

            const updated = prefs.filter((item) => item !== topic);

            setError(null);
            setRemovingTopic(topic);
            try {
                const data = await updatePreferences({
                    user_id: user.userId,
                    topic: updated,
                });
                setPrefs(data.topic);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Erro ao remover interesse"
                );
            } finally {
                setRemovingTopic(null);
            }
        },
        [user, prefs]
    );

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
                topic: prefs,
            });
            setPrefs(data.topic);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Erro ao salvar preferências"
            );
        } finally {
            setSaving(false);
        }
    }, [user, prefs]);

    return {
        prefs,
        loading,
        saving,
        removingTopic,
        error,
        addPref,
        removePref,
        save,
    };
}