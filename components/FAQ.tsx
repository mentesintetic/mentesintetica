"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Heading, Reveal, SectionTag } from "./Reveal";

const faqs = [
  { q: "Preciso entender de tecnologia para usar?", a: "Não. Nós cuidamos de toda a parte técnica. Você recebe a solução funcionando, com um passo a passo simples e suporte direto para qualquer dúvida." },
  { q: "Quanto tempo leva para colocar uma automação no ar?", a: "Depende da complexidade, mas a maioria dos projetos fica pronta entre 7 e 21 dias. Automações simples podem rodar já na primeira semana." },
  { q: "A IA vai responder meus clientes de forma robótica?", a: "Não. O assistente é treinado com a linguagem, os produtos e as regras do seu negócio. E sempre que necessário, a conversa é transferida para um humano da sua equipe." },
  { q: "Funciona com as ferramentas que eu já uso?", a: "Na grande maioria dos casos, sim. Integramos WhatsApp, Instagram, Google Sheets, CRMs, ERPs, e-mail e centenas de outros sistemas via API." },
  { q: "Quanto custa?", a: "Cada projeto é sob medida, então o valor depende do escopo. O diagnóstico é gratuito: mapeamos sua operação e apresentamos uma proposta clara, com o retorno esperado." },
  { q: "E se eu precisar de ajustes depois?", a: "Você tem suporte direto. Acompanhamos os resultados e ajustamos o fluxo sempre que o negócio mudar ou surgir uma nova oportunidade de automação." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <SectionTag>Dúvidas</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Perguntas *frequentes*" />
        </Reveal>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-2xl border transition-colors ${on ? "border-brand/50 bg-brand/[0.05]" : "border-line bg-graphite hover:border-white/20"}`}>
                  <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6">
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-display text-base font-bold text-ice sm:text-lg">{f.q}</span>
                    <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${on ? "bg-brand text-ink" : "bg-white/5 text-ice"}`}>
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="px-5 pb-6 pl-14 text-muted sm:px-6 sm:pl-[3.75rem]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
