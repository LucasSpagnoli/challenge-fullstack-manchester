import { useCallback, useEffect, useState } from "react";
import { getUserFeed, refreshUserFeed } from "../feed";
import type { FeedResponse, UseFeedResult } from "../types/feed.interfaces";

export function useFeed(): UseFeedResult {
    const [feed, setFeed] = useState<FeedResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getUserFeed()
            .then((data) => {
                setFeed(data);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : "Erro ao carregar o feed")
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const refresh = useCallback(async () => {
        setError(null);
        setRefreshing(true);
        try {
            const data = await refreshUserFeed();
            setFeed(data);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Erro ao atualizar o feed"
            );
        } finally {
            setRefreshing(false);
        }
    }, []);

    return { feed, loading, refreshing, error, refresh };
}