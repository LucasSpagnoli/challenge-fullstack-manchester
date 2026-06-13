import React from "react";

interface NewsItem {
  title: string;
  source: string;
  url: string;
  summary: string;
}

const mockItems: NewsItem[] = [
  {
    title: "Petrobras anuncia novo dividendo",
    source: "InfoMoney",
    url: "#",
    summary:
      "A Petrobras divulgou hoje pagamento de R$ 0,87 por ação, acima do esperado pelo mercado.",
  },
  {
    title: "Bancos elevam projeção do PIB",
    source: "Valor Econômico",
    url: "#",
    summary:
      "Itaú e Bradesco revisaram para cima a estimativa de crescimento do PIB de 2025 para 2,1%.",
  },
  {
    title: "Vale anuncia recorde de produção de minério",
    source: "InfoMoney",
    url: "#",
    summary:
      "A mineradora registrou o maior volume trimestral dos últimos cinco anos, impulsionado pela demanda chinesa.",
  },
  {
    title: "Selic deve permanecer estável, dizem analistas",
    source: "Valor Econômico",
    url: "#",
    summary:
      "Mercado prevê manutenção da taxa básica de juros na próxima reunião do Copom, segundo pesquisa com economistas.",
  },
];

const FeedPage: React.FC = () => {
  const generatedAt = new Date();

  const handleRefresh = () => {
    // sem lógica de back, apenas UI
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="w-full border-b border-black/10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-xl font-serif font-light tracking-[0.2em] text-black">
            AUREL<span className="text-[#D4AF37]">.</span>CAPITAL
          </span>
          <nav className="flex items-center gap-6">
            <button className="text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#D4AF37] transition-colors duration-200">
              Preferências
            </button>
            <button className="text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#D4AF37] transition-colors duration-200">
              Sair
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Título e ações */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                  Resumo diário
                </span>
              </div>
              <h1 className="text-3xl font-serif font-light text-black tracking-tight mb-2">
                Seu feed personalizado
              </h1>
              <p className="text-sm text-black/50">
                Gerado em{" "}
                {generatedAt.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                às{" "}
                {generatedAt.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <button
              onClick={handleRefresh}
              className="self-start sm:self-auto px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 whitespace-nowrap"
            >
              Atualizar feed
            </button>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockItems.map((item, idx) => (
              <article
                key={idx}
                className="group border border-black/10 p-6 flex flex-col gap-4 hover:border-[#D4AF37] transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#D4AF37]">
                    {item.source}
                  </span>
                  <div className="w-6 h-px bg-black/10 group-hover:bg-[#D4AF37] transition-colors duration-200" />
                </div>

                <h3 className="text-lg font-serif font-light text-black leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-black/60 leading-relaxed flex-1">
                  {item.summary}
                </p>

                <a
                  href={item.url}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black hover:text-[#D4AF37] transition-colors duration-200 mt-2"
                >
                  Ler matéria completa
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </article>
            ))}
          </div>

          {/* Estado vazio (referência, não usado com mock) */}
          {/*
          <div className="border border-dashed border-black/15 py-16 text-center">
            <p className="text-sm text-black/40">
              Nenhuma notícia encontrada para os seus interesses hoje.
            </p>
          </div>
          */}
        </div>
      </main>
    </div>
  );
};

export default FeedPage