"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Bot, Check, Loader2, Play, RotateCcw, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Heading, Reveal, SectionTag } from "./Reveal";

type Scenario = {
  id: string;
  n: string;
  label: string;
  message: string;
  reply: string;
  steps: string[];
  notification: { title: string; body: string };
};

const scenarios: Scenario[] = [
  {
    id: "atendimento",
    n: "01",
    label: "Atendimento",
    message: "Oi! Vocês atendem sábado? Quanto custa a avaliação?",
    reply: "Oi, Ana! 👋 Atendemos sim, aos sábados das 9h às 13h. A avaliação é gratuita. Posso reservar este sábado às 10h para você?",
    steps: ["Mensagem recebida no WhatsApp às 23:47", "IA identifica intenção: horário + preço", "Consulta agenda e tabela de preços", "Resposta personalizada enviada em 4s", "Lead registrado no CRM com etiqueta “quente”"],
    notification: { title: "Novo agendamento", body: "Ana — sábado, 10h. Confirmado automaticamente." },
  },
  {
    id: "organizacao",
    n: "02",
    label: "Organização",
    message: "Segue o comprovante do pedido #4821 em anexo.",
    reply: "Recebido! ✅ Pagamento do pedido #4821 confirmado. Sua nota fiscal chega no e-mail em instantes.",
    steps: ["Comprovante recebido e lido por IA (OCR)", "Valor conferido com o pedido #4821", "Planilha financeira atualizada", "Nota fiscal emitida e enviada por e-mail", "Tarefa de separação criada para o estoque"],
    notification: { title: "Pagamento conciliado", body: "Pedido #4821 · R$ 1.280,00 · planilha atualizada." },
  },
  {
    id: "vendas",
    n: "03",
    label: "Vendas",
    message: "Tenho interesse no plano empresarial, mas achei caro.",
    reply: "Entendo! O plano empresarial se paga em ~2 meses pelo tempo que sua equipe economiza. Quer que eu simule o retorno para o seu caso?",
    steps: ["Objeção de preço detectada", "IA aplica argumento de valor do seu playbook", "Proposta personalizada gerada em PDF", "Follow-up agendado para 48h", "Vendedor notificado com resumo da conversa"],
    notification: { title: "Lead quente para o time", body: "Carlos · plano empresarial · proposta enviada." },
  },
];

export function Simulator() {
  const [sel, setSel] = useState(0);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [done, setDone] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const s = scenarios[sel];

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  function pick(i: number) {
    clear();
    setSel(i);
    setPhase("idle");
    setDone(0);
  }

  function run() {
    clear();
    setPhase("running");
    setDone(0);
    s.steps.forEach((_, i) => {
      timers.current.push(setTimeout(() => setDone(i + 1), 750 * (i + 1)));
    });
    timers.current.push(setTimeout(() => setPhase("done"), 750 * s.steps.length + 400));
  }

  const showReply = done >= 4;

  return (
    <section id="simulador" className="relative bg-graphite px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Simulador</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Veja a IA *trabalhando* na prática" />
          <p className="mt-5 text-lg text-muted">Escolha um cenário e clique em “Simular Execução”.</p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-line bg-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            {/* barra do painel */}
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 font-mono text-xs text-muted">mente-sintetica / painel-de-automacao</span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> online
              </span>
            </div>

            {/* cenários */}
            <div className="flex flex-wrap gap-2 border-b border-line p-4">
              {scenarios.map((sc, i) => (
                <motion.button
                  key={sc.id}
                  onClick={() => pick(i)}
                  whileTap={{ scale: 0.94 }}
                  aria-pressed={sel === i}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${sel === i ? "text-ink" : "text-muted hover:text-ice"}`}
                >
                  {sel === i && <motion.span layoutId="sc-pill" className="absolute inset-0 rounded-full bg-brand shadow-[0_0_20px_rgba(245, 167, 15,0.5)]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className="relative">
                    <span className="font-mono opacity-70">{sc.n}</span> {sc.label}
                  </span>
                </motion.button>
              ))}
              <motion.button
                onClick={run}
                disabled={phase === "running"}
                whileTap={{ scale: 0.96, boxShadow: "0 0 25px rgba(242,212,155,0.6)" }}
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-electric/50 bg-electric/10 px-5 py-2 text-sm font-bold text-electric transition-colors hover:bg-electric/20 disabled:opacity-60"
              >
                {phase === "running" ? <Loader2 className="h-4 w-4 animate-spin" /> : phase === "done" ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {phase === "running" ? "Executando..." : phase === "done" ? "Simular de novo" : "Simular Execução"}
              </motion.button>
            </div>

            <div className="relative grid md:grid-cols-2">
              {/* chat */}
              <div className="min-h-[360px] space-y-4 border-b border-line p-5 sm:p-6 md:border-b-0 md:border-r">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">conversa</span>
                <AnimatePresence mode="wait">
                  <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="flex items-end gap-2">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10"><User className="h-4 w-4" /></span>
                      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3 text-sm text-ice">{s.message}</p>
                    </div>
                    {phase !== "idle" && !showReply && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                        <span className="flex gap-1 rounded-2xl bg-brand/15 px-4 py-3">
                          {[0, 1, 2].map((d) => (
                            <motion.span key={d} className="h-2 w-2 rounded-full bg-brand" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }} />
                          ))}
                        </span>
                      </motion.div>
                    )}
                    {showReply && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex items-end justify-end gap-2">
                        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-4 py-3 text-sm font-medium text-ink">{s.reply}</p>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/20 text-brand"><Bot className="h-4 w-4" /></span>
                      </motion.div>
                    )}
                    {phase === "idle" && <p className="pt-6 text-center text-sm text-muted">Clique em <strong className="text-electric">Simular Execução</strong> para a IA assumir.</p>}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* fluxo */}
              <div className="min-h-[360px] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">fluxo de execução</span>
                  <span className="font-mono text-[11px] text-muted">{done}/{s.steps.length}</span>
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div className="h-full bg-gradient-to-r from-brand to-electric" animate={{ width: `${(done / s.steps.length) * 100}%` }} transition={{ duration: 0.4 }} />
                </div>
                <ol className="mt-5 space-y-2.5">
                  {s.steps.map((st, i) => {
                    const ok = i < done;
                    const current = phase === "running" && i === done;
                    return (
                      <motion.li
                        key={`${s.id}-${i}`}
                        animate={{ opacity: ok || current ? 1 : 0.4, x: ok ? 0 : 0 }}
                        className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${ok ? "border-emerald-500/30 bg-emerald-500/[0.06] text-ice" : current ? "border-electric/40 bg-electric/[0.06] text-ice" : "border-white/[0.05] text-muted"}`}
                      >
                        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${ok ? "bg-emerald-500 text-ink" : "bg-white/5"}`}>
                          {ok ? (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </motion.span>
                          ) : current ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-electric" />
                          ) : (
                            <span className="font-mono text-[10px]">{i + 1}</span>
                          )}
                        </span>
                        {st}
                      </motion.li>
                    );
                  })}
                </ol>
              </div>

              {/* notificação */}
              <AnimatePresence>
                {phase === "done" && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="absolute bottom-4 left-4 right-4 flex items-start gap-3 rounded-2xl border border-brand/40 bg-ink/95 p-4 shadow-[0_0_40px_-10px_rgba(245, 167, 15,0.7)] backdrop-blur sm:right-auto sm:left-6 sm:w-80"
                    role="status"
                  >
                    <motion.span animate={{ rotate: [0, -15, 15, -10, 0] }} transition={{ duration: 0.6, delay: 0.2 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-ink">
                      <Bell className="h-4 w-4" />
                    </motion.span>
                    <div>
                      <p className="text-sm font-bold text-ice">{s.notification.title}</p>
                      <p className="text-xs text-muted">{s.notification.body}</p>
                    </div>
                    <span className="ml-auto font-mono text-[10px] text-muted">agora</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
