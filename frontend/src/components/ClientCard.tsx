import { useState } from "react";
import type { Client } from "../api/types/client.interfaces";
import { usePreferences } from "../api/lib/usePreferences";
import { useFeed } from "../api/lib/useFeed";
import { ClientModal } from "./ClientModal";
import { cellphoneToNumber } from "../utils/cellphoneToNumber";
import ClientNews from "./ClientNews";
import useClientSummary from "../api/lib/useClientSummary";
import type { UpdateClientPayload } from "../api/types/client.interfaces";

export const ClientCard = ({ client, onDelete, onUpdate }: { client: Client, onDelete: () => any, onUpdate: (newData: UpdateClientPayload) => any }) => {
    const [newPref, setNewPref] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { prefs, loading: prefsLoading, addPref, removePref, error: prefsError } = usePreferences(client.client_id);
    const { feed, loading: feedLoading, refreshing: feedRefreshing, refresh } = useFeed(client.client_id);
    const { copySummary, error, summaryLoading, sendSummary, sendSummaryLoading } = useClientSummary(client, feed, refresh);

    const handleAddPref = async () => {
        if (!newPref.trim()) return;
        addPref(newPref);
        setNewPref("");
    };

    return (
        <article className="flex flex-col h-full w-full border border-black/10 bg-white p-5 hover:border-[#D4AF37] transition-colors duration-300">
            <header className="mb-5">
                <h2 className="text-xl font-serif font-light text-black tracking-tight truncate">
                    {client.name}
                </h2>
                <h4 className="text-xs text-black/50 font-sans mt-1">
                    {cellphoneToNumber(client.number)}
                </h4>
            </header>

            <section className="mb-5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-black/60 mb-3">
                    Preferências
                </h3>

                <div className="flex items-stretch gap-2 mb-3">
                    <input
                        type="text"
                        value={newPref}
                        onChange={(e) => setNewPref(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddPref()}
                        disabled={prefsLoading}
                        className="flex-1 border-0 border-b border-black/20 bg-transparent py-1.5 text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 disabled:opacity-50" />
                    <button
                        onClick={handleAddPref}
                        disabled={prefsLoading}
                        className="px-3 bg-black text-white text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-200 disabled:opacity-50">
                        Adicionar
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-6">
                    {prefsLoading && prefs.length === 0 ? (
                        <span className="text-[10px] text-black/30 italic">Carregando...</span>
                    ) : (
                        prefs.map((pref) => (
                            <span
                                key={pref}
                                className="inline-flex items-center gap-1 border border-black/15 pl-2 pr-1.5 py-1 text-[11px] text-black hover:border-[#D4AF37] transition-colors duration-200">
                                {pref}
                                <button
                                    onClick={() => removePref(pref)}
                                    disabled={prefsLoading}
                                    aria-label="Remover"
                                    className="w-4 h-4 flex items-center justify-center text-black/40 hover:text-red-600 transition-colors disabled:opacity-50">
                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>
                        ))
                    )}
                    {prefsError && <p className="text-xs text-red-600 mb-2">{prefsError}</p>}
                </div>
            </section>

            <button
                onClick={refresh}
                disabled={feedLoading || feedRefreshing}
                className="w-full py-2.5 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 mb-5 disabled:opacity-50">
                {feedRefreshing ? "Atualizando..." : "Gerar Feed"}
            </button>

            <section className="mb-5 flex-1 flex flex-col">
                <ClientNews items={feed?.items || []} loading={feedLoading} />
            </section>

            <div className="flex items-center gap-3 mb-5">
                <button
                    type="button"
                    disabled={summaryLoading}
                    className="flex-1 py-2 border border-black/20 bg-transparent text-black text-[10px] font-medium uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 disabled:opacity-50"
                    onClick={copySummary}>
                    {summaryLoading ? 'Resumindo...' : 'Copiar Resumo'}
                </button>

                <button
                    type="button"
                    disabled={summaryLoading || sendSummaryLoading}
                    className="flex-1 py-2 bg-black text-white text-[10px] font-medium uppercase tracking-[0.15em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 flex justify-center items-center gap-2 disabled:opacity-50"
                    onClick={sendSummary}>
                    {sendSummaryLoading ? 'Redirecionando...' : 'Enviar Resumo'}
                </button>
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            <footer className="pt-4 border-t border-black/10 flex items-center justify-between mt-auto">
                <button className="text-[10px] uppercase tracking-[0.15em] text-black/60 hover:text-[#D4AF37] transition-colors font-medium" onClick={() => setIsModalOpen(true)}>
                    Editar
                </button>
                <button onClick={onDelete} className="text-[10px] uppercase tracking-[0.15em] text-red-900/60 hover:text-red-600 transition-colors font-medium">
                    Excluir
                </button>
            </footer>
            {isModalOpen && <ClientModal isNew={false} initialData={client} onClose={() => setIsModalOpen(false)} onSubmitAction={onUpdate} />}
        </article>
    );
};

export default ClientCard;