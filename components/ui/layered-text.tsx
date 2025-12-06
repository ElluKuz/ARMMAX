// components/ui/layered-text.tsx
"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import { gsap } from "gsap";

interface LayeredTextLine {
  top: string;
  bottom: string;
}

interface LayeredTextProps {
  lines?: LayeredTextLine[];
  fontSize?: string;
  fontSizeMd?: string;
  lineHeight?: number;
  lineHeightMd?: number;
  className?: string;
}

/**
 * Диагональный «слоёный» текст FAMILY / OWNED / CLEAN CREWS / QUALITY / FINISHES / ARMMAX
 * максимально похожий по плотности на реф с INFINITE / PROGRESS / …
 */
export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "FAMILY" },
    { top: "FAMILY", bottom: "OWNED" },
    { top: "OWNED", bottom: "CLEAN CREWS" },
    { top: "CLEAN CREWS", bottom: "QUALITY" },
    { top: "QUALITY", bottom: "FINISHES" },
    { top: "FINISHES", bottom: "ARMMAX" },
    { top: "ARMMAX", bottom: "\u00A0" },
  ],
  // крупный шрифт + плотный вертикальный шаг
  fontSize = "96px",
  fontSizeMd = "52px",
  lineHeight = 56,     // высота строки
  lineHeightMd = 38,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // смещение по X – «ступенька»
  const calculateTranslateX = (index: number) => {
    const baseOffset = 30;     // меньше — блок компактнее
    const baseOffsetMd = 18;
    const centerIndex = Math.floor(lines.length / 2);
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const paragraphs = container.querySelectorAll("p");

    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    tl.to(paragraphs, {
      y: window.innerWidth >= 768 ? -lineHeight : -lineHeightMd,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    });

    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
      tl.kill();
    };
  }, [lines, lineHeight, lineHeightMd]);

  // строки сильно заходят друг на друга — как в рефе
  const overlap = 30; // чем больше, тем плотнее вертикально

  return (
    <div
      ref={containerRef}
      className={`font-sans font-black uppercase tracking-[-2px] text-brand-dark antialiased cursor-pointer ${className}`}
      style={
        {
          fontSize,
          "--md-font-size": fontSizeMd,
        } as React.CSSProperties
      }
    >
      <ul className="m-0 flex list-none flex-col items-center p-0">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index);
          const isEven = index % 2 === 0;

          return (
            <li
              key={index}
              className="relative overflow-hidden"
              style={
                {
                  height: `${lineHeight}px`,
                  marginTop: index === 0 ? 0 : `-${overlap}px`,
                  transform: `translateX(${translateX.desktop}px) skew(${
                    isEven ? "60deg, -30deg" : "0deg, -30deg"
                  }) scaleY(${isEven ? "0.66667" : "1.33333"})`,
                } as React.CSSProperties
              }
            >
              <p
                className="m-0 whitespace-nowrap px-[14px] align-top leading-[1.05]"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 4}px`,
                  } as React.CSSProperties
                }
              >
                {line.top}
              </p>
              <p
                className="m-0 whitespace-nowrap px-[14px] align-top leading-[1.05]"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 4}px`,
                  } as React.CSSProperties
                }
              >
                {line.bottom}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
