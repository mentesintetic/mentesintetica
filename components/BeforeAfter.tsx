"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, BellRing, Bot, Check, Clock, Database, FileSpreadsheet, MessageCircleWarning, Power, X } from "lucide-react";
import { useState } from "react";
import { Heading, Reveal, SectionTag } from "./Reveal";

const manual = [
  { icon: AlertTriangle, title: "Equipe sobrecarregada", detail: "Pessoas talentosas presas copiando e colando a mesma informação o dia todo." },
  { icon: FileSpreadsheet, title: "Planilhas soltas", detail: "Dados espalhados em 5 lugares diferentes. Ninguém sabe qual é a versão certa." },
  { icon: MessageCircleWarning, title: "Respostas repetidas", detail: "\"Qual o preço?\" \"Tem horário?\" — 80% das mensagens são as mesmas perguntas." },
  { icon: Clock, title: "Clientes esperando", detail: "Mensagem fora do horário só é respondida no dia seguinte. A venda esfria." },
];
const auto = [
  { icon: Bot, title: "IA respondendo", detail: "Assistente treinado no seu negócio responde em segundos, 24h por dia, com o seu tom." },
  { icon: Database, title: "Dados conectados", detail: "CRM, planilhas e sistemas falando entre si. Uma única fonte da verdade." },
  { icon: BellRing, title: "Alertas automáticos", detail: "Você é avisado só do que importa: lead quente, pagamento, tarefa atrasada." },
  { icon: Check, title: "Equipe focada", detail: "Seu time sai do operacional e vai para o que gera crescimento." },
];

function Item({ it, tone, open, onToggle }: { it: (typeof manual)[number]; tone: "bad" | "good"; open: boolean; onToggle: () => void }) {
  const good = tone === "good";
  return (
    <motion.li layout>
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.98 }}
        aria-expanded={open}
        className={`w-full rounded-2xl border p-4 text-left transition-colors ${
          open ? (good ? "border-brand/50 bg-brand/[0.08]" : "border-red-500/40 bg-red-500/[0.06]") : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${good ? "bg-brand/15 text-brand" : "bg-red-500/10 text-red-400"}`}>
            <it.icon className="h-[18px] w-[18px]" />
          </span>
          <span className="font-semibold text-ice">{it.title}</span>
          <span className={`ml-auto grid h-6 w-6 place-items-center rounded-full ${good ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
            {good ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
          </span>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-12 text-sm text-muted">
              <span className="block pt-2">{it.detail}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.li>
  );
}

export function BeforeAfter() {
  const [on, setOn] = useState(true);
  const [openKey, setOpenKey] = useState<string | null>("good-0");

  return (
    <section className="bg-graphite px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Antes vs. Depois</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Essa é a sua empresa *hoje.* E essa pode ser *amanhã.*" />
          <p className="mt-5 text-lg text-muted">Clique nos itens para ver a diferença — e ligue o Modo Mente Sintética.</p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <button
            onClick={() => setOn((v) => !v)}
            aria-pressed={on}
            className="group flex items-center gap-3 rounded-full border border-line bg-ink px-2 py-2 pr-5 text-sm font-semibold text-ice"
          >
            <span className={`relative flex h-8 w-14 items-center rounded-full p-1 transition-colors ${on ? "bg-brand shadow-[0_0_20px_rgba(245, 167, 15,0.6)]" : "bg-white/10"}`}>
              <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`grid h-6 w-6 place-items-center rounded-full bg-white text-ink ${on ? "ml-auto" : ""}`}>
                <Power className="h-3.5 w-3.5" />
              </motion.span>
            </span>
            Modo Mente Sintética: <span className={on ? "text-brand" : "text-muted"}>{on ? "ATIVADO" : "desligado"}</span>
          </button>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <motion.div
            animate={{ opacity: on ? 0.55 : 1, scale: on ? 0.98 : 1, filter: on ? "grayscale(0.6)" : "grayscale(0)" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-line bg-ink p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">Antes</span>
              <span className="rounded-full bg-red-500/10 px-3 py-1 font-mono text-[11px] text-red-300">operação manual</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ice">Operação Manual</h3>
            <ul className="mt-6 space-y-3">
              {manual.map((it, i) => (
                <Item key={it.title} it={it} tone="bad" open={openKey === `bad-${i}`} onToggle={() => setOpenKey(openKey === `bad-${i}` ? null : `bad-${i}`)} />
              ))}
            </ul>
          </motion.div>

          <motion.div
            animate={{ opacity: on ? 1 : 0.55, scale: on ? 1 : 0.98 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 transition-shadow ${on ? "border-brand/50 bg-gradient-to-b from-brand/[0.1] to-ink shadow-[0_0_60px_-20px_rgba(245, 167, 15,0.6)]" : "border-line bg-ink"}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Depois</span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> rodando 24/7
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ice">
              Empresa no Modo <em className="italic text-brand">Mente Sintética</em>
            </h3>
            <ul className="mt-6 space-y-3">
              {auto.map((it, i) => (
                <Item key={it.title} it={it} tone="good" open={openKey === `good-${i}`} onToggle={() => setOpenKey(openKey === `good-${i}` ? null : `good-${i}`)} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
