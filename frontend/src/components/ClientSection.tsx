import React from "react";
import type { Client } from "../api/types/client.interfaces";
import { useFeed } from "../api/lib/useFeed";
import useClientSummary from "../api/lib/useClientSummary";
import { ClientNews } from "./ClientNews";

export const ClientSection: React.FC<{ client: Client }> = ({ client }) => {
    const { feed, loading: feedLoading, refreshing: feedRefreshing, refresh } = useFeed(client.client_id);
    const { summaryLoading, sendSummary, sendSummaryLoading, error } = useClientSummary(client, feed, refresh);

    const busy = sendSummaryLoading || summaryLoading || feedLoading || feedRefreshing;

    return (
        <section className="h-full w-full border border-black/10 bg-white p-6 flex flex-col hover:border-[#D4AF37] transition-colors duration-300">

            <div className="flex flex-col flex-1 gap-5">
                <header className="flex items-center justify-between gap-4 border-b border-black/5 pb-4">
                    <h2 className="text-xl font-serif font-light text-black tracking-tight truncate flex-1">
                        {client.name}
                    </h2>

                    <button
                        onClick={refresh}
                        disabled={busy}
                        className="shrink-0 cursor-pointer px-3 py-1.5 border border-black/20 bg-transparent text-black text-[9px] font-medium uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                        {feedRefreshing ? "Gerando..." : "Gerar Feed"}
                    </button>
                </header>

                {error && (
                    <p role="alert" className="text-xs text-red-700 border-l-2 border-red-700 pl-3">
                        {error}
                    </p>
                )}

                <div className="relative w-full flex-1 flex flex-col">
                    <div className="mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/35">
                            {feed?.items?.length
                                ? `${true ? `Atualizado às [datas]` : ""}`
                                : "Sem matérias"}
                        </span>
                    </div>

                    <ClientNews items={feed?.items} loading={feedLoading} />
                </div>
            </div>

            <button
                onClick={sendSummary}
                disabled={busy}
                className="mt-5 w-full cursor-pointer px-5 py-3 bg-black text-white text-[10px] font-medium uppercase tracking-[0.15em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                {sendSummaryLoading || summaryLoading ? "Processando..." : "Enviar Resumo"}
            </button>
        </section>
    );
};