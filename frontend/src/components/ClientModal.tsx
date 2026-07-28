import React, { useState, useEffect } from "react";
import type { Client } from "../api/types/client.interfaces";
import { useClient } from "../api/lib/useClient";

interface ClientModalProps {
    onClose: () => void;
    isNew: boolean;
    initialData?: Client;
    client_id?: number
}

export const ClientModal: React.FC<ClientModalProps> = ({ onClose, isNew, initialData, client_id }) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addClient, updateClient } = useClient()

    useEffect(() => {
        if (!isNew && initialData) {
            setName(initialData.name);
            setNumber(initialData.number);
        }
    }, [isNew, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedNumber = number.trim();

        if (!trimmedName || !trimmedNumber) return;

        setIsSubmitting(true);
        try {
            if (isNew) {
                await addClient({ name: trimmedName, number: trimmedNumber })
            } else if (client_id) {
                await updateClient(client_id, { name: trimmedName, number: trimmedNumber })
            } else {
                console.error('Erro ao invocar modal de cliente')
            }
            onClose();
        } catch (error) {
            console.error("Falha ao consolidar os dados:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md p-8 shadow-2xl border border-black/10 flex flex-col">
                <header className="mb-8">
                    <h2 className="text-2xl font-serif font-light text-black tracking-tight">
                        {isNew ? "Novo Cliente" : "Editar Cliente"}
                    </h2>
                    <p className="text-sm text-black/50 font-sans mt-1">
                        {isNew
                            ? "Insira os dados primários para cadastro."
                            : "Retifique as credenciais do cliente."}
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex.: João da Silva"
                            disabled={isSubmitting}
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Número de Celular
                        </label>
                        <input
                            type="tel"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="+55 (00) 00000-0000"
                            disabled={isSubmitting}
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 disabled:opacity-50"
                        />
                    </div>

                    <footer className="mt-10 flex items-center justify-end gap-4">
                        <button
                            onClick={onClose}
                            type="button"
                            disabled={isSubmitting}
                            className="text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black transition-colors font-medium px-4 py-2 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !number.trim()}
                            className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Processando..."
                                : isNew
                                    ? "Cadastrar"
                                    : "Salvar"}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};