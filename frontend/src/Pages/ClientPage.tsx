import React, { useState } from "react";
import Header from "../components/Header";
import ClientCard from "../components/ClientCard";
import { ClientModal } from "../components/ClientModal";
import { useClient } from "../api/lib/useClient";
import type { UpdateClientPayload } from "../api/types/client.interfaces";
import { formatToday } from "../utils/formatToday";

const ClientPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clients, loading, deleteClient, addClient, updateClient } = useClient();

    return (
        <div className="min-h-screen w-full bg-white flex flex-col font-sans relative pt-20">
            <Header />

            <main className="flex-1 px-6 py-8">
                <div className="max-w-5xl mx-auto w-full">

                    <header className="mb-14">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-4xl md:text-[2.75rem] font-serif font-light text-black tracking-tight leading-none">
                                    Meus Clientes
                                </h1>
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/35">
                                    {formatToday()} · {loading ? "—" : `${clients.length} ${clients.length === 1 ? "cadastrado" : "cadastrados"}`}
                                </span>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="cursor-pointer px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 whitespace-nowrap self-start sm:self-auto">
                                + Adicionar Cliente
                            </button>
                        </div>
                        <div className="border-t-[3px] border-black" />
                        <div className="border-t border-[#D4AF37] mt-0.75" />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="border border-black/10 p-5 flex flex-col gap-4 animate-pulse min-h-100" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <div className="h-6 w-3/4 bg-black/10" />
                                    <div className="h-3 w-1/4 bg-black/10" />

                                    <div className="mt-4 h-3 w-1/3 bg-black/10" />
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-black/10" />
                                        <div className="h-6 w-20 bg-black/10" />
                                    </div>

                                    <div className="mt-auto h-10 w-full bg-black/10" />
                                    <div className="flex-1 bg-black/5 mt-4 min-h-37.5" />
                                </div>
                            ))
                        ) : clients.length > 0 ? (
                            clients.map((client, idx) => (
                                <div
                                    key={client.client_id}
                                    className="opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
                                    style={{ animationDelay: `${idx * 60}ms` }}>
                                    <ClientCard
                                        client={client}
                                        onDelete={() => { deleteClient(client.client_id) }}
                                        onUpdate={(newData: UpdateClientPayload) => { updateClient(client.client_id, newData) }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full border border-black/10 py-20 flex flex-col items-center gap-4">
                                <div className="w-8 h-px bg-[#D4AF37]" />
                                <p className="text-sm text-black/40 italic font-serif text-center px-4 max-w-sm">
                                    Nenhum cliente por aqui ainda. Clique em "Adicionar Cliente" para começar.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {isModalOpen && <ClientModal isNew={true} onClose={() => setIsModalOpen(false)} onSubmitAction={addClient} />}

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    * { animation: none !important; opacity: 1 !important; transform: none !important; }
                }
            `}</style>
        </div>
    );
};

export default ClientPage;