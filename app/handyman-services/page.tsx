// app/handyman-services/page.tsx
import type { Metadata } from "next";
import { LeadFormModal } from "@/components/LeadFormModal";
import { AnimatedPortfolioHeading } from "@/components/AnimatedPortfolioHeading";
import { MorphingText } from "@/components/ui/hand-writing-text";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { ScheduleEstimateCard } from "@/components/blocks/ScheduleEstimateCard";
import { HandymanServicesPortfolioGallery } from "@/components/blocks/HandymanServicesPortfolioGallery";
import { TvMountingCtaStrip } from "@/components/blocks/TvMountingCtaStrip";

export const metadata: Metadata = {
  title: "TV & Art Mounting in Orange County | ARMMAX",
  description:
    "Professional TV and art mounting in Orange County: secure installs into studs, cable hiding and clean finishes for your home or rental.",
};

export default function TvArtMountingPage() {
  const phone = process.env.ARM_MAX_PHONE || "+1628279622";

  return (
    <div className="flex flex-col">
      {/* HERO — TV & ART MOUNTING */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/TVmountHero.png"
            alt="Living room with wall-mounted TV"
            className="h-full w-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-slate-900/35" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 md:pt-44 md:pb-28">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              TV & art mounting
              <br />
              <span className="text-brand-accent">
                safe, level and with hidden cables
              </span>
            </h1>

            <p className="mt-6 text-[15px] md:text-[20px] leading-relaxed text-slate-100/90">
              We mount TVs, soundbars, shelves and artwork into studs or proper
              anchors, hide cables where possible and leave your living room or
              bedroom looking clean and finished.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LeadFormModal
                triggerLabel="Get TV mounting quote"
                service="TV & art mounting"
                variant="primary"
              />
              <a
                href={`tel:${phone}`}
                className="rounded-full border border-sky-400 px-7 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-500/10"
              >
                Call for TV mounting
              </a>
            </div>
          </div>
        </div>

        {/* синяя лента */}
        <div className="mt-2 w-full bg-brand-dark/95">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-4 md:py-5">
            <div className="grid gap-4 text-xs md:grid-cols-4 md:text-sm">
              <StatItem number="13+" label="years of handyman work" />
              <StatItem number="300+" label="TVs and artworks mounted" />
              <StatItem number="4.9 / 5" label="average rating on Yelp" />
              <StatItem
                number="Orange County"
                label="serving most local cities"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Портфолио — TV & ART */}
      <section className="bg-white">
        <AnimatedPortfolioHeading />
        <HandymanServicesPortfolioGallery />
      </section>

      {/* CTA-плашка с анимацией при скролле */}
      <TvMountingCtaStrip phone={phone} />

      {/* WHY CHOOSE ARMMAX */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-14 md:pt-14">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Why
            </p>

            <MorphingText
              words={[
                "Why Choose ARMMAX for TV & art mounting",
                "Safe, level and cable-conscious",
                "One team for TVs, art and shelves",
              ]}
              className="mt-2 text-2xl md:text-3xl"
            />

            <p className="mt-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-brand-light">
              Safety · Clean lines · Hidden cables
            </p>
            <p className="mt-3 mx-auto max-w-3xl text-slate-600">
              We find studs, choose proper anchors, plan cable routes and help
              you decide on height and layout — so your TV wall or gallery looks
              intentional, not improvised.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <WhyCard
              title="Safe mounting"
              points={[
                "Stud-finding and proper anchors for your wall type",
                "Extra care for heavy TVs and large mirrors",
              ]}
            />
            <WhyCard
              title="Clean layouts"
              points={[
                "Help with TV height, center lines and composition",
                "Gallery walls and sets of frames laid out before drilling",
              ]}
            />
            <WhyCard
              title="Cable hiding options"
              points={[
                "Basic cable management with covers and clips",
                "In-wall cable routing where possible and allowed",
              ]}
            />
            <WhyCard
              title="Respect for your home"
              points={[
                "We protect floors and furniture where needed",
                "Vacuum dust and wipe surfaces after drilling",
              ]}
            />
            <WhyCard
              title="Rental & Airbnb friendly"
              points={[
                "Mounting with a plan for future patch/paint",
                "Photos and notes for landlords and investors",
              ]}
            />
            <WhyCard
              title="Fair, clear pricing"
              points={[
                "Per-TV or per-visit pricing depending on scope",
                "No surprise extras at the end",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Отзывы */}
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

      {/* Pricing */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            How we price TV & art mounting
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Choose an hourly visit for mixed tasks or a clear per-TV / per-wall
            price for defined projects.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 text-white p-6">
              <h3 className="text-lg font-semibold">Hourly visit</h3>
              <p className="mt-2 text-sm text-slate-100">
                Best when you have a mix of TVs, shelves and frames in one
                property.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                <li>• Minimum visit time agreed in advance</li>
                <li>• We go through your mounting list together</li>
                <li>• Perfect for rentals and Airbnbs with many small tasks</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Book TV & art visit"
                  service="TV & art mounting hourly"
                  variant="primary"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Per-TV / per-wall pricing
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Great when you know exactly how many TVs and walls you want to
                mount.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                <li>• Send TV sizes, wall types and a few photos</li>
                <li>• We estimate hardware and labor per TV / wall</li>
                <li>• One clear price before we start drilling</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Request per-TV quote"
                  service="TV & art mounting flat-rate"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Календарь */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-16">
          <ScheduleEstimateCard />
        </div>
      </section>
    </div>
  );
}

/* вспомогательные */

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
