// components/ui/in-view.tsx
"use client";

import { motion, useInView, type Variants, type Transition } from "framer-motion";
import { useRef } from "react";

interface InViewProps {
  children: React.ReactNode;
  /** framer-motion variants для hidden/visible */
  variants?: Variants;
  /** framer-motion transition */
  transition?: Transition;
  /** Опции появления – сейчас используем только margin, как в примере */
  viewOptions?: {
    margin?: string;
  };
  className?: string;
}

/**
 * Обёртка, которая анимирует children при появлении в viewport.
 * По умолчанию — лёгкий fade + сдвиг вверх.
 */
export function InView({
  children,
  variants,
  transition,
  viewOptions,
  className,
}: InViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
  });

  const finalVariants: Variants =
    variants ??
    {
      hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

  const finalTransition: Transition =
    transition ?? { duration: 0.35};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={finalVariants}
      transition={finalTransition}
    >
      {children}
    </motion.div>
  );
}
