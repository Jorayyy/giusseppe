"use client";

import { motion } from "framer-motion";

interface FloatingCTAProps {
  phoneHref: string;
}

export function FloatingCTA({ phoneHref }: FloatingCTAProps) {
  return (
    <motion.a
      href={phoneHref}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, margin: "-200px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-2xl shadow-amber-600/30 transition-colors hover:bg-amber-700 md:bottom-8 lg:hidden"
    >
      Reserve a Table
    </motion.a>
  );
}
