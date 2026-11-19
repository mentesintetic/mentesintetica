"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_#F5A70F]" />
      {children}
    </span>
  );
}

/** Título com palavras-chave em itálico laranja: use *palavra* para destacar */
export function Heading({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <Tag className={`font-display font-extrabold tracking-tight text-ice ${className}`}>
      {parts.map((p, i) =>
        p.startsWith("*") ? (
          <em key={i} className="pr-1 italic text-brand">
            {p.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </Tag>
  );
}
