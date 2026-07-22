import React, { useState } from "react";
import Header from "../components/Header";
import ClientCard from "../components/ClientCard";
import { NewClientModal } from "../components/NewClientModal";
import { useClient } from "../api/lib/useClient";

const ClientPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clients, updateClient, deleteClient } = useClient()


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
                                    Carteira
                                </span>
                            </div>
                            <h1 className="text-3xl font-serif font-light text-black tracking-tight">
                                Gestão de Clientes
                            </h1>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 whitespace-nowrap">
                            + Adicionar Cliente
                        </button>
                    </header>

                    {/* Malha (Grid) de 3 colunas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            clients.length > 0
                                ?
                                clients.map((client) => (
                                    <ClientCard key={client.client_id} client={client} />
                                ))
                                :
                                <h1>Sem clientes registrados</h1>
                        }
                    </div>
                </div>
            </main>

            {/* Renderização condicional do Formulário */}
            {isModalOpen && <NewClientModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ClientPage;