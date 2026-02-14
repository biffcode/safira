"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HeartBoard from "@/components/HeartBoard";
import FloatingHearts from "@/components/FloatingHearts";

export default function GamePage() {
  const router = useRouter();

  const handleComplete = useCallback(() => {
    router.push("/final");
  }, [router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-deep via-purple-primary/20 to-purple-deep py-10 px-4">
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-6"
      >
        <p className="text-white/60 text-sm md:text-base font-[family-name:var(--font-cormorant)] font-light tracking-wide italic">
          every piece of us belongs together
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10"
      >
        <HeartBoard onComplete={handleComplete} />
      </motion.div>
    </main>
  );
}
