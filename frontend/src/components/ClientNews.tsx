import React from "react";
import { decodeHtml } from "../utils/decodeHtml";
import type { ClientNewsProps } from "../api/types/feed.interfaces";

export const ClientNews: React.FC<ClientNewsProps> = ({ items, loading }) => {
    const itemCount = items?.length ?? 0;

    if (loading && itemCount === 0) {
        return (
            <div className="border border-dashed border-black/15 py-10 flex items-center justify-center bg-black/5 w-full h-36">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 animate-pulse">
                    Buscando notícias...
                </p>
            </div>
        );
    }

    if (itemCount === 0) {
        return (
            <div className="border border-dashed border-black/15 py-10 flex flex-col items-center justify-center gap-2 bg-black/5 w-full h-36">
                <p className="text-sm text-black/40 italic font-serif text-center px-4">
                    Nenhuma matéria por aqui ainda.
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-black/30">
                    Clique em "Gerar Feed" para buscar
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="flex gap-4 overflow-x-auto pt-2 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-black/5 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/60 hover:[&::-webkit-scrollbar-thumb]:bg-[#D4AF37] transition-colors">
                {items!.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="snap-start shrink-0 w-72 md:w-80 h-32 border border-black/10 p-4 flex flex-col justify-between hover:border-[#D4AF37] hover:-translate-y-0.5 transition-all duration-200 group bg-black/2 relative">

                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] uppercase tracking-[0.15em] text-[#D4AF37] block truncate">
                                {item.source}
                            </span>
                            <span className="font-mono text-[9px] text-black/25 shrink-0">
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <h4 className="text-sm font-serif text-black leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-3">
                            {decodeHtml(item.title)}
                        </h4>
                    </a>
                ))}
            </div>
            {itemCount > 3 && (
                <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-linear-to-l from-white to-transparent" />
            )}
        </div>
    );
};