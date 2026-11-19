"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { GlowButton } from "./GlowButton";
import { Heading, Reveal, SectionTag } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

const WORKDAYS = 22;

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("pt-BR"));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.5, ease: "easeOut" });
    return c.stop;
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

function Slider({ id, label, icon: Icon, value, min, max, step, unit, onChange }: { id: string; label: string; icon: typeof Clock; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-ice">
          <Icon className="h-4 w-4 text-electric" /> {label}
        </label>
        <motion.span key={value} initial={{ scale: 1.15, color: "#F5A70F" }} animate={{ scale: 1, color: "#F4EFE6" }} className="rounded-lg bg-white/5 px-3 py-1 font-mono text-sm">
          {value} {unit}
        </motion.span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range mt-4" style={{ ["--fill" as string]: `${fill}%` }} />
      <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function Calculator() {
  const [minutes, setMinutes] = useState(90);
  const [people, setPeople] = useState(5);
  const hours = (minutes * people * WORKDAYS) / 60;
  const days = hours / 8;
  const year = hours * 12;

  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Calculadora</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Quanto tempo sua empresa *pode recuperar?*" />
          <p className="mt-5 text-lg text-muted">Arraste os controles e veja em tempo real.</p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid overflow-hidden rounded-3xl border border-line bg-graphite md:grid-cols-[1.1fr_1fr]">
            <div className="space-y-10 p-6 sm:p-10">
              <Slider id="min" label="Minutos perdidos por dia (por pessoa)" icon={Clock} value={minutes} min={10} max={240} step={5} unit="min" onChange={setMinutes} />
              <Slider id="ppl" label="Número de pessoas na equipe" icon={Users} value={people} min={1} max={50} step={1} unit={people === 1 ? "pessoa" : "pessoas"} onChange={setPeople} />
              <p className="font-mono text-xs text-muted">* Considerando {WORKDAYS} dias úteis por mês e jornada de 8h.</p>
            </div>
            <div className="relative flex flex-col justify-center overflow-hidden border-t border-line bg-gradient-to-br from-brand/[0.16] via-ink to-ink p-6 sm:p-10 md:border-l md:border-t-0">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 glow [--g:.35]" />
              <span className="relative font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">Você recupera por mês</span>
              <p className="relative mt-3 font-display text-6xl font-extrabold leading-none text-ice sm:text-7xl">
                <AnimatedNumber value={hours} />
                <span className="ml-2 text-2xl italic text-brand sm:text-3xl">horas</span>
              </p>
              <div className="relative mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-display text-2xl font-bold text-ice"><AnimatedNumber value={days} /></p>
                  <p className="text-xs text-muted">dias de trabalho / mês</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-display text-2xl font-bold text-electric"><AnimatedNumber value={year} /></p>
                  <p className="text-xs text-muted">horas por ano</p>
                </div>
              </div>
              <GlowButton
                className="relative mt-8 self-start"
                href={whatsappLink(`Olá! Fiz a calculadora no site: minha equipe pode recuperar cerca de ${Math.round(hours)} horas por mês. Quero um diagnóstico gratuito.`)}
              >
                <WhatsAppIcon className="h-4 w-4" /> Quero recuperar essas horas
              </GlowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
