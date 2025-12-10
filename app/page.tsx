// app/page.tsx
import StickyScroll from "@/components/ui/sticky-scroll";
import { LeadFormModal } from "@/components/LeadFormModal";
import { AnimatedTestimonials } from "@/components/blocks/animated-testimonials";
import { AnimatedServicesHeading } from "@/components/AnimatedServicesHeading";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { ScheduleEstimateCard } from "@/components/blocks/ScheduleEstimateCard";
import { AnimatedPortfolioHeading } from "@/components/AnimatedPortfolioHeading";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";
import { MorphingText } from "@/components/ui/hand-writing-text";

export default function HomePage() {
  const phone = process.env.ARM_MAX_PHONE || "+1628279622";

  return (
    <div className="flex flex-col">
      {/* HERO: фон-картинка + текст + кнопки + синяя лента */}
      <section className="relative overflow-hidden text-white">
        {/* фон-картинка */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/MainHero.png"
            alt="Freshly painted living room"
            className="h-full w-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-slate-900/20 md:bg-slate-900/30" />
        </div>

        {/* ↑ больше отступ от хедера */}
        <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 md:pt-44 md:pb-28">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Handyman, Painting & Assembly
              <br />
              <span className="text-brand-accent">
                for busy families in Orange County
              </span>
            </h1>

            {/* текст чуть крупнее и свободнее */}
            <p className="mt-6 text-[15px] md:text-[20px] leading-relaxed text-slate-100/90">
              ARMMAX is a family-owned handyman business with 13+ years of
              experience. Always with high quality and fair prices.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LeadFormModal
                triggerLabel="Get quote"
                service="General"
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

        {/* синяя лента с цифрами */}
        <div className="mt-2 w-full bg-brand-dark/95">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-4 md:py-5">
            <div className="grid grid-cols-2 gap-4 text-[11px] sm:text-xs md:grid-cols-4 md:text-sm">
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

      {/* блок с 4 основными сервисами сразу под hero */}
      <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <AnimatedServicesHeading />
        
        <div className="grid gap-4 md:grid-cols-2">
          <ServiceCard
            title="Interior Painting"
            description="Walls, ceilings, accent walls, doors – detailed prep and clean lines."
            href="/painting"
            image="Interior-Painting/IMG_5377.webp"
          />
          <ServiceCard
            title="Furniture Assembly"
            description="IKEA, Costco, Amazon – we assemble quickly and safely."
            href="/furniture-assembly"
            image="furnitureassembly/EuStorageAndKitchenCabinetsAssembly.jpg"
          />
          <ServiceCard
            title="Gazebo Installation"
            description="Backyard gazebos, pergolas and outdoor structures."
            href="/gazebo-installation"
            image="gazebo-installation/gazebo_assembly-1.jpg"
          />
          <ServiceCard
            title="TV & Art Mounting"
            description="TVs, soundbars and artwork securely mounted with clean lines and hidden cables."
            href="/handyman-services"
            image="tvartmount/tv-mounting-art-hanging-in-OC-county-1.jpg"
          />
        </div>
        </div>
      </section>

      {/* Painting portfolio sticky-scroll (уже без огромной заставки) */}
      <section className="bg-white">
        {/* анимированный заголовок как у блока Get a Free Quote */}
        <AnimatedPortfolioHeading />

        {/* сама галерея, фон уже совпадает */}
        <StickyScroll />
      </section>

      {/* Why choose us */}
      {/* Why choose us */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 md:pb-14">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Why
          </p>

          <MorphingText
            words={[
              "Why Choose ARMMAX",
              "Trusted by OC homes since 2012",
              "Local, affordable and reliable",
            ]}
            className="mt-2 text-2xl md:text-3xl"
          />

          <p className="mt-2 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-brand-light">
            Speed · Communication · Quality
          </p>
          <p className="mt-3 mx-auto max-w-3xl text-slate-600">
            Discover the difference that attention to detail and personalized service
            can make. Choose us for a transformation that speaks volumes.
          </p>
        </div>

          {/* мобилка: авто-скролл карусель */}
          <div className="overflow-hidden pb-4 -mx-4 px-4 md:hidden">
            <div className="flex gap-4 why-slider">
              <WhyCard
                title="Neat and responsible"
                points={[
                  "Meticulous prep and covering",
                  "Detailed cleaning at the end",
                ]}
              />
              <WhyCard
                title="Clear Communication"
                points={[
                  "Proactive communication style with in-person walkthroughs",
                  "Text reminders",
                ]}
              />
              <WhyCard
                title="Transparent Pricing"
                points={[
                  "Detailed itemized quotes sent by email, text and PDF",
                  "We do our best to set clear expectations",
                ]}
              />
              <WhyCard
                title="Quality Finishes"
                points={[
                  "Dedicated crews to give superior finishes",
                  "27-point checklist system so no detail is missed",
                ]}
              />
              <WhyCard
                title="Project Completion"
                points={[
                  "We meet deadlines without compromising on quality",
                  "Project completion with a human touch",
                ]}
              />
              <WhyCard
                title="Trusted local team"
                points={[
                  "Family-owned business serving Orange County since 2012",
                  "Photo examples & references available on request",
                ]}
              />
            </div>
          </div>

          {/* десктоп: старая сетка */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-4">
            <WhyCard
              title="Neat and responsible"
              points={[
                "Meticulous prep and covering",
                "Detailed cleaning at the end",
              ]}
            />
            <WhyCard
              title="Clear Communication"
              points={[
                "Proactive communication style with in-person walkthroughs",
                "Text reminders",
              ]}
            />
            <WhyCard
              title="Transparent Pricing"
              points={[
                "Detailed itemized quotes sent by email, text and PDF",
                "We do our best to set clear expectations",
              ]}
            />
            <WhyCard
              title="Quality Finishes"
              points={[
                "Dedicated crews to give superior finishes",
                "27-point checklist system so no detail is missed",
              ]}
            />
            <WhyCard
              title="Project Completion"
              points={[
                "We meet deadlines without compromising on quality",
                "Project completion with a human touch",
              ]}
            />
            <WhyCard
              title="Trusted local team"
              points={[
                "Family-owned business serving Orange County since 2012",
                "Photo examples & references available on request",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Loved by community – оставляем как есть */}
      {/* Loved by community – новая лента отзывов */}
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


      {/* Schedule a free estimate */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-16">
          <ScheduleEstimateCard />
        </div>
      </section>
      
    </div>
  );
}

/* Вспомогательные компоненты */

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

function ServiceCard({
  title,
  description,
  href,
  image,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-sky-400 text-inherit"
    >
      <div className="h-48 md:h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        <span className="mt-4 inline-flex text-xs font-semibold text-sky-500">
          <span className="service-link">Learn more →</span>
        </span>
      </div>
    </a>
  );
}


function WhyCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div
      className="
        w-[80vw] flex-shrink-0 rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm
        md:w-auto md:flex-shrink
      "
    >
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




function SpecialtyCard({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-400"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{text}</p>
      </div>
      <span className="mt-4 text-xs font-semibold text-sky-500">
        View details →
      </span>
    </a>
  );
}
