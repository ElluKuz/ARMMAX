// app/painting/page.tsx
import type { Metadata } from "next";
import { LeadFormModal } from "@/components/LeadFormModal";
import { AnimatedPortfolioHeading } from "@/components/AnimatedPortfolioHeading";
import { MorphingText } from "@/components/ui/hand-writing-text";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { ScheduleEstimateCard } from "@/components/blocks/ScheduleEstimateCard";
import { PaintingPortfolioGallery } from "@/components/blocks/PaintingPortfolioGallery";
import { PaintingCtaStrip } from "@/components/blocks/PaintingCtaStrip";

export const metadata: Metadata = {
  title: "Interior Painting in Orange County | ARMMAX",
  description:
    "Professional interior painting in Orange County, CA. Walls, ceilings, doors, trim and accent walls. Free estimates, fair pricing, family-owned handyman business.",
};

export default function PaintingPage() {
  const phone = process.env.ARM_MAX_PHONE || "+1628279622";

  return (
    <div className="flex flex-col">
      {/* HERO – максимально близко к главной */}
      <section className="relative overflow-hidden text-white">
        {/* фон-картинка */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/Paintinghero.png"
            alt="Freshly painted living room"
            className="h-full w-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-slate-900/30" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-3 pb-24 md:pt-44 md:pb-28">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Interior painting
              <br />
              <span className="text-brand-accent">
                for busy families in Orange County
              </span>
            </h1>

            <p className="mt-6 px-6 text-[15px] md:text-[20px] leading-relaxed text-slate-100/90">
              Walls, ceilings, doors and trim with clean lines and careful prep.
              ARMMAX is a family-owned painting & handyman team with 13+ years
              of experience and fair pricing.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LeadFormModal
                triggerLabel="Get painting quote"
                service="Painting"
                variant="primary"
              />
              <a
                href={`tel:${phone}`}
                className="rounded-full border border-sky-400 px-7 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-500/10"
              >
                Call us
              </a>
            </div>
          </div>
        </div>

        {/* синяя лента со статистикой – как на главной */}
        <div className="mt-2 w-full bg-brand-dark/95">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-4 md:py-5">
            <div className="grid gap-4 text-xs md:grid-cols-4 md:text-sm">
              <StatItem number="13+" label="years of experience" />
              <StatItem number="500+" label="projects completed" />
              <StatItem number="4.9 / 5" label="average rating on Yelp" />
              <StatItem
                number="Orange County"
                label="serving most local cities"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO: анимированный заголовок + новая галерея */}
      <section className="bg-white">
        <AnimatedPortfolioHeading />
        <PaintingPortfolioGallery />
      </section>

      {/* CTA-плашка под портфолио с кнопками */}
      <PaintingCtaStrip phone={phone} />

      {/* WHY CHOOSE ARMMAX – как на главной, но с фокусом на покраску */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-14 md:pt-14">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Why
            </p>

            <MorphingText
              words={[
                "Why Choose ARMMAX for painting",
                "Trusted by OC homes since 2012",
                "Local, affordable and detail-oriented",
              ]}
              className="mt-2 text-2xl md:text-3xl"
            />

            <p className="mt-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-brand-light">
              Prep · Communication · Clean lines
            </p>
            <p className="mt-3 mx-auto max-w-3xl text-slate-600">
              We focus on prep, protection of your furniture and clear
              communication, so repainting feels simple instead of stressful.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <WhyCard
              title="Meticulous prep"
              points={[
                "Patching, sanding and caulking before paint",
                "Floors, furniture and fixtures fully covered",
              ]}
            />
            <WhyCard
              title="Clean, straight lines"
              points={[
                "Sharp cuts between walls, ceilings and trim",
                "Attention to corners, doors and window frames",
              ]}
            />
            <WhyCard
              title="Color help"
              points={[
                "We can work with your designer or help you choose",
                "Samples and sheen suggestions for busy families",
              ]}
            />
            <WhyCard
              title="Respect for your home"
              points={[
                "We work neatly and keep dust under control",
                "Daily cleanup and clear plan for each day",
              ]}
            />
            <WhyCard
              title="On-time scheduling"
              points={[
                "We agree on start and finish dates in advance",
                "Great for move-ins, rentals and Airbnbs",
              ]}
            />
            <WhyCard
              title="Trusted local team"
              points={[
                "Family-owned business based in Orange County",
                "References and extra project photos on request",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Loved by homeowners – как на главной */}
      <TestimonialsSection
        testimonials={[
          {
            image: "testimonials/5starreviwfromYelp.png",
            alt: "5-star Yelp review for ARMMAX handyman services",

          },
          {
            image: "testimonials/5starreviwfromYelp2.png", 
            alt: "TaskRabbit review for furniture assembly",
            platform: "taskrabbit",

          },
          {
            image: "testimonials/5starreviwfromYelp3.png",
            alt: "Google review for TV mounting service",


          },
          {
            image: "testimonials/5starreviwfromYelp4.png",
            alt: "TaskRabbit review for gazebo installation",


          },
          {
            image: "testimonials/5starreviwfromYelp5.png",
            alt: "Yelp review highlighting communication",


          },
          {
            image: "testimonials/5starreviwfromYelp7.png",
            alt: "Yelp review highlighting communication",


          },
          {
            image: "testimonials/5starreviwfromYelp6.png",
            alt: "Yelp review highlighting communication",


          },
          {
            image: "testimonials/5starreviwfromYelp8.png",
            alt: "Yelp review highlighting communication",


          },
        ]}
      />

      {/* How we price painting – существующий блок (чуть обёрнут) */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            How we price painting
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            For interior painting you can choose the option that best fits your
            project.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 text-white p-6">
              <h3 className="text-lg font-semibold">Hourly work</h3>
              <p className="mt-2 text-sm text-slate-100">
                Perfect for small touch-ups, one or two walls, doors or fixing
                previous work. You pay only for the time spent on site.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                <li>• Minimum call-out time</li>
                <li>• Clear hourly rate before we start</li>
                <li>• Materials can be yours or provided by us</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Book hourly painting"
                  service="Painting hourly"
                  variant="primary"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Flat project estimate
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                For full rooms, multiple rooms or whole homes we usually work
                with a fixed price estimate based on photos and in-person visit.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                <li>• Send us photos and a short description</li>
                <li>• We estimate prep, materials and labor</li>
                <li>• You get one clear price for the entire project</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Describe your project"
                  service="Painting flat-rate"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule a free estimate – как на главной */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-16">
          <ScheduleEstimateCard />
        </div>
      </section>
    </div>
  );
}

/* Вспомогательные компоненты (локально, как на главной) */

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xl md:text-3xl font-semibold text-brand-accent">
        {number}
      </span>
      <span className="text-xs md:text-sm text-slate-200">{label}</span>
    </div>
  );
}

function WhyCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 text-center">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm md:text-[15px] text-slate-600">
        {points.map((p) => (
          <li key={p} className="flex items-baseline gap-2">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-light" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
