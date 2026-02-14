"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Change this extension when you replace placeholders with real photos
const IMAGE_EXT = "jpg";

interface MemoryCardProps {
  id: number;
  imageId: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function MemoryCard({
  imageId,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}: MemoryCardProps) {
  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick();
    }
  };

  return (
    <motion.div
      className="perspective cursor-pointer"
      whileHover={!isFlipped && !isMatched ? { scale: 1.05 } : {}}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full aspect-square preserve-3d"
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Back Side (default - face down) */}
        <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-purple-primary to-purple-light shadow-lg flex items-center justify-center border border-purple-soft/20">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="opacity-60"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Front Side (face up - image) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden border-2 border-lavender/30 shadow-lg bg-purple-deep">
          <Image
            src={`/photos/${imageId}.${IMAGE_EXT}`}
            alt="a piece of us"
            fill
            className={`object-cover transition-all duration-700 ${
              isMatched ? "grayscale-0 scale-105" : "grayscale"
            }`}
            sizes="96px"
            unoptimized
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
