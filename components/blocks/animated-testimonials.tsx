// components/blocks/animated-testimonials.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface AnimatedTestimonialsProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
  trustedCompanies?: string[];
  trustedCompaniesTitle?: string;
  className?: string;
}

export function AnimatedTestimonials({
  title = "Loved by the community",
  subtitle = "See what our Orange County clients say about ARMMAX.",
  badgeText = "5-star local handyman & painting",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by homeowners and investors all over Orange County",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`py-24 overflow-hidden bg-slate-900 ${className || ""}`}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="text-center space-y-3"
          >
            <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
              {badgeText}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {title}
            </h2>
            <p className="text-sm md:text-base text-slate-300">{subtitle}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 md:grid-cols-[2fr_1fr]"
          >
            <div className="space-y-6">
              <Quote className="h-8 w-8 text-sky-400" />
              <p className="text-lg leading-relaxed text-slate-100">
                {active.content}
              </p>
              <div className="flex items-center gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < active.rating
                        ? "fill-sky-400 text-sky-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4 border-l border-slate-800 pl-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={active.avatar} alt={active.name} />
                  <AvatarFallback>
                    {active.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-100">
                    {active.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {active.role} · {active.company}
                  </p>
                </div>
              </div>

              <Separator className="my-2 border-slate-800" />

              <div className="flex gap-2">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 w-6 rounded-full transition ${
                      idx === activeIndex
                        ? "bg-sky-400"
                        : "bg-slate-700 hover:bg-slate-500"
                    }`}
                    aria-label={`Show testimonial from ${t.name}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {trustedCompanies.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-8 text-center space-y-4"
            >
              <h3 className="text-sm font-medium text-slate-400">
                {trustedCompaniesTitle}
              </h3>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-500 text-sm md:text-base">
                {trustedCompanies.map((company) => (
                  <span key={company} className="font-semibold">
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
