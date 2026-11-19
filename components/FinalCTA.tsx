import { ArrowRight, Instagram } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { Logo } from "./Logo";
import { Heading, Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { INSTAGRAM, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="px-4 pb-24 sm:pb-32">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-brand/40 bg-gradient-to-br from-brand/25 via-graphite to-ink px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 glow [--g:.4]" />
        <div className="relative">
          <Heading className="mx-auto max-w-3xl text-4xl sm:text-6xl" text="Sua equipe merece trabalhar no que *importa.*" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-ice/80">Agende seu diagnóstico gratuito. Em uma conversa, mostramos exatamente o que dá para automatizar na sua empresa.</p>
          <GlowButton size="lg" className="mt-10">
            <WhatsAppIcon /> Chamar no WhatsApp {WHATSAPP_DISPLAY} <ArrowRight className="h-5 w-5" />
          </GlowButton>
          <p className="mt-5 font-mono text-xs text-muted">resposta rápida · sem compromisso</p>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-muted md:flex-row">
        <Logo size={22} />
        <div className="flex items-center gap-5">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ice">
            <WhatsAppIcon className="h-4 w-4" /> {WHATSAPP_DISPLAY}
          </a>
          <a href="https://instagram.com/mente.sintetic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ice">
            <Instagram className="h-4 w-4" /> {INSTAGRAM}
          </a>
        </div>
        <p>© 2026 Mente Sintética — mentesintetica.com.br</p>
      </div>
    </footer>
  );
}
