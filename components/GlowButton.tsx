"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { whatsappLink } from "@/lib/site";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

/** CTA com feixe de luz no hover e explosão de brilho no clique */
export function GlowButton({ children, href = whatsappLink(), variant = "primary", size = "md", className = "", external = true, onClick }: Props) {
  const [burst, setBurst] = useState(0);
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-bold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
  const sizes = size === "lg" ? "px-8 py-4 text-base sm:text-lg" : "px-5 py-2.5 text-sm";
  const variants =
    variant === "primary"
      ? "bg-brand text-ink shadow-[0_8px_30px_-8px_rgba(245, 167, 15,0.6)] hover:bg-[#ffb52e]"
      : "border border-line bg-white/[0.03] text-ice hover:border-brand/60 hover:bg-white/[0.06]";

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => {
        setBurst((b) => b + 1);
        onClick?.();
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96, boxShadow: "0 0 25px rgba(245, 167, 15, 0.7)" }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`${base} ${sizes} ${variants} ${className}`}
    >
      {/* feixe de luz (shimmer) no hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100"
      />
      {/* explosão de brilho ao clicar */}
      {burst > 0 && (
        <motion.span
          key={burst}
          aria-hidden
          initial={{ opacity: 0.8, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,220,150,0.9),rgba(245, 167, 15,0.35)_45%,transparent_70%)]"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
