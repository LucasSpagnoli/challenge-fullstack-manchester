import { useCallback, useEffect, useState } from "react";
import { getPreferences, updatePreferences } from "../preferences";
import type { UsePreferencesResult } from "../types/preferences.interfaces";

export function usePreferences(owner_id: number | undefined, role: 'user' | 'client'): UsePreferencesResult {
    const [prefs, setPrefs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [removingTopic, setRemovingTopic] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!owner_id) {
            setLoading(false);
            return;
        }

        getPreferences(owner_id, role)
            .then((topics) => {
                setPrefs(topics);
            })
            .catch((err) => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Infortúnio ao carregar as preferências."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [owner_id, role]);

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
            if (!owner_id) {
                setError("Identificador de entidade ausente.");
                return;
            }

            const updated = prefs.filter((item) => item !== topic);

            setError(null);
            setRemovingTopic(topic);
            try {
                const data = await updatePreferences({
                    owner_id,
                    role,
                    topic: updated,
                });
                setPrefs(data.topic);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Infortúnio ao suprimir o interesse."
                );
            } finally {
                setRemovingTopic(null);
            }
        },
        [owner_id, role, prefs]
    );

    const save = useCallback(async () => {
        if (!owner_id) {
            setError("Identificador de entidade ausente.");
            return;
        }

        setError(null);
        setSaving(true);
        try {
            const data = await updatePreferences({
                owner_id,
                role,
                topic: prefs,
            });
            setPrefs(data.topic);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Infortúnio ao persistir as preferências."
            );
        } finally {
            setSaving(false);
        }
    }, [owner_id, role, prefs]);

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