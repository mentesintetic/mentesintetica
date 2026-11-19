"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Pause, Play, ShoppingBag, Smartphone, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GlowButton } from "./GlowButton";
import { Heading, Reveal, SectionTag } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

const features = [
  { icon: Sparkles, text: "Provador com IA" },
  { icon: ShoppingBag, text: "Sacola animada" },
  { icon: MousePointerClick, text: "Microinterações" },
  { icon: Smartphone, text: "100% responsivo" },
];

export function Portfolio() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Só carrega/reproduz o vídeo quando ele aparece na tela (abertura do site mais leve)
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [userPaused]);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
    }
  }

  return (
    <section id="portfolio" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTag>Portfólio</SectionTag>
          <Heading className="mt-5 text-4xl sm:text-5xl" text="Veja como fica um site *criado por mim*" />
          <p className="mt-5 text-lg text-muted">
            Exemplo de loja de roupas com provador inteligente, sacola animada e navegação fluida — o mesmo nível de cuidado que levo para o seu negócio.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative">
            <div aria-hidden className="glow absolute -inset-x-10 -inset-y-16 [--g:.22]" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-graphite shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
              {/* barra do navegador */}
              <div className="flex items-center gap-2 border-b border-line bg-ink/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 font-mono text-[11px] text-muted">
                  <span className="text-emerald-400">●</span> noma-store.com.br
                </div>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-brand sm:block">site exemplo</span>
              </div>
              <div className="relative aspect-video bg-[#EEEAE2]">
                <video
                  ref={ref}
                  className="h-full w-full object-cover"
                  poster="/demo-loja-poster.jpg"
                  muted
                  loop
                  playsInline
                  preload="none"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  aria-label="Demonstração: cursor navegando por um site de loja de roupas criado pela Mente Sintética"
                >
                  <source src="/demo-loja.webm" type="video/webm" />
                  <source src="/demo-loja.mp4" type="video/mp4" />
                </video>
                <motion.button
                  onClick={toggle}
                  whileTap={{ scale: 0.9 }}
                  aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
                  className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-ink/80 text-ice backdrop-blur transition-colors hover:bg-brand hover:text-ink"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center gap-6">
          <ul className="flex flex-wrap justify-center gap-2">
            {features.map(({ icon: Icon, text }) => (
              <motion.li
                key={text}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="flex cursor-default items-center gap-2 rounded-full border border-line bg-graphite px-4 py-2 text-sm text-ice"
              >
                <Icon className="h-4 w-4 text-brand" /> {text}
              </motion.li>
            ))}
          </ul>
          <GlowButton size="lg" href={whatsappLink("Olá! Vi o site exemplo da loja no seu portfólio e quero um site assim para o meu negócio.")}>
            <WhatsAppIcon /> Quero um site assim
          </GlowButton>
        </Reveal>
      </div>
    </section>
  );
}
