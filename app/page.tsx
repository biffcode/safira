"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import FloatingHearts from "@/components/FloatingHearts";

const lines: { text?: string; bold?: boolean; spacer?: boolean }[] = [
  { text: "i never expected", bold: true },
  { text: "someone like you to come along.", bold: false },
  { spacer: true },
  { text: "but your letter", bold: true },
  { text: "found every corner of my heart.", bold: false },
  { spacer: true },
  { text: "so tonight,", bold: true },
  { text: "i made something small for you.", bold: false },
  { spacer: true },
  { text: "not because i have to \u2014", bold: true },
  { text: "but because you deserve to feel chosen.", bold: false },
  { spacer: true },
  { text: "press below,", bold: true },
  { text: "and let me show you what you mean to me \u2764\uFE0F", bold: false },
];

export default function LandingPage() {
  const router = useRouter();
  const [entered, setEntered] = useState(false);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-purple-deep">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-primary/30 via-purple-deep to-purple-deep" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-primary/10 to-pink-accent/5" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-primary/20 rounded-full blur-[120px] glow-orb" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-accent/10 rounded-full blur-[100px] glow-orb" style={{ animationDelay: "3s" }} />

      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-8 cursor-pointer select-none"
            onClick={() => setEntered(true)}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl font-light text-white tracking-wide"
            >
              this is for you
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="shimmer-line h-px w-20 mx-auto my-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.4, 0.25, 0.4] }}
              transition={{ delay: 1.6, duration: 3, repeat: Infinity }}
              className="font-[family-name:var(--font-cormorant)] text-sm md:text-base text-white/40 font-light tracking-[0.25em]"
            >
              tap anywhere
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 text-center px-8 max-w-md"
          >
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
              className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-white tracking-wide mb-2"
            >
              dear Syafira Aulia
            </motion.h1>

            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
              className="inline-block text-2xl mb-10"
            >
              &#x1F49C;
            </motion.span>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="shimmer-line h-px w-32 mx-auto mb-10"
            />

            <div className="space-y-1 mb-12">
              {lines.map((line, i) => {
                if (line.spacer) {
                  return <div key={i} className="h-5" />;
                }
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.6 + i * 0.22,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className={`font-[family-name:var(--font-cormorant)] text-lg md:text-xl leading-relaxed ${
                      line.bold
                        ? "text-white font-medium tracking-wide"
                        : "text-white/55 font-light"
                    }`}
                  >
                    {line.text}
                  </motion.p>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 5.2, duration: 0.8 }}
              className="shimmer-line h-px w-24 mx-auto mb-10"
            />

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.6, duration: 1, ease: "easeOut" }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 40px rgba(167, 139, 250, 0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/game")}
              className="px-10 py-4 bg-gradient-to-r from-purple-primary/80 to-purple-light/80 text-white font-[family-name:var(--font-cormorant)] text-xl font-medium tracking-wider rounded-2xl border border-purple-light/20 shadow-[0_0_20px_rgba(109,40,217,0.2)] transition-all duration-500 cursor-pointer backdrop-blur-sm"
            >
              Start Our Little Game
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
