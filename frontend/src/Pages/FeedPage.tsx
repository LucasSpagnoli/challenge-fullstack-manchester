import React from "react";
import { useFeed } from "../api/lib/useFeed";
import Header from "../components/Header";

// Decodifica entidades HTML que vêm nos títulos/resumos (ex.: &#8221; -> ”)
function decodeHtml(text: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

const FeedPage: React.FC = () => {
  const { feed, loading, refreshing, error, refresh } = useFeed();

  const generatedAt = feed?.generatedAt ? new Date(feed.generatedAt) : null;

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans">
      <Header />

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
                {generatedAt
                  ? <>
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
                  </>
                  : "Carregando informações do feed..."}
              </p>

              {/* Tags dos interesses considerados */}
              {feed && feed.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {feed.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs uppercase tracking-widest border border-black/15 px-3 py-1 text-black/60">
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={refresh}
              disabled={loading || refreshing}
              className="self-start sm:self-auto px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
              {refreshing ? "Atualizando..." : "Atualizar feed"}
            </button>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3 mb-8">
              {error}
            </div>
          )}

          {/* Loading inicial */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border border-black/10 p-6 flex flex-col gap-4 animate-pulse">
                  <div className="h-3 w-24 bg-black/10" />
                  <div className="h-5 w-3/4 bg-black/10" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-black/5" />
                    <div className="h-3 w-full bg-black/5" />
                    <div className="h-3 w-2/3 bg-black/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid de cards */}
          {!loading && feed && feed.items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feed.items.map((item, idx) => (
                <article
                  key={idx}
                  className="group border border-black/10 p-6 flex flex-col gap-4 hover:border-[#D4AF37] transition-colors duration-200">

                  {/* TODO: quando o backend retornar imagem, exibir aqui
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-40 object-cover border border-black/10"
                                        />
                                    )}
                                    */}

                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.15em] text-[#D4AF37]">
                      {item.source}
                    </span>
                    <div className="w-6 h-px bg-black/10 group-hover:bg-[#D4AF37] transition-colors duration-200" />
                  </div>

                  <h3 className="text-lg font-serif font-light text-black leading-snug">
                    {decodeHtml(item.title)}
                  </h3>

                  <p className="text-sm text-black/60 leading-relaxed flex-1">
                    {decodeHtml(item.summary)}
                  </p>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black hover:text-[#D4AF37] transition-colors duration-200 mt-2">
                    Ler matéria completa
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </article>
              ))}
            </div>
          )}

          {/* Estado vazio */}
          {!loading && !error && feed && feed.items.length === 0 && (
            <div className="border border-dashed border-black/15 py-16 text-center">
              <p className="text-sm text-black/40">
                Nenhuma notícia encontrada para os seus interesses hoje.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FeedPage;