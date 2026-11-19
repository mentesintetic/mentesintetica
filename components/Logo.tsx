type LogoProps = { className?: string; showText?: boolean; size?: number };

/** Logotipo oficial: 3 barras diagonais em degrau formando um "M" + MENTE SINTÉTICA */
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size * 1.2} height={size} viewBox="0 0 48 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ms-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5A70F" />
          <stop offset="100%" stopColor="#FFC24D" />
        </linearGradient>
      </defs>
      <polygon points="2,38 9,38 17,16 10,16" fill="url(#ms-grad)" />
      <polygon points="15,38 22,38 34,6 27,6" fill="url(#ms-grad)" />
      <polygon points="28,38 35,38 46,14 39,14" fill="url(#ms-grad)" />
    </svg>
  );
}

export function Logo({ className = "", showText = true, size = 28 }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Mente Sintética">
      <LogoMark size={size} />
      {showText && (
        <span className="font-display text-[15px] font-extrabold uppercase tracking-[0.18em] text-ice">
          Mente <span className="text-brand">Sintética</span>
        </span>
      )}
    </span>
  );
}
