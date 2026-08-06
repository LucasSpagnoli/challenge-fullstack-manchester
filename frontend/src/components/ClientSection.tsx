import React from "react";
import type { Client } from "../api/types/client.interfaces";
import { useFeed } from "../api/lib/useFeed";
import useClientSummary from "../api/lib/useClientSummary";

function decodeHtml(text: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

export const ClientSection: React.FC<{ client: Client }> = ({ client }) => {
    const { feed, loading: feedLoading, refreshing: feedRefreshing, refresh } = useFeed(client.client_id);
    const { copySummary, summaryLoading, sendSummary, sendSummaryLoading, error } = useClientSummary(client, feed, refresh);

    return (
        <section className="w-full border border-black/10 bg-white p-6 flex flex-col gap-5 hover:border-[#D4AF37] transition-colors duration-300">

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-4">
                <h2 className="text-2xl font-serif font-light text-black tracking-tight truncate max-w-md">
                    {client.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                        onClick={refresh}
                        disabled={feedLoading || feedRefreshing}
                        className="px-5 py-2 border border-black/20 bg-transparent text-black text-[10px] font-medium uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 disabled:opacity-50">
                        {feedRefreshing ? "Atualizando..." : "Gerar Feed"}
                    </button>

                    <button
                        onClick={copySummary}
                        disabled={summaryLoading || feedLoading}
                        className="px-5 py-2 border border-black/20 bg-transparent text-black text-[10px] font-medium uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 disabled:opacity-50">
                        {summaryLoading ? "Resumindo..." : "Copiar Resumo"}
                    </button>

                    <button
                        onClick={sendSummary}
                        disabled={summaryLoading || sendSummaryLoading || feedLoading}
                        className="px-5 py-2 bg-black text-white text-[10px] font-medium uppercase tracking-[0.15em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 flex items-center justify-center min-w-35 disabled:opacity-50">
                        {sendSummaryLoading ? "Redirecionando..." : "Enviar Resumo"}
                    </button>
                </div>
            </header>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <div className="relative w-full">
                {feedLoading && (!feed?.items || feed.items.length === 0) ? (
                    <div className="border border-dashed border-black/15 py-10 flex items-center justify-center bg-black/5 w-full h-36">
                        <p className="text-xs uppercase tracking-[0.2em] text-black/40 animate-pulse">
                            Buscando informações atinentes...
                        </p>
                    </div>
                ) : !feed?.items || feed.items.length === 0 ? (
                    <div className="border border-dashed border-black/15 py-10 flex items-center justify-center bg-black/5 w-full h-36">
                        <p className="text-sm text-black/40 italic font-serif text-center px-4">
                            Acione 'Gerar Feed' para prospectar o compêndio de notícias.
                        </p>
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-black/5 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/60 hover:[&::-webkit-scrollbar-thumb]:bg-[#D4AF37] transition-colors">
                        {feed.items.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="snap-start shrink-0 w-72 md:w-80 h-32 border border-black/10 p-4 flex flex-col hover:border-[#D4AF37] transition-colors duration-200 group bg-black/2 relative">

                                <span className="text-[9px] uppercase tracking-[0.15em] text-[#D4AF37] mb-2 block">
                                    {item.source}
                                </span>

                                <h4 className="text-sm font-serif text-black leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-3">
                                    {decodeHtml(item.title)}
                                </h4>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};