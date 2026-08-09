import React, { useEffect, useState } from "react";
import type { Client } from "../api/types/client.interfaces";
import { useFeed } from "../api/lib/useFeed";
import useClientSummary from "../api/lib/useClientSummary";
import { decodeHtml } from "../utils/decodeHtml";

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
                {feedLoading && (!feed?.items || feed.items.length === 0) ? (
                    <div className="border border-dashed border-black/15 py-10 flex items-center justify-center bg-black/5 w-full h-36">
                        <p className="text-xs uppercase tracking-[0.2em] text-black/40 animate-pulse">
                            Buscando notícias...
                        </p>
                    </div>
                ) : !feed?.items || feed.items.length === 0 ? (
                    <div className="border border-dashed border-black/15 py-10 flex flex-col items-center justify-center gap-2 bg-black/5 w-full h-36">
                        <p className="text-sm text-black/40 italic font-serif text-center px-4">
                            Nenhuma matéria por aqui ainda.
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-black/30">
                            Clique em "Gerar Feed" para buscar
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-black/5 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/60 hover:[&::-webkit-scrollbar-thumb]:bg-[#D4AF37] transition-colors">
                            {feed.items.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="snap-start shrink-0 w-72 md:w-80 h-32 border border-black/10 p-4 flex flex-col justify-between hover:border-[#D4AF37] hover:-translate-y-0.5 transition-all duration-200 group bg-black/2 relative">

                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[9px] uppercase tracking-[0.15em] text-[#D4AF37] block truncate">
                                            {item.source}
                                        </span>
                                        <span className="font-mono text-[9px] text-black/25 shrink-0">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <h4 className="text-sm font-serif text-black leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-3">
                                        {decodeHtml(item.title)}
                                    </h4>
                                </a>
                            ))}
                        </div>
                        {feed.items.length > 3 && (
                            <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-linear-to-l from-white to-transparent" />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};