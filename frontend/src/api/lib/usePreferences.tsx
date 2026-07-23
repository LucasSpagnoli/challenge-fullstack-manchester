import { useCallback, useEffect, useState } from "react";
import { getUserPreferences, updateUserPreferences } from "../preferences";
import type { UsePreferencesResult } from "../types/preferences.interfaces";

export function usePreferences(): UsePreferencesResult {
    const [prefs, setPrefs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        getUserPreferences()
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
    }, []);

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

    const removePref = useCallback((topic: string) => {
        setPrefs((prev) => prev.filter((item) => item !== topic));
    }, []);

    const save = useCallback(async () => {
        setError(null);
        setSaving(true);
        try {
            const data = await updateUserPreferences(prefs);
            setPrefs(data);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Infortúnio ao persistir as preferências."
            );
        } finally {
            setSaving(false);
        }
    }, [prefs]);

    return {
        prefs,
        loading,
        saving,
        error,
        addPref,
        removePref,
        save,
    };
}