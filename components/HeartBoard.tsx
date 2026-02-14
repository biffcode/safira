"use client";

import { useState, useEffect, useCallback } from "react";
import MemoryCard from "./MemoryCard";

// Heart shape matrix - 1 = card position, 0 = empty
// Total 1s = 34 positions (17 pairs)
const HEART_MATRIX = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

interface Card {
  id: number;
  imageId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface HeartBoardProps {
  onComplete: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HeartBoard({ onComplete }: HeartBoardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  // Initialize cards
  useEffect(() => {
    const imageIds = Array.from({ length: 17 }, (_, i) => i + 1);
    const pairs = [...imageIds, ...imageIds];
    const shuffled = shuffleArray(pairs);

    const newCards: Card[] = shuffled.map((imageId, index) => ({
      id: index,
      imageId,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
  }, []);

  // Check for completion
  useEffect(() => {
    if (matchedPairs === 17 && cards.length > 0) {
      setTimeout(() => onComplete(), 600);
    }
  }, [matchedPairs, cards.length, onComplete]);

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (isChecking) return;
      if (flippedIndices.length >= 2) return;
      if (cards[cardIndex].isFlipped || cards[cardIndex].isMatched) return;

      const newFlipped = [...flippedIndices, cardIndex];
      setFlippedIndices(newFlipped);

      setCards((prev) =>
        prev.map((card, i) =>
          i === cardIndex ? { ...card, isFlipped: true } : card
        )
      );

      if (newFlipped.length === 2) {
        setIsChecking(true);
        const [first, second] = newFlipped;

        if (cards[first].imageId === cards[cardIndex].imageId) {
          // Match found
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card, i) =>
                i === first || i === second
                  ? { ...card, isMatched: true, isFlipped: true }
                  : card
              )
            );
            setFlippedIndices([]);
            setIsChecking(false);
            setMatchedPairs((prev) => prev + 1);
          }, 500);
        } else {
          // No match - flip back after 800ms
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card, i) =>
                i === first || i === second
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setFlippedIndices([]);
            setIsChecking(false);
          }, 800);
        }
      }
    },
    [isChecking, flippedIndices, cards]
  );

  // Map cards to heart positions
  let cardIndex = 0;

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2.5">
      {HEART_MATRIX.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1 sm:gap-1.5 md:gap-2.5 justify-center">
          {row.map((cell, colIdx) => {
            if (cell === 0) {
              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24"
                />
              );
            }

            const currentCardIndex = cardIndex;
            cardIndex++;

            if (!cards[currentCardIndex]) return null;

            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24"
              >
                <MemoryCard
                  id={cards[currentCardIndex].id}
                  imageId={cards[currentCardIndex].imageId}
                  isFlipped={cards[currentCardIndex].isFlipped}
                  isMatched={cards[currentCardIndex].isMatched}
                  onClick={() => handleCardClick(currentCardIndex)}
                  disabled={isChecking}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
