import React from "react";

export const NewClientModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md p-8 shadow-2xl border border-black/10 flex flex-col">
                <header className="mb-8">
                    <h2 className="text-2xl font-serif font-light text-black tracking-tight">
                        Novo Cliente
                    </h2>
                    <p className="text-sm text-black/50 font-sans mt-1">
                        Insira os dados primários para cadastro.
                    </p>
                </header>

                <form className="space-y-6 flex-1">
                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            placeholder="Ex.: João da Silva"
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Número de Celular
                        </label>
                        <input
                            type="tel"
                            placeholder="+55 (00) 00000-0000"
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
                        />
                    </div>
                </form>

                <footer className="mt-10 flex items-center justify-end gap-4">
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black transition-colors font-medium px-4 py-2"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300"
                    >
                        Cadastrar
                    </button>
                </footer>
            </div>
        </div>
    );
};