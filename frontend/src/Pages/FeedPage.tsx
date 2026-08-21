import React from "react";
import Header from "../components/Header";
import { ClientSection } from "../components/ClientSection";
import { useClient } from "../api/lib/useClient";
// import { formatToday } from "../utils/formatToday";

export const FeedPage: React.FC = () => {
  const { clients, loading } = useClient();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans relative md:pt-10 pt-15">
      <Header />

      <main className="flex-1 pt-7">
        <div className="max-w-268 w-full mx-auto">

          {/* <header className="mb-5">
            <div className="flex items-end justify-between gap-6 pb-4">
              <h1 className="text-4xl font-serif font-light text-black tracking-tight leading-none">
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
          </header> */}

          <div className="relative">
            <div className="flex overflow-x-auto gap-4 sm:gap-6 px-4 sm:px-6 pb-5 items-stretch snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-[#D4AF37] transition-colors">

              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 w-[85vw] xs:w-72 sm:w-80 lg:w-95 snap-center border border-black/10 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 animate-pulse h-100 sm:h-100"
                    style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="flex justify-between items-end border-b border-black/5 pb-4">
                      <div className="h-6 w-3/4 bg-black/10" />
                    </div>
                    <div className="flex-1 w-full bg-black/5" />
                  </div>
                ))
              ) : clients.length > 0 ? (
                clients.map((client, idx) => (
                  <div
                    key={client.client_id}
                    className="shrink-0 w-[85vw] mt-3 -mb-3 xs:w-72 sm:w-80 lg:w-95 snap-center opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards] flex flex-col"
                    style={{ animationDelay: `${idx * 60}ms` }}>
                    <ClientSection client={client} index={idx} total={clients.length} />
                  </div>
                ))
              ) : (
                <div className="w-full border-y border-black/10 py-16 sm:py-24 flex flex-col items-center gap-4">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <p className="text-sm sm:text-base text-black/50 italic font-serif text-center px-4 max-w-sm">
                    Nenhum cliente cadastrado ainda. Assim que você adicionar um, o feed de notícias aparece aqui.
                  </p>
                </div>
              )}
            </div>

            {clients.length > 0 && (
              <>
                <div className="pointer-events-none absolute -left-2 top-0 bottom-5 w-6 sm:w-12 bg-linear-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute -right-2 top-0 bottom-5 w-6 sm:w-12 bg-linear-to-l from-white to-transparent" />
              </>
            )}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};