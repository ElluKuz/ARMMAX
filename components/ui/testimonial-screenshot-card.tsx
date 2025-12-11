// components/ui/testimonial-screenshot-card.tsx
"use client";

import { cn } from "@/lib/utils";

interface TestimonialScreenshotCardProps {
  image: string;
  alt: string;
  platform?: "yelp" | "taskrabbit" | "google";
  rating?: number;
  className?: string;
}

export function TestimonialScreenshotCard({
  image,
  alt,
  platform,
  rating,
  className,
}: TestimonialScreenshotCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        // На мобиле — почти вся ширина секции, на десктопе фиксированная ширина
        "w-full sm:w-[570px] md:w-[620px] lg:w-[640px]",
        "transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
    >
      {/* Фиксированная приличная высота, чтобы не было "капсул" */}
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain rounded-xl shadow-md bg-slate-900"
        />
      </div>
    </div>
  );
}
