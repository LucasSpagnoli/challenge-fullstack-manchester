import React, { useEffect, useState } from "react";
import type { Client } from "../api/types/client.interfaces";
import { useFeed } from "../api/lib/useFeed";
import useClientSummary from "../api/lib/useClientSummary";
import { ClientNews } from "./ClientNews";

const formatTime = (date: Date) =>
    date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export const ClientSection: React.FC<{ client: Client }> = ({ client }) => {
    const { feed, loading: feedLoading, refreshing: feedRefreshing, refresh } = useFeed(client.client_id);
    const { copySummary, summaryLoading, sendSummary, sendSummaryLoading, error } = useClientSummary(client, feed, refresh);

    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const busy = sendSummaryLoading || summaryLoading || feedLoading || feedRefreshing;

    useEffect(() => {
        if (feed?.items && feed.items.length > 0) {
            setLastUpdated(new Date());
        }
    }, [feed]);

    return (
        <section className="w-full border border-black/10 bg-white p-6 flex flex-col gap-5 hover:border-[#D4AF37] transition-colors duration-300">

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-4">
                <div className="flex flex-col gap-1 min-w-0">
                    <h2 className="text-2xl font-serif font-light text-black tracking-tight truncate max-w-md">
                        {client.name}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">
                        {feed?.items?.length
                            ? `${lastUpdated ? `Atualizado às ${formatTime(lastUpdated)}` : ""}`
                            : "Sem matérias ainda"}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                        onClick={refresh}
                        disabled={busy}
                        className="cursor-pointer px-5 py-2 border border-black/20 bg-transparent text-black text-[10px] font-medium uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                        {feedRefreshing ? "Atualizando..." : "Gerar Feed"}
                    </button>

                    <button
                        onClick={copySummary}
                        disabled={busy}
                        className="cursor-pointer px-5 py-2 border border-black/20 bg-transparent text-black text-[10px] font-medium uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                        {summaryLoading ? "Resumindo..." : "Copiar Resumo"}
                    </button>

                    <button
                        onClick={sendSummary}
                        disabled={busy}
                        className="cursor-pointer px-5 py-2 bg-black text-white text-[10px] font-medium uppercase tracking-[0.15em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 flex items-center justify-center min-w-35 disabled:opacity-40 disabled:cursor-not-allowed">
                        {sendSummaryLoading ? "Redirecionando..." : "Enviar Resumo"}
                    </button>
                </div>
            </header>

            {error && (
                <p role="alert" className="text-xs text-red-700 border-l-2 border-red-700 pl-3">
                    {error}
                </p>
            )}

            <div className="relative w-full">
                <ClientNews items={feed?.items} loading={feedLoading} />
            </div>
        </section>
    );
};