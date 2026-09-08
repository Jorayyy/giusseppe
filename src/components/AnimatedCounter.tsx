"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ target, suffix = "", prefix = "", duration = 2, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}
