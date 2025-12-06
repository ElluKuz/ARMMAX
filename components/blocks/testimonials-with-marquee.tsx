// components/blocks/testimonials-with-marquee.tsx
"use client";

import { cn } from "@/lib/utils";
import { TestimonialScreenshotCard } from "@/components/ui/testimonial-screenshot-card";

interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  testimonials: Array<{
    image: string;
    alt: string;
    platform?: "yelp" | "taskrabbit" | "google";
    rating?: number;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title = "Loved by homeowners across Orange County",
  description = "Real reviews from Yelp, TaskRabbit and Google - see what families in OC say about our work",
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-slate-950 text-slate-50",
        "py-8 sm:py-12 md:py-16 px-0", // Уменьшили вертикальные отступы
        className
      )}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-3 text-center sm:gap-8 px-4"> {/* Уменьшили gap */}
        <div className="flex flex-col items-center gap-3 sm:gap-4"> {/* Уменьшили gap */}
          <h2 className="max-w-[720px] text-xl md:text-2xl font-semibold leading-tight sm:text-3xl sm:leading-tight"> {/* Уменьшили размер текста */}
            {title}
          </h2>

          <p className="text-xs md:text-sm max-w-[600px] text-slate-300"> {/* Уменьшили размер текста */}
            {description}
          </p>
        </div>

        <div className="relative mt-4 flex w-full flex-col items-center justify-center overflow-hidden"> {/* Уменьшили mt */}
          <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:180s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(8)].map((_, setIndex) => // Увеличили до 8 дубликатов для бесконечности
                testimonials.map((testimonial, i) => (
                  <TestimonialScreenshotCard
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-slate-950 sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-slate-950 sm:block" />
        </div>
      </div>
    </section>
  );
}