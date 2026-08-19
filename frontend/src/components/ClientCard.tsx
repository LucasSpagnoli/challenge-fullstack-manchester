import { useState } from "react";
import type { Client } from "../api/types/client.interfaces";
import { usePreferences } from "../api/lib/usePreferences";
import { ClientModal } from "./ClientModal";
import { cellphoneToNumber } from "../utils/cellphoneToNumber";
import type { UpdateClientPayload } from "../api/types/client.interfaces";
import { ConfirmModal } from "./ConfrmModal";

export const ClientCard = ({ client, onDelete, onUpdate }: { client: Client, onDelete: () => any, onUpdate: (newData: UpdateClientPayload) => any }) => {
    const [newPref, setNewPref] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { prefs, loading: prefsLoading, addPref, removePref, error: prefsError } = usePreferences(client.client_id);

    const handleAddPref = async () => {
        if (!newPref.trim()) return;
        addPref(newPref);
        setNewPref("");
    };

    const initial = client.name.trim().charAt(0).toUpperCase();

    return (
        <article className="flex flex-col h-full w-full border border-black/10 bg-white p-5 hover:border-[#D4AF37] transition-colors duration-300">
            <header className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 shrink-0 border border-black/15 flex items-center justify-center font-serif text-base text-black/70">
                    {initial}
                </div>
                <div className="min-w-0 pt-0.5">
                    <h2 className="text-xl font-serif font-light text-black tracking-tight truncate">
                        {client.name}
                    </h2>
                    <h4 className="text-xs text-black/50 font-sans mt-0.5">
                        {cellphoneToNumber(client.number)}
                    </h4>
                </div>
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
                        placeholder="Nova preferência"
                        className="flex-1 min-w-0 border-0 border-b border-black/20 bg-transparent py-1.5 text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 disabled:opacity-50" />
                    <button
                        onClick={handleAddPref}
                        disabled={prefsLoading}
                        className="cursor-pointer px-3 bg-black text-white text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        Adicionar
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-6">
                    {prefsLoading && prefs.length === 0 ? (
                        <span className="text-[10px] text-black/30 italic">Carregando...</span>
                    ) : prefs.length === 0 ? (
                        <span className="text-[10px] text-black/30 italic font-serif">Nenhuma preferência registrada</span>
                    ) : (
                        prefs.map((pref) => (
                            <span
                                key={pref}
                                className="inline-flex items-center gap-1 border border-black/15 pl-2 pr-1.5 py-1 text-[11px] text-black hover:border-[#D4AF37] transition-colors duration-200">
                                {pref}
                                <button
                                    onClick={() => removePref(pref)}
                                    disabled={prefsLoading}
                                    aria-label={`Remover preferência ${pref}`}
                                    className="cursor-pointer w-4 h-4 flex items-center justify-center text-black/40 hover:text-red-600 transition-colors disabled:opacity-50">
                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>
                        ))
                    )}
                </div>
                {prefsError && (
                    <p role="alert" className="text-xs text-red-700 border-l-2 border-red-700 pl-3 mt-3">
                        {prefsError}
                    </p>
                )}
            </section>

            <footer className="pt-4 border-t border-black/10 flex items-center justify-between mt-auto">
                <button className="cursor-pointer text-[10px] uppercase tracking-[0.15em] text-black/60 hover:text-[#D4AF37] transition-colors font-medium" onClick={() => setIsModalOpen(true)}>
                    Editar
                </button>
                <button onClick={() => setIsConfirmModalOpen(true)} className="cursor-pointer text-[10px] uppercase tracking-[0.15em] text-red-900/60 hover:text-red-600 transition-colors font-medium">
                    Excluir
                </button>
            </footer>
            {isModalOpen && <ClientModal isNew={false} initialData={client} onClose={() => setIsModalOpen(false)} onSubmitAction={onUpdate} />}
            {isConfirmModalOpen && <ConfirmModal onConfirm={onDelete} onCancel={() => setIsConfirmModalOpen(false)} />}
        </article>
    );
};

export default ClientCard;