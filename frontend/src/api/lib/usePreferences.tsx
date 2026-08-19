import { useCallback, useEffect, useState } from "react";
import {
    getUserPreferences,
    updateUserPreferences,
    getClientPreferences,
    updateClientPreferences
} from "../preferences";
import type { UsePreferencesResult } from "../types/preferences.interfaces";

export function usePreferences(clientId?: number): UsePreferencesResult {
    const [prefs, setPrefs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPrefs = useCallback(async () => {
        setLoading(true);
        try {
            console.log(clientId)
            const data = clientId
                ? await getClientPreferences(clientId)
                : await getUserPreferences();
            if (Array.isArray(data)) setPrefs(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Infortúnio ao carregar as preferências.");
        } finally {
            setLoading(false);
        }
    }, [clientId]);

    useEffect(() => {
        fetchPrefs();
    }, [fetchPrefs]);

    const updatePrefs = useCallback(async (newPrefs: string[]) => {
        setSaving(true);
        setError(null);
        try {
            const data = clientId
                ? await updateClientPreferences(clientId, newPrefs)
                : await updateUserPreferences(newPrefs);

            if (Array.isArray(data)) {
                setPrefs(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Infortúnio ao persistir as preferências.");
            fetchPrefs();
        } finally {
            setSaving(false);
        }
    }, [clientId, fetchPrefs]);

    const addPref = useCallback(async (topic: string) => {
        const trimmedPref = topic.trim();
        if (!trimmedPref) return;

        const alreadyExists = prefs.some((item) => item.toLowerCase() === trimmedPref.toLowerCase());
        if (alreadyExists) return;

        const newPrefs = [...prefs, trimmedPref];
        setPrefs(newPrefs);

        if (clientId) {
            await updatePrefs(newPrefs);
        }
    }, [prefs, clientId, updatePrefs]);

    const removePref = useCallback(async (topic: string) => {
        const newPrefs = prefs.filter((item) => item !== topic);
        setPrefs(newPrefs);

        if (clientId) {
            await updatePrefs(newPrefs);
        }
    }, [prefs, clientId, updatePrefs]);

    const save = useCallback(async () => {
        await updatePrefs(prefs);
    }, [prefs, updatePrefs]);

    return { prefs, loading, saving, error, addPref, removePref, save };
}