import React, { useState } from "react";
import Header from "../components/Header";
import ClientCard from "../components/ClientCard";
import { ClientModal } from "../components/ClientModal";
import { useClient } from "../api/lib/useClient";

const ClientPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clients, loading, getClients } = useClient();

    return (
        <div className="min-h-screen w-full bg-white flex flex-col font-sans relative">
            <Header />

            <main className="flex-1 px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <div className="w-8 h-px bg-[#D4AF37]" />
                                <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                                    Gestão de Clientes
                                </span>
                            </div>
                            <h1 className="text-3xl font-serif font-light text-black tracking-tight">
                                MEUS CLIENTES
                            </h1>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 whitespace-nowrap">
                            + Adicionar Cliente
                        </button>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            // Esqueleto visual (Skeleton) iterado para mitigar a lacuna de carregamento
                            Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="border border-black/10 p-5 flex flex-col gap-4 animate-pulse min-h-100">
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
                            clients.map((client) => (
                                <ClientCard key={client.client_id} client={client} onUpdate={getClients} />
                            ))
                        ) : (
                            <div className="col-span-full border border-dashed border-black/15 py-16 text-center">
                                <p className="text-sm text-black/40 italic font-serif">
                                    Nenhum cliente até o momento.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {isModalOpen && <ClientModal isNew={true} onClose={() => {
                setIsModalOpen(false)
                getClients()
            }} />}
        </div>
    );
};

export default ClientPage;