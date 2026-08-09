import React from "react";
import Header from "../components/Header";
import { ClientSection } from "../components/ClientSection";
import { useClient } from "../api/lib/useClient";

const FeedPage: React.FC = () => {
  const { clients, loading } = useClient();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans relative">
      <Header />

      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto w-full">

          <header className="mb-12">
            <div className="mb-2 flex items-center gap-3">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                Geral
              </span>
            </div>
            <h1 className="text-3xl font-serif font-light text-black tracking-tight">
              FEED DOS CLIENTES
            </h1>
          </header>

          <div className="flex flex-col gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border border-black/10 p-6 flex flex-col gap-6 animate-pulse">
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
              clients.map((client) => (
                <ClientSection key={client.client_id} client={client} />
              ))
            ) : (
              <div className="border border-dashed border-black/15 py-20 text-center">
                <p className="text-sm text-black/40 italic font-serif">
                  Inexistência de clientes cadastrados para gerar o feed.
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