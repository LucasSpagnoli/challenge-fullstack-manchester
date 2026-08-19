import { useCallback, useState } from "react";
import type { FeedResponse, SummaryResponse } from "../types/feed.interfaces";
import { getClientSummary } from "../feed";
import type { Client } from "../types/client.interfaces";
import { numberToCellphone } from "../../utils/numberToCellphone";

function useClientSummary(client: Client, feed: FeedResponse | null, refresh: () => Promise<void>) {
    const [error, setError] = useState<string | null>(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [sendSummaryLoading, setSendSummaryLoading] = useState(false);

    const getSummary = useCallback(async (): Promise<SummaryResponse> => {
        setError(null);
        setSummaryLoading(true);
        try {
            const newSum = await getClientSummary(client.client_id);
            window.alert("Resumo copiado!")
            return newSum
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao resumir notícias");
            return { summary: '' };
        } finally {
            setSummaryLoading(false);
        }
    }, [client.client_id]);

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
    }, [feed, refresh, getSummary]);

    const sendSummary = useCallback(async () => {
        setSendSummaryLoading(true)
        const phone = numberToCellphone(client.number)
        try {
            if (!feed?.items?.length) await refresh();
            const data = await getSummary()
            if (!data.summary) {
                setError('Resumo vazio.')
                return;
            }
            const msg = encodeURIComponent(data.summary);
            window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener,noreferrer");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao enviar resumo");
            return { summary: '' };
        } finally {
            setSendSummaryLoading(false)
        }
    }, [client.number, feed, refresh, getSummary])

    return { copySummary, summaryLoading, error, sendSummary, sendSummaryLoading };
}

export default useClientSummary