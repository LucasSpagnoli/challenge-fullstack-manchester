import React from "react";

function decodeHtml(text: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

const News: React.FC<{ items: any[]; loading?: boolean }> = ({ items, loading }) => {
    if (loading) {
        return (
            <div className="border border-dashed border-black/15 py-12 flex items-center justify-center bg-black/2 h-full min-h-48">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 animate-pulse">
                    Buscando informações...
                </p>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="border border-dashed border-black/15 py-12 flex items-center justify-center bg-black/2 h-full min-h-48">
                <p className="text-sm text-black/40 italic font-serif text-center px-4">
                    Nenhuma notícia correlata localizada.
                </p>
            </div>
        );
    }

    return (
        <div className="border border-black/10 bg-black/2 h-64 overflow-y-auto p-3 flex flex-col gap-3">
            {items.map((item, idx) => (
                <a key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group border-b border-black/5 pb-2 last:border-0 last:pb-0">
                    <article className="group-hover:opacity-80 transition-opacity">
                        <h4 className="text-[13px] font-serif text-black leading-snug mb-1 group-hover:text-[#D4AF37] transition-colors">
                            {decodeHtml(item.title)}
                        </h4>
                        <span className="text-[9px] uppercase tracking-widest text-black/50 block">
                            {item.source}
                        </span>
                    </article>
                </a>
            ))}
        </div>
    );
};

export default News;