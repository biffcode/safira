"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "@/components/FloatingHearts";
import PhotoOverlay from "@/components/PhotoOverlay";

const font = "font-[family-name:var(--font-cormorant)]";

interface LineProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
}

function Line({ children, delay, className = "" }: LineProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      className={`${font} leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
}

function Divider({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay, duration: 0.8 }}
      className="py-5"
    >
      <div className="shimmer-line h-px w-24 mx-auto" />
    </motion.div>
  );
}

export default function FinalPage() {
  useEffect(() => {
    const duration = 4000;
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
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-purple-deep">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-primary/20 via-purple-deep to-purple-deep" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-primary/10 to-pink-accent/5" />

      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-primary/15 rounded-full blur-[120px] glow-orb" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-accent/10 rounded-full blur-[100px] glow-orb" style={{ animationDelay: "3s" }} />

      <FloatingHearts />
      <PhotoOverlay />

      <div className="relative z-10 text-center px-8 max-w-lg py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        >
          {/* Opening */}
          <Line delay={1} className="text-xl md:text-2xl text-white/90 font-light">
            you matched every piece.
          </Line>
          <Line delay={1.8} className="text-lg md:text-xl text-white/50 font-light mt-2">
            every single one, without giving up.
          </Line>

          <Divider delay={2.8} />

          {/* The deeper message */}
          <Line delay={3.4} className="text-xl md:text-2xl text-white/90 font-light">
            and maybe that&apos;s what i admire about you.
          </Line>
          <Line delay={4.2} className="text-lg md:text-xl text-white/50 font-light mt-2">
            you stay. you try. you care.
          </Line>
          <Line delay={5} className="text-lg md:text-xl text-white/50 font-light mt-2">
            even when things don&apos;t match right away.
          </Line>

          <Divider delay={5.8} />

          {/* Personal */}
          <Line delay={6.4} className="text-xl md:text-2xl text-white/90 font-light">
            i don&apos;t know what i did to deserve
          </Line>
          <Line delay={7} className="text-xl md:text-2xl text-white/90 font-light mt-1">
            someone who sees me the way you do.
          </Line>
          <Line delay={7.8} className="text-lg md:text-xl text-white/50 font-light mt-3">
            but i know this &mdash;
          </Line>
          <Line delay={8.4} className="text-lg md:text-xl text-white/50 font-light mt-1">
            i don&apos;t want anyone else trying.
          </Line>

          <Divider delay={9.2} />

          {/* Closing */}
          <Line delay={10} className="text-2xl md:text-4xl text-white font-medium tracking-wide">
            happy valentine,
          </Line>
          <Line delay={10.6} className="text-2xl md:text-4xl text-white font-medium tracking-wide mt-1">
            Syafira Aulia.
          </Line>

          <div className="mt-6 space-y-2">
            <Line delay={11.4} className="text-lg md:text-xl text-white/60 font-light">
              thank you for choosing me
            </Line>
            <Line delay={12} className="text-lg md:text-xl text-white/60 font-light">
              on the days i couldn&apos;t choose myself.
            </Line>
          </div>

          <Divider delay={12.8} />

          <Line delay={13.4} className="text-xl md:text-2xl text-purple-light font-light italic">
            i choose you gently.
          </Line>
          <Line delay={14} className="text-xl md:text-2xl text-purple-light font-light italic">
            today, and every day after this.
          </Line>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 15, duration: 1 }}
          className="mt-14"
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
      </div>
    </main>
  );
}
