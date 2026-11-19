"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Bot, ChevronDown, LayoutTemplate, Workflow } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { Heading, Reveal, SectionTag } from "./Reveal";

const solutions = [
  { icon: Bot, tag: "assistentes_ia", title: "Assistentes de IA", text: "Atendentes virtuais no WhatsApp, Instagram e site que respondem, qualificam e agendam.", bullets: ["Treinado com seus produtos e preços", "Transfere para humano na hora certa", "Funciona 24h, inclusive fins de semana"], color: "brand" },
  { icon: Workflow, tag: "automacao", title: "Automação de Processos", text: "Fluxos que eliminam tarefas manuais: cadastros, cobranças, relatórios e follow-ups.", bullets: ["Integração entre CRM, planilhas e ERPs", "Alertas e relatórios automáticos", "Zero copia-e-cola"], color: "electric" },
  { icon: LayoutTemplate, tag: "experiencias", title: "Experiências Digitais", text: "Landing pages, sites e funis de alta conversão conectados às suas automações.", bullets: ["Design moderno e rápido", "Integrado ao WhatsApp e CRM", "Pronto para campanhas"], color: "brand" },
];

function MagneticCard({ s, i }: { s: (typeof solutions)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const accent = s.color === "brand" ? "text-brand bg-brand/10" : "text-electric bg-electric/10";

  function onMove(e: MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.06);
    y.set((e.clientY - r.top - r.height / 2) * 0.06);
  }

  return (
    <Reveal delay={i * 0.1}>
      <motion.div
        ref={ref}
        style={{ x, y }}
        onMouseMove={onMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className={`group relative h-full overflow-hidden rounded-3xl border bg-graphite p-7 transition-colors ${open ? "border-brand/50" : "border-line hover:border-white/20"}`}
      >
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 glow [--g:.25] opacity-0 transition-opacity group-hover:opacity-100" />
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${accent}`}>
          <s.icon className="h-6 w-6" />
        </span>
        <span className="mt-6 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">// {s.tag}</span>
        <h3 className="mt-2 font-display text-2xl font-bold text-ice">{s.title}</h3>
        <p className="mt-3 text-muted">{s.text}</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ice hover:border-brand/60"
        >
          {open ? "Fechar" : "Ver o que inclui"}
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
        <motion.ul initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
          {s.bullets.map((b, k) => (
            <motion.li key={b} initial={false} animate={{ x: open ? 0 : -10 }} transition={{ delay: open ? k * 0.06 : 0 }} className="flex items-start gap-2 pt-3 text-sm text-ice/90">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {b}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </Reveal>
  );
}

export function Solutions() {
  return (
    <section id="solucoes" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Soluções</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Tudo que sua operação precisa para *escalar sem contratar*" />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {solutions.map((s, i) => (
            <MagneticCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
