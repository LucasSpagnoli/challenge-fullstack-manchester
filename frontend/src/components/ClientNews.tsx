import React from "react";
import { decodeHtml } from "../utils/decodeHtml";
import type { ClientNewsProps } from "../api/types/feed.interfaces";

export const ClientNews: React.FC<ClientNewsProps> = ({ items, loading }) => {
    const itemCount = items?.length ?? 0;

    if (loading && itemCount === 0) {
        return (
            <div className="border border-dashed border-black/15 flex items-center justify-center bg-black/5 w-full h-60 md:h-75">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 animate-pulse">
                    Buscando...
                </p>
            </div>
        );
    }

    if (itemCount === 0) {
        return (
            <div className="border border-dashed border-black/15 flex-1 min-h-0 flex flex-col items-center justify-center gap-2 bg-black/5 w-full h-60 md:h-75 p-4">
                <p className="text-xs text-black/40 italic font-serif text-center">
                    Nenhuma matéria.
                </p>
            </div>
        );
    }

    return (
        <div className="relative flex-1 min-h-0">
            <div className="flex flex-col max-h-60 md:max-h-75 h-full gap-3 overflow-y-auto pt-1 pb-4 snap-y snap-mandatory pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-[#D4AF37]">
                {items!.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="snap-start shrink-0 w-full min-h-20 border border-black/10 p-3 flex flex-col justify-between hover:border-[#D4AF37] hover:-translate-y-0.5 transition-all duration-200 group bg-black/2 relative">

                        <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[9px] uppercase tracking-[0.15em] text-[#D4AF37] block truncate">
                                {item.source}
                            </span>
                            <span className="font-mono text-[9px] text-black/25 shrink-0">
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <h4 className="text-xs font-serif text-black leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-3">
                            {decodeHtml(item.title)}
                        </h4>
                    </a>
                ))}
            </div>

            {itemCount > 2 && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-2 h-10 bg-linear-to-t from-white to-transparent" />
            )}
        </div>
    );
};