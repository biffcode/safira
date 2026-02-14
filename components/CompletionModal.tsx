"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CompletionModal() {
  useEffect(() => {
    // Purple confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const purpleColors = ["#6D28D9", "#A78BFA", "#C4B5FD", "#F472B6", "#DDD6FE"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: purpleColors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: purpleColors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-purple-deep/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="text-center px-8 max-w-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-6"
        >
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
            you matched every piece.
          </p>

          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
            just like how you match with my imperfect parts.
          </p>

          <div className="py-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-light to-transparent mx-auto" />
          </div>

          <p className="text-2xl md:text-3xl text-white font-light leading-relaxed">
            happy valentine, Syafira Aulia.
          </p>

          <p className="text-lg md:text-xl text-purple-light font-light italic">
            i choose you gently.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-12"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="rgba(167, 139, 250, 0.6)"
            className="mx-auto"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
