"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/**
 * Introdução ao abrir o link: logo com pulso luminoso (0.6s) e saída suave.
 * Só anima transform/opacity (rodam na GPU) para não travar em celulares.
 */
export function PageTransition() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
          aria-hidden
        >
          <div className="relative grid place-items-center">
            {/* pulso luminoso */}
            <motion.span
              className="glow absolute h-48 w-48 [--g:.9]"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.25, 1], opacity: [0, 1, 0.45] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="relative"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: [0.75, 1.06, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <LogoMark size={64} />
            </motion.div>
          </div>
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="font-display text-sm font-extrabold uppercase tracking-[0.28em] text-ice"
          >
            Mente <span className="text-brand">Sintética</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A Hero começa o stagger enquanto a introdução está saindo (sem tela parada) */
export const INTRO_DELAY = 0.6;
