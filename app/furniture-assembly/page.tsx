// app/furniture-assembly/page.tsx
import type { Metadata } from "next";
import { LeadFormModal } from "@/components/LeadFormModal";
import { AnimatedPortfolioHeading } from "@/components/AnimatedPortfolioHeading";
import { MorphingText } from "@/components/ui/hand-writing-text";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { ScheduleEstimateCard } from "@/components/blocks/ScheduleEstimateCard";
import { FurnitureAssemblyPortfolioGallery } from "@/components/blocks/FurnitureAssemblyPortfolioGallery";
import { FurnitureAssemblyCtaStrip } from "@/components/blocks/FurnitureAssemblyCtaStrip";

export const metadata: Metadata = {
  title: "Furniture Assembly in Orange County | ARMMAX",
  description:
    "Professional furniture assembly in Orange County. We assemble IKEA, Wayfair, Costco and custom furniture safely and on time.",
};

export default function FurnitureAssemblyPage() {
  const phone = process.env.ARM_MAX_PHONE || "+1628279622";

  return (
    <div className="flex flex-col">
      {/* HERO – та же структура, адаптированный текст под сборку мебели */}
      <section className="relative overflow-hidden text-white min-h-[85vh] flex flex-col">
      {/* Фон-картинка */}
      <div className="absolute inset-0 -z-10">
        <img
          src="Furnitureassemblyhero.png"
          alt="Living room with assembled furniture"
          className="h-full w-full object-cover object-bottom brightness-110"
        />
        <div className="absolute inset-0 bg-slate-900/30" />
      </div>

      {/* Основной контент - занимает все доступное пространство */}
      <div className="flex-1 flex items-center">
        <div className="mx-auto max-w-6xl px-4 w-full">
          <div className="mx-auto max-w-lg md:max-w-2xl text-center">
            <h1 className="text-2xl md:text-5xl font-semibold tracking-tight leading-tight">
              Furniture assembly
              <br />
              <span className="text-brand-accent">
                for busy families in Orange County
              </span>
            </h1>

            <p className="mt-6 text-sm md:text-[20px] leading-relaxed text-slate-100/90 px-4">
              We assemble bedroom sets, living rooms, kids furniture, office
              desks and closets from IKEA, Wayfair, Costco, Amazon and custom
              stores — safely and on time, without mess.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LeadFormModal
                triggerLabel="Get assembly quote"
                service="Furniture assembly"
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

      {/* Синяя полоска с статистикой */}
      <div className="w-full bg-brand-dark/95">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-4 md:py-5">
          <div className="grid gap-4 text-xs md:grid-cols-4 md:text-sm">
            <StatItem number="13+" label="years of experience" />
            <StatItem number="500+" label="assembly projects completed" />
            <StatItem number="4.9 / 5" label="average rating on Yelp" />
            <StatItem
              number="Orange County"
              label="serving most local cities"
            />
          </div>
        </div>
      </div>
    </section>

      {/* PORTFOLIO: анимированный заголовок + новая галерея сборки мебели */}
      <section className="bg-white">
        <AnimatedPortfolioHeading />
        <FurnitureAssemblyPortfolioGallery />
      </section>

      {/* CTA-плашка под портфолио */}
      <FurnitureAssemblyCtaStrip phone={phone} />

      {/* WHY CHOOSE ARMMAX – под сборку мебели */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-14 md:pt-14">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Why
            </p>

            <MorphingText
              words={[
                "Why Choose ARMMAX for assembly",
                "Trusted by OC homes since 2012",
                "Local, careful and efficient",
              ]}
              className="mt-2 text-2xl md:text-3xl"
            />

            <p className="mt-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-brand-light">
              Care · Safety · Clear communication
            </p>
            <p className="mt-3 mx-auto max-w-3xl text-slate-600">
              We protect your floors and walls, double-check every connection
              and leave the space clean — so you can simply enjoy your new
              furniture.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <WhyCard
              title="Safe, sturdy assembly"
              points={[
                "We follow manufacturer instructions and use proper tools",
                "Extra tightening and checks for bunk beds and kids items",
              ]}
            />
            <WhyCard
              title="Protection of your home"
              points={[
                "Furniture unpacked carefully, floors and walls protected",
                "Boxes stacked neatly for HOA / trash room",
              ]}
            />
            <WhyCard
              title="From any store"
              points={[
                "IKEA, Wayfair, Costco, Amazon and custom furniture",
                "Mix of brands in one visit is totally fine",
              ]}
            />
            <WhyCard
              title="Clear communication"
              points={[
                "We confirm the list before coming",
                "Text updates and photos if needed for landlords/investors",
              ]}
            />
            <WhyCard
              title="Efficient scheduling"
              points={[
                "Evening and weekend slots available",
                "Great for move-in days and Airbnb turnovers",
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

      {/* Loved by homeowners – как на главной, но с упором на мебель */}
      <TestimonialsSection
        testimonials={[
          {
            image: "testimonials/5starreviwfromYelp.png",
            alt: "5-star Yelp review for ARMMAX handyman services",
            platform: "yelp",
          },
          {
            image: "testimonials/5starreviwfromYelp2.png",
            alt: "TaskRabbit review for furniture assembly",
            platform: "taskrabbit",
          },
          {
            image: "testimonials/5starreviwfromYelp3.png",
            alt: "Google review for TV mounting service",
            platform: "google",
          },
          {
            image: "testimonials/5starreviwfromYelp4.png",
            alt: "TaskRabbit review for gazebo installation",
            platform: "taskrabbit",
          },
          {
            image: "testimonials/5starreviwfromYelp5.png",
            alt: "Yelp review highlighting communication",
            platform: "yelp",
          },
          {
            image: "testimonials/5starreviwfromYelp7.png",
            alt: "Yelp review highlighting communication",
            platform: "yelp",
          },
          {
            image: "testimonials/5starreviwfromYelp6.png",
            alt: "Yelp review highlighting communication",
            platform: "yelp",
          },
          {
            image: "testimonials/5starreviwfromYelp8.png",
            alt: "Yelp review highlighting communication",
            platform: "yelp",
          },
        ]}
      />

      {/* How we work / price – блок под сборку мебели */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            How we price furniture assembly
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            You can choose an hourly visit for mixed tasks or a flat rate when
            you know your furniture list.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 text-white p-6">
              <h3 className="text-lg font-semibold">Hourly assembly visit</h3>
              <p className="mt-2 text-sm text-slate-100">
                Perfect when you have several small items, mixed brands or a
                punch list of tasks in one property.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                <li>• Minimum visit time agreed before we arrive</li>
                <li>• Great for TV mounting + shelves + 1–2 furniture items</li>
                <li>• Pay only for actual time on site</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Book hourly visit"
                  service="Furniture assembly hourly"
                  variant="primary"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Flat rate per furniture list
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Best when you have a full list from IKEA, Costco, Wayfair or
                Amazon and want a clear final price.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                <li>• Send links or screenshots of your order</li>
                <li>• We calculate a project price for everything together</li>
                <li>• No surprises on the final invoice</li>
              </ul>
              <div className="mt-4">
                <LeadFormModal
                  triggerLabel="Send your furniture list"
                  service="Furniture assembly flat-rate"
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

/* Локальные вспомогательные компоненты */

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
