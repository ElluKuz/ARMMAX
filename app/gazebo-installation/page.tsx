// app/gazebo-installation/page.tsx
import type { Metadata } from "next";
import { LeadFormModal } from "@/components/LeadFormModal";
import { AnimatedPortfolioHeading } from "@/components/AnimatedPortfolioHeading";
import { MorphingText } from "@/components/ui/hand-writing-text";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { ScheduleEstimateCard } from "@/components/blocks/ScheduleEstimateCard";
import { GazeboInstallationPortfolioGallery } from "@/components/blocks/GazeboInstallationPortfolioGallery";
import { GazeboCtaStrip } from "@/components/blocks/GazeboCtaStrip";

export const metadata: Metadata = {
  title: "Gazebo & Pergola Installation in Orange County | ARMMAX",
  description:
    "Professional installation of gazebos, pergolas and outdoor structures in Orange County. Safe, level and ready to enjoy.",
};

export default function GazeboInstallationPage() {
  const phone = process.env.ARM_MAX_PHONE || "+1628279622";

  return (
    <div className="flex flex-col">
      {/* HERO – в стиле главной */}
      {/* HERO – в стиле главной */}
      <section className="relative overflow-hidden text-white min-h-[85vh] flex flex-col">
        <div className="absolute inset-0 -z-10">
          <img
            src="/GazeboHero.png"
            alt="Backyard gazebo"
            className="h-full w-full object-cover object-bottom brightness-110"
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>

        <div className="flex-1 flex items-center">
          <div className="mx-auto max-w-6xl px-4 w-full">
            <div className="mx-auto max-w-lg md:max-w-2xl text-center">
              <h1 className="text-2xl md:text-5xl font-semibold tracking-tight leading-tight">
                Gazebo & pergola installation
                <br />
                <span className="text-brand-accent">
                  for your backyard and patio
                </span>
              </h1>

              <p className="mt-6 text-sm md:text-[20px] leading-relaxed text-slate-100/90 px-4">
                We assemble and anchor gazebos, pergolas and outdoor pavilions
                from Costco, Home Depot and other stores — level, secure and ready
                to enjoy with your family.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LeadFormModal
                  triggerLabel="Get gazebo estimate"
                  service="Gazebo installation"
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
        </div>

        {/* синяя лента */}
        <div className="w-full bg-brand-dark/95">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-4 md:py-5">
            <div className="grid grid-cols-2 gap-4 text-[11px] sm:text-xs md:grid-cols-4 md:text-sm">
              <StatItem number="13+" label="years of experience" />
              <StatItem number="150+" label="gazebos & pergolas installed" />
              <StatItem number="4.9 / 5" label="average rating on Yelp" />
              <StatItem
                number="Orange County"
                label="serving most local cities"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Портфолио: заголовок + галерея */}
      <section className="bg-white">
        <AnimatedPortfolioHeading />
        <GazeboInstallationPortfolioGallery />
      </section>

      {/* CTA-плашка под портфолио */}
      <GazeboCtaStrip phone={phone} />

      {/* WHY CHOOSE ARMMAX */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-14 md:pt-14">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Why
            </p>

            <MorphingText
              words={[
                "Why Choose ARMMAX for gazebos",
                "Safe, level and properly anchored",
                "Backyard-ready in one visit",
              ]}
              className="mt-2 text-2xl md:text-3xl"
            />

            <p className="mt-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-brand-light">
              Safety · Leveling · Clean jobsite
            </p>
            <p className="mt-3 mx-auto max-w-3xl text-slate-600">
              We plan for your concrete, pavers, grass or deck, protect
              landscaping and leave the space clean — so your gazebo feels like
              it was always there.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
            <WhyCard
              title="Safe anchoring"
              points={[
                "Anchoring for concrete, pavers and some decks",
                "Hardware chosen for your surface and wind conditions",
              ]}
            />
            <WhyCard
              title="Level & straight"
              points={[
                "Careful leveling of posts and roof",
                "Extra attention to doors, screens and sliding parts",
              ]}
            />
            <WhyCard
              title="Protection of your yard"
              points={[
                "We protect pavers, grass and planters",
                "Boxes stacked neatly for HOA / trash pickup",
              ]}
            />
            <WhyCard
              title="From kits or custom"
              points={[
                "Costco, Home Depot, Lowe’s and online brands",
                "We can also work with kits bought elsewhere",
              ]}
            />
            <WhyCard
              title="Clear communication"
              points={[
                "We confirm model, surface and access before coming",
                "Text updates and photos for landlords or investors",
              ]}
            />
            <WhyCard
              title="Trusted local team"
              points={[
                "Family-owned business, not random subcontractors",
                "Many repeat clients across Orange County",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <TestimonialsSection
        testimonials={[
          {
            image: "/testimonials/5starreviwfromYelp.png",
            alt: "5-star Yelp review for ARMMAX handyman services",

          },
          {
            image: "/testimonials/5starreviwfromYelp2.png", 
            alt: "TaskRabbit review for furniture assembly",
            platform: "taskrabbit",

          },
          {
            image: "/testimonials/5starreviwfromYelp3.png",
            alt: "Google review for TV mounting service",


          },
          {
            image: "/testimonials/5starreviwfromYelp4.png",
            alt: "TaskRabbit review for gazebo installation",


          },
          {
            image: "/testimonials/5starreviwfromYelp5.png",
            alt: "Yelp review highlighting communication",


          },
          {
            image: "/testimonials/5starreviwfromYelp7.png",
            alt: "Yelp review highlighting communication",


          },
          {
            image: "/testimonials/5starreviwfromYelp6.png",
            alt: "Yelp review highlighting communication",


          },
          {
            image: "/testimonials/5starreviwfromYelp8.png",
            alt: "Yelp review highlighting communication",


          },
        ]}
      />

      {/* Pricing options */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            How we price gazebo installation
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Every backyard is different, so we offer two simple ways to price
            your gazebo or pergola.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 text-white p-6">
              <h3 className="text-lg font-semibold">
                Flat rate for known models
              </h3>
              <p className="mt-2 text-sm text-slate-100">
                Ideal for popular gazebos from Costco, Home Depot and similar
                stores.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                <li>• You send the exact model and photos of the spot</li>
                <li>• We give one fixed price for assembly & anchoring</li>
                <li>• Date agreed in advance, no surprises</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Get flat rate"
                  service="Gazebo flat-rate"
                  variant="primary"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Custom project estimate
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                For custom pergolas, uneven surfaces or extra preparation
                (concrete pads, digging, etc.).
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                <li>• Send photos and a short description of your backyard</li>
                <li>• We may ask a few more questions or visit the site</li>
                <li>• You receive a clear project-based estimate</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Describe your backyard"
                  service="Gazebo custom project"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Календарь – как на главной */}
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
