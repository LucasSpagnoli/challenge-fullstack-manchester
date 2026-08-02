import type { News } from "../api/types/feed.interfaces"

const UserNews: React.FC<{ item: News, idx: number }> = ({ item, idx }) => {
  function decodeHtml(text: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }
  return (
    <article
      key={idx}
      className="group border border-black/10 p-6 flex flex-col gap-4 hover:border-[#D4AF37] transition-colors duration-100">

      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full self-center h-40 object-cover object-center border border-black/10"
        />
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.15em] text-[#D4AF37]">
          {item.source}
        </span>
        <div className="w-6 h-px bg-black/10 group-hover:bg-[#D4AF37] transition-colors duration-100" />
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
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black hover:text-[#D4AF37] transition-colors duration-100 mt-2">
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
  )
}

export default UserNews