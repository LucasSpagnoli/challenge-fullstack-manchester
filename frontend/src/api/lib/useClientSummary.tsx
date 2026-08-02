import { useCallback, useState } from "react";
import type { FeedResponse, SummaryResponse } from "../types/feed.interfaces";
import { getClientSummary } from "../feed";

function useClientSummary(clientId: number, feed: FeedResponse | null, refresh: () => Promise<void>) {
    const [error, setError] = useState<string | null>(null);
    const [summaryLoading, setSummaryLoading] = useState(false);

    const copySummary = useCallback(async () => {
        setError(null);
        try {
            if (!feed?.items?.length) await refresh();
            const data = await getSummary();
            await navigator.clipboard.writeText(data.summary);
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao copiar resumo.");
            return false;
        }
    }, [feed, refresh]);

    const getSummary = useCallback(async (): Promise<SummaryResponse> => {
        setError(null);
        setSummaryLoading(true);
        try {
            return await getClientSummary(clientId);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao resumir notícias");
            return { summary: '' };
        } finally {
            setSummaryLoading(false);
        }
    }, [clientId]);

    return { copySummary, summaryLoading, error };
}

export default useClientSummary