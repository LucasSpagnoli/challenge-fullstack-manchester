import React, { useState } from "react";

const PreferencesPage: React.FC = () => {
  const [newInterest, setNewInterest] = useState("");
  const [interests, setInterests] = useState<string[]>([
    "PETR4",
    "VALE3",
    "Setor bancário",
    "Taxa Selic",
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // sem lógica de back, apenas UI
  };

  const handleRemove = (item: string) => {
    // sem lógica de back, apenas UI
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="w-full border-b border-black/10">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-xl font-serif font-light tracking-[0.2em] text-black">
            AUREL<span className="text-[#D4AF37]">.</span>CAPITAL
          </span>
          <button className="text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#D4AF37] transition-colors duration-200">
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          {/* Título */}
          <div className="mb-2 flex items-center gap-3">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
              Configuração
            </span>
          </div>
          <h1 className="text-3xl font-serif font-light text-black tracking-tight mb-2">
            Seus interesses
          </h1>
          <p className="text-sm text-black/50 mb-10">
            Cadastre ativos, setores ou indicadores que você acompanha. Seu
            feed diário será personalizado com base nessas informações.
          </p>

          {/* Formulário de adição */}
          <form onSubmit={handleAdd} className="mb-10">
            <label
              htmlFor="interest"
              className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2"
            >
              Adicionar interesse
            </label>
            <div className="flex items-stretch gap-3">
              <input
                id="interest"
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Ex.: PETR4, VALE3, taxa Selic..."
                className="flex-1 border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-6 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300"
              >
                Adicionar
              </button>
            </div>
          </form>

          {/* Lista de interesses (chips) */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.15em] text-black/60 mb-4">
              Interesses cadastrados
            </h2>

            {interests.length === 0 ? (
              <p className="text-sm text-black/40 border border-dashed border-black/15 py-8 text-center">
                Nenhum interesse cadastrado ainda.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="group inline-flex items-center gap-2 border border-black/15 pl-4 pr-2 py-2 text-sm text-black hover:border-[#D4AF37] transition-colors duration-200"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      aria-label={`Remover ${item}`}
                      className="w-5 h-5 flex items-center justify-center text-black/40 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Ação salvar */}
          <div className="mt-12 pt-8 border-t border-black/10 flex items-center justify-between">
            <p className="text-xs text-black/40">
              As alterações afetam o feed gerado a partir do próximo
              atualização.
            </p>
            <button className="px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 whitespace-nowrap">
              Salvar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreferencesPage;