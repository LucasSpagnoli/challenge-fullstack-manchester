import News from "./News";

export const ClientCard: React.FC = () => {
    return (
        <article className="flex flex-col h-full w-full border border-black/10 bg-white p-5 hover:border-[#D4AF37] transition-colors duration-300">
            <header className="mb-5">
                <h2 className="text-xl font-serif font-light text-black tracking-tight truncate">
                    Nome do Cliente
                </h2>
                <h4 className="text-xs text-black/50 font-sans mt-1">
                    +55 (11) 98765-4321
                </h4>
            </header>

            <section className="mb-5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-black/60 mb-3">
                    Preferências
                </h3>

                <div className="flex items-stretch gap-2 mb-3">
                    <input
                        type="text"
                        placeholder="Ex.: PETR4..."
                        className="flex-1 border-0 border-b border-black/20 bg-transparent py-1.5 text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                    />
                    <button className="px-3 bg-black text-white text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300">
                        Add
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {["VALE3", "Taxa Selic", "Agro"].map((pref) => (
                        <span
                            key={pref}
                            className="inline-flex items-center gap-1 border border-black/15 pl-2 pr-1.5 py-1 text-[11px] text-black hover:border-[#D4AF37] transition-colors duration-200"
                        >
                            {pref}
                            <button
                                aria-label="Remover"
                                className="w-4 h-4 flex items-center justify-center text-black/40 hover:text-red-600 transition-colors"
                            >
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            </section>

            <button className="w-full py-2.5 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 mb-5">
                Gerar Feed
            </button>

            <section className="mb-5 flex-1 min-h-30">
                <News />
            </section>

            <footer className="pt-4 border-t border-black/10 flex items-center justify-between mt-auto">
                <button className="text-[10px] uppercase tracking-[0.15em] text-black/60 hover:text-[#D4AF37] transition-colors font-medium">
                    Editar
                </button>
                <button className="text-[10px] uppercase tracking-[0.15em] text-red-900/60 hover:text-red-600 transition-colors font-medium">
                    Excluir
                </button>
            </footer>
        </article>
    );
};

export default ClientCard