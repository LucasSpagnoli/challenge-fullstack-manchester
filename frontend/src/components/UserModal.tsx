import React, { useState } from "react";
import { createPortal } from "react-dom";
import type { CreateUserPayload } from "../api/types/user.interfaces";

interface UserModalProps {
    onClose: () => void;
    onSubmitAction: (payload: CreateUserPayload) => Promise<any>;
}

export const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmitAction }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await onSubmitAction({
                name,
                email,
                password,
                preferences: [], // Operadores não têm feed/preferências
            });
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao cadastrar operador.");
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
            <div className="bg-white w-full max-w-md p-8 shadow-2xl border border-black/10 flex flex-col">

                <header className="mb-8">
                    <h2 className="text-2xl font-serif font-light text-black tracking-tight">
                        Novo Operador
                    </h2>
                    <p className="text-sm text-black/50 font-sans mt-1">
                        Crie credenciais para um novo membro da equipe.
                    </p>
                </header>

                <form className="space-y-6 flex-1" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-xs text-red-600 font-medium tracking-wide uppercase border-l-2 border-red-600 pl-2">
                            {error}
                        </div>
                    )}

                    {/* Campo: Nome */}
                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex.: João da Silva"
                            required
                            disabled={loading}
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                        />
                    </div>

                    {/* Campo: Email */}
                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            E-mail de Acesso
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="operador@dominio.com"
                            required
                            disabled={loading}
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                        />
                    </div>

                    {/* Campo: Senha */}
                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Senha Inicial
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                        />
                    </div>

                    <footer className="mt-10 flex items-center justify-end gap-4">
                        <button
                            onClick={onClose}
                            type="button"
                            disabled={loading}
                            className="text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black transition-colors font-medium px-4 py-2 cursor-pointer disabled:opacity-50">
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 cursor-pointer disabled:opacity-50">
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </footer>
                </form>

            </div>
        </div>,
        document.body
    );
};