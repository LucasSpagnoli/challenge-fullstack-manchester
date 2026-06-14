import React, { useState } from "react";
import { useAuth } from "../api/lib/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const { login, register, loading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await register({ name, email, password });
            } else {
                await login({ email, password });
            }
            navigate('/feed')
        } catch {
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-serif">
            {/* Painel esquerdo - branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-black relative flex-col p-16 overflow-hidden">
                {/* Linhas decorativas finas */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-[#D4AF37]/10" />
                    <div className="absolute top-1/3 left-0 w-full h-px bg-[#D4AF37]/10" />
                </div>

                {/* Topo: marca */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-light tracking-[0.2em] text-white">
                            Manchester<span className="text-[#D4AF37]"></span>
                        </span>
                    </div>
                    <div className="mt-2 w-12 h-px bg-[#D4AF37]" />
                </div>

                {/* Centro: frase de posicionamento */}
                <div className="relative z-10 max-w-md top mt-10">
                    <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6">
                        Além dos investimentos:
                    </p>
                    <h1 className="text-4xl lg:text-5xl text-white font-light leading-tight tracking-tight">
                        Somos especialistas
                        <br />
                        em cuidar de
                        <br />
                        grandes histórias.
                    </h1>
                </div>
            </div>

            {/* Painel direito - formulário */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 sm:px-12 lg:px-20">
                <div className="w-full max-w-sm">
                    {/* Marca mobile */}
                    <div className="lg:hidden mb-12 text-center">
                        <span className="text-2xl font-light tracking-[0.2em] text-black">
                            Manchester<span className="text-[#D4AF37]">.</span>
                        </span>
                        <div className="mt-3 w-12 h-px bg-[#D4AF37] mx-auto" />
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-light text-black tracking-tight">
                            {isRegister ? "Criar conta" : "Acesso à conta"}
                        </h2>
                        <p className="mt-2 text-sm text-black/50 font-sans">
                            {isRegister
                                ? "Preencha seus dados para se cadastrar."
                                : "Insira suas credenciais para continuar."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                        {/* Nome (apenas no cadastro) */}
                        {isRegister && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                                    Nome
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Seu nome completo"
                                    className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200" />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@dominio.com"
                                className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200" />
                        </div>

                        {/* Senha */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-xs uppercase tracking-[0.15em] text-black/60">
                                    Senha
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 pr-10 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-200"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                                    {showPassword ? (
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5">
                                            <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.5A10.4 10.4 0 0112 5c5.5 0 9 5 9 7-1 1.6-2 3-3.4 4.1M6.5 6.5C4.5 8 3 10 3 12c0 2 3.5 7 9 7 1.1 0 2.1-.2 3-.5" />
                                        </svg>
                                    ) : (
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5">
                                            <path d="M3 12c0-2 3.5-7 9-7s9 5 9 7-3.5 7-9 7-9-5-9-7z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mensagem de erro */}
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        {/* Botão de login/cadastro */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3.5 mt-4 text-sm uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300">
                            {loading
                                ? isRegister ? "Cadastrando..." : "Entrando..."
                                : isRegister ? "Cadastrar" : "Entrar"}
                        </button>
                    </form>

                    {/* Alternar entre login e cadastro */}
                    <p className="mt-6 text-center text-sm text-black/50 font-sans">
                        {isRegister ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsRegister((v) => !v)}
                            className="text-black hover:text-[#D4AF37] transition-colors duration-200 uppercase tracking-widest text-xs font-medium">
                            {isRegister ? "Entrar" : "Cadastre-se"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;