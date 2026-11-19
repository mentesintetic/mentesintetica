"use client";

import { motion } from "framer-motion";
import { AtSign, Cpu, Gauge } from "lucide-react";
import Image from "next/image";
import { GlowButton } from "./GlowButton";
import { Heading, Reveal, SectionTag } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { INSTAGRAM } from "@/lib/site";

const badges = [
  { icon: Cpu, text: "Especialista em IA e Automação", cls: "border-brand/40 bg-brand/10 text-brand-soft" },
  { icon: Gauge, text: "Foco em Eficiência Operacional", cls: "border-electric/40 bg-electric/10 text-electric" },
  { icon: AtSign, text: INSTAGRAM.replace("@", ""), cls: "border-white/15 bg-white/5 text-ice", href: "https://instagram.com/mente.sintetic" },
];

export function Founder() {
  return (
    <section className="bg-graphite px-4 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <motion.div whileHover={{ rotate: -1, scale: 1.01 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="relative mx-auto max-w-md">
            {/* borda iluminada */}
            <div aria-hidden className="absolute -inset-[2px] rounded-[2rem] bg-[conic-gradient(from_180deg,#F5A70F,#F2D49B,#F5A70F,#141311,#F5A70F)] opacity-80" />
            <div aria-hidden className="absolute -inset-12 glow [--g:.3]" />
            <div className="relative overflow-hidden rounded-[2rem] bg-ink">
              <Image src="/fundador.png" alt="Fundador da Mente Sintética" width={1333} height={2000} sizes="(max-width: 768px) 90vw, 448px" className="aspect-[4/5] h-auto w-full object-cover object-top" priority={false} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-20">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-soft">Fundador</span>
                <p className="font-display text-2xl font-extrabold text-ice">Mente Sintética</p>
              </div>
            </div>
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -right-3 top-8 rounded-2xl border border-white/10 bg-ink/90 px-4 py-3 font-mono text-xs text-ice shadow-xl backdrop-blur sm:-right-8"
            >
              <span className="text-emerald-400">●</span> automações rodando
            </motion.span>
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionTag>Quem está por trás</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Tecnologia de ponta com *atendimento de perto*" />
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => {
              const content = (
                <>
                  <b.icon className="h-3.5 w-3.5" /> {b.text}
                </>
              );
              const cls = `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${b.cls}`;
              return b.href ? (
                <motion.a key={b.text} href={b.href} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.94 }} whileHover={{ y: -2 }} className={cls}>{content}</motion.a>
              ) : (
                <motion.span key={b.text} whileTap={{ scale: 0.94 }} whileHover={{ y: -2 }} className={cls}>{content}</motion.span>
              );
            })}
          </div>
          <div className="mt-7 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              A Mente Sintética nasceu de uma convicção simples: <strong className="text-ice">pessoas não deveriam gastar o dia fazendo trabalho de robô.</strong>
            </p>
            <p>
              Ajudamos empresas a eliminar tarefas manuais com automações e assistentes de IA feitos sob medida — do primeiro diagnóstico até a solução rodando, com suporte direto de quem construiu.
            </p>
            <p>Sem jargão, sem pacote genérico. Só a sua operação funcionando melhor.</p>
          </div>
          <GlowButton size="lg" className="mt-9">
            <WhatsAppIcon /> Falar direto comigo no WhatsApp
          </GlowButton>
        </Reveal>
      </div>
    </section>
  );
}
