"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const TOTAL_PHOTOS = 17;

interface PhotoData {
  id: number;
  x: number;
  y: number;
  rotate: number;
  delay: number;
  duration: number;
  size: number;
}

export default function PhotoOverlay() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);

  useEffect(() => {
    setPhotos(
      Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
        id: i + 1,
        x: 5 + Math.random() * 75,
        y: 5 + Math.random() * 75,
        rotate: -15 + Math.random() * 30,
        delay: 2 + i * 0.6,
        duration: 12 + Math.random() * 8,
        size: 80 + Math.random() * 60,
      }))
    );
  }, []);

  if (photos.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.6, rotate: photo.rotate }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            scale: [0.6, 1, 1, 0.8],
            y: [0, -30, -60, -90],
          }}
          transition={{
            delay: photo.delay,
            duration: photo.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-xl overflow-hidden shadow-lg shadow-purple-primary/10 border border-purple-light/10"
          style={{
            left: `${photo.x}%`,
            top: `${photo.y}%`,
            width: photo.size,
            height: photo.size,
            rotate: `${photo.rotate}deg`,
          }}
        >
          <Image
            src={`/photos/${photo.id}.jpg`}
            alt=""
            fill
            className="object-cover"
            sizes="140px"
            unoptimized
          />
        </motion.div>
      ))}
    </div>
  );
}
