"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92, boxShadow: "0 0 25px rgba(245, 167, 15, 0.7)" }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)]"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50 [animation-duration:2s]" />
      <span aria-hidden className="absolute -inset-1.5 animate-ping rounded-full border-2 border-brand/60 [animation-delay:1s] [animation-duration:2s]" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
