import React from "react";
import Header from "../components/Header";
import { ClientSection } from "../components/ClientSection";
import { useClient } from "../api/lib/useClient";
import { formatToday } from "../utils/formatToday";

const FeedPage: React.FC = () => {
  const { clients, loading } = useClient();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans relative pt-20">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto w-full">

          <header className="mb-14">
            <div className="flex items-end justify-between gap-6 pb-4">
              <h1 className="text-4xl md:text-[2.75rem] font-serif font-light text-black tracking-tight leading-none">
                Feed dos Clientes
              </h1>
              <div className="hidden sm:flex flex-col items-end shrink-0 pb-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
                  {formatToday()}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                  {loading ? "—" : `${clients.length} ${clients.length === 1 ? "cliente" : "clientes"}`}
                </span>
              </div>
            </div>
            <div className="border-t-[3px] border-black" />
            <div className="border-t border-[#D4AF37] mt-0.75" />
          </header>

          <div className="flex flex-col gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border border-black/10 p-6 flex flex-col gap-6 animate-pulse"
                  style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex justify-between items-end border-b border-black/5 pb-4">
                    <div className="h-6 w-48 bg-black/10" />
                    <div className="flex gap-3">
                      <div className="h-9 w-28 bg-black/10" />
                      <div className="h-9 w-32 bg-black/10" />
                      <div className="h-9 w-36 bg-black/10" />
                    </div>
                  </div>
                  <div className="h-36 w-full bg-black/5" />
                </div>
              ))
            ) : clients.length > 0 ? (
              clients.map((client, idx) => (
                <div
                  key={client.client_id}
                  className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
                  style={{ animationDelay: `${idx * 60}ms` }}>
                  <ClientSection client={client} />
                </div>
              ))
            ) : (
              <div className="border border-black/10 py-24 flex flex-col items-center gap-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <p className="text-base text-black/50 italic font-serif text-center px-4 max-w-sm">
                  Nenhum cliente cadastrado ainda. Assim que você adicionar um, o feed de notícias aparece aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedPage;