"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { GlowButton } from "./GlowButton";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#simulador", label: "Simulador" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "border-white/10 bg-ink/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]" : "border-transparent bg-ink/30"
        }`}
      >
        <a href="#topo" aria-label="Início">
          <Logo size={24} />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ice">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <GlowButton className="hidden sm:inline-flex">
            <Zap className="h-4 w-4" /> Automatizar agora
          </GlowButton>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ice md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink/90 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-ice hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <GlowButton className="mt-2 w-full">
              <Zap className="h-4 w-4" /> Automatizar agora
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
