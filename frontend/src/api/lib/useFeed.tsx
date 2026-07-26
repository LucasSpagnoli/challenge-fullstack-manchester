import { useCallback, useEffect, useState } from "react";
import { getUserFeed, refreshUserFeed, refreshClientFeed } from "../feed";
import type { FeedResponse, UseFeedResult } from "../types/feed.interfaces";

export function useFeed(clientId?: number): UseFeedResult {
    const [feed, setFeed] = useState<FeedResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(clientId ? false : true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (clientId) return;

        setLoading(true);
        getUserFeed()
            .then(setFeed)
            .catch((err) => setError(err instanceof Error ? err.message : "Erro ao carregar o feed"))
            .finally(() => setLoading(false));
    }, [clientId]);

    const refresh = useCallback(async () => {
        setError(null);
        setRefreshing(true);
        try {
            const data = clientId ? await refreshClientFeed(clientId) : await refreshUserFeed();
            setFeed(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao atualizar o feed");
        } finally {
            setRefreshing(false);
        }
    }, [clientId]);

    return { feed, loading, refreshing, error, refresh };
}