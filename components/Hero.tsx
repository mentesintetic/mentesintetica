"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BadgeCheck, Headphones, Sparkles, Wrench } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { INTRO_DELAY } from "./PageTransition";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: INTRO_DELAY } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const seals = [
  { icon: BadgeCheck, text: "Diagnóstico gratuito" },
  { icon: Wrench, text: "Solução sob medida" },
  { icon: Headphones, text: "Suporte direto" },
];

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden px-4 pb-20 pt-36 sm:pt-44">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="absolute left-1/2 top-0 h-[640px] w-[1000px] max-w-[160vw] -translate-x-1/2 glow [--g:.28]" />
      <div aria-hidden className="absolute right-[-10%] top-60 h-[300px] w-[300px] glow-cream [--g:.12]" />

      <motion.div variants={container} initial="hidden" animate="show" className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-soft">
          <Sparkles className="h-3.5 w-3.5" /> Automação · Assistentes de IA · Experiências digitais
        </motion.span>

        <motion.h1 variants={item} className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ice sm:text-6xl md:text-7xl lg:text-[5.4rem]">
          Menos trabalho repetitivo.
          <br />
          <em className="relative pr-2 italic text-brand">
            Mais crescimento.
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: INTRO_DELAY + 0.7, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 right-2 h-[3px] origin-left rounded-full bg-gradient-to-r from-brand via-brand-soft to-electric"
            />
          </em>
        </motion.h1>

        <motion.p variants={item} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          A Mente Sintética cria <strong className="font-semibold text-ice">automações e assistentes de IA</strong> que atendem, organizam e vendem pela sua empresa — 24 horas por dia, sem aumentar a equipe.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <GlowButton size="lg">
            <WhatsAppIcon /> Quero automatizar minha empresa <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </GlowButton>
          <GlowButton size="lg" variant="ghost" href="#simulador" external={false}>
            Ver a IA trabalhando
          </GlowButton>
        </motion.div>

        <motion.ul variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
          {seals.map(({ icon: Icon, text }, i) => (
            <li key={text} className="flex items-center gap-2">
              {i > 0 && <span className="hidden text-line sm:inline">·</span>}
              <Icon className="h-4 w-4 text-electric" /> {text}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
