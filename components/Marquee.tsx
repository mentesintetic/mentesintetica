const terms = ["Atendimento 24h", "Automação de Vendas", "Integração de Sistemas", "Assistentes com IA", "Menos Tarefas Repetitivas"];

export function Marquee() {
  const row = [...terms, ...terms, ...terms];
  return (
    <div className="overflow-hidden py-6">
    <div className="relative -mx-4 -rotate-1 border-y border-brand/40 bg-brand py-4 shadow-[0_0_60px_-10px_rgba(245, 167, 15,0.5)]" aria-label={terms.join(", ")}>
      <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-display text-lg font-extrabold uppercase tracking-tight text-ink sm:text-xl">
                <span className="px-6">{t}</span>
                <span className="text-ink/70">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
