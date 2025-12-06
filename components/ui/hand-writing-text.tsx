// components/ui/hand-writing-text.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MorphingTextProps {
  words: string[];
  className?: string;
  interval?: number; // мс между сменой слов
}

/**
 * Базовый компонент морфинга текста.
 * Каждое слово «растворяется» и появляется следующее.
 * Цвета — градиент по брендовой палитре ARMMAX.
 */
export const MorphingText = ({
  words,
  className,
  interval = 3000,
}: MorphingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [morphProgress, setMorphProgress] = useState(0);

  const currentWord = words[currentIndex];
  const nextWord = words[(currentIndex + 1) % words.length];

  useEffect(() => {
    const morphDuration = 800;
    const steps = 20;
    let step = 0;

    const morphInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      setMorphProgress(progress);

      if (progress < 0.5) {
        // «уходим» из текущего слова
        const charCount = Math.floor(currentWord.length * (1 - progress * 2));
        setDisplayText(currentWord.slice(0, charCount));
      } else {
        // «приходим» в следующее слово
        const charCount = Math.floor(nextWord.length * ((progress - 0.5) * 2));
        setDisplayText(nextWord.slice(0, charCount));
      }

      if (step >= steps) {
        clearInterval(morphInterval);
        setDisplayText(nextWord);
      }
    }, morphDuration / steps);

    const wordTimeout = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % words.length);
    }, interval);

    return () => {
      clearInterval(morphInterval);
      clearTimeout(wordTimeout);
    };
  }, [currentIndex, currentWord, nextWord, interval, words.length]);

  return (
    <div className={cn("relative inline-block", className)}>
      <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-accent">
        {displayText}
        {/* «курсор» в цветах сайта */}
        <span className="inline-block ml-1 h-7 w-0.5 animate-pulse bg-gradient-to-b from-brand-light to-brand-accent md:h-8" />
      </span>
    </div>
  );
};

interface HandWrittenTitleProps {
  /** Первое (основное) слово/фраза */
  title?: string;
  /** Подзаголовок под анимированным текстом */
  subtitle?: string;
  /** Свой набор фраз для морфинга (если не передан — используем дефолтные) */
  words?: string[];
}

/**
 * Обёртка, чтобы не трогать существующие импорты HandWrittenTitle.
 * Используется в AnimatedPortfolioHeading для блока «Check our portfolio».
 */
export function HandWrittenTitle({
  title = "Check our portfolio",
  subtitle,
  words,
}: HandWrittenTitleProps) {
  const phrases =
    words ??
    [
      title,
      "Interior painting portfolio",
      "Real homes we painted",
      "Orange County projects",
    ];

  return (
    // БЫЛО: py-10 md:py-14 — слишком много
    <div className="relative mx-auto w-full max-w-4xl pt-4 pb-2 md:pt-6 md:pb-3 text-center">
      <MorphingText
        words={phrases}
        interval={3200}
        className="text-2xl font-semibold tracking-tight text-brand-dark md:text-3xl"
      />
      {subtitle &&
        // отступ поменьше
        (
          <p className="mt-2 text-sm text-slate-600 md:text-[15px]">
            {subtitle}
          </p>
        )}
    </div>
  );
}
