"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Rocket, ScanSearch } from "lucide-react";
import { useState } from "react";
import { Heading, Reveal, SectionTag } from "./Reveal";

const steps = [
  { icon: ScanSearch, n: "01", title: "Diagnóstico gratuito", text: "Mapeamos onde sua equipe perde tempo: atendimento, planilhas, follow-ups, relatórios.", detail: "Conversa de 30 min pelo WhatsApp ou chamada. Você sai com uma lista clara do que dá para automatizar." },
  { icon: MessageSquareText, n: "02", title: "Solução sob medida", text: "Desenhamos o fluxo e o assistente de IA com a linguagem e as regras do seu negócio.", detail: "Nada de robô genérico: treinamos a IA com seus produtos, preços, objeções e tom de voz." },
  { icon: Rocket, n: "03", title: "No ar e evoluindo", text: "Colocamos tudo para rodar integrado às suas ferramentas e acompanhamos os resultados.", detail: "Suporte direto com quem construiu. Ajustamos o fluxo conforme os dados mostram oportunidades." },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section id="como-funciona" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Como funciona</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Do caos manual à operação *no piloto automático*" />
          <p className="mt-5 text-lg text-muted">Três etapas simples. Clique em cada uma para ver os detalhes.</p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <Reveal key={s.n} delay={i * 0.1}>
                <motion.button
                  onClick={() => setActive(i)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={on}
                  className={`relative h-full w-full overflow-hidden rounded-3xl border p-7 text-left transition-colors ${
                    on ? "border-brand/60 bg-gradient-to-b from-brand/[0.12] to-graphite" : "border-line bg-graphite hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${on ? "bg-brand text-ink shadow-[0_0_25px_rgba(245, 167, 15,0.6)]" : "bg-white/5 text-ice"}`}>
                      <s.icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-sm text-muted">{s.n}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-ice">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                  <motion.div initial={false} animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }} className="overflow-hidden">
                    <p className="mt-4 border-t border-white/10 pt-4 text-sm text-ice/90">{s.detail}</p>
                  </motion.div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
