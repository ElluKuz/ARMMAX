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
        "flex flex-col",
        // На мобиле почти весь экран, на планшете шире, на десктопе как раньше
        "w-[80vw] sm:w-[570px] md:w-[620px] lg:w-[640px]",
        "transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
