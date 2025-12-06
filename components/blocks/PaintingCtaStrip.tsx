// components/blocks/PaintingCtaStrip.tsx
"use client";

import { InView } from "@/components/ui/in-view";
import { LeadFormModal } from "@/components/LeadFormModal";

export function PaintingCtaStrip({ phone }: { phone: string }) {
  return (
    <section className="bg-brand-dark text-white">
      <InView
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.96,
            filter: "blur(6px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.35}}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Ready for a refresh?
            </p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Let’s repaint your living room, bedroom or the whole home.
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-100/85">
              Send a quick request or call us to talk through colors, sheen and
              rooms you want to update.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <LeadFormModal
              triggerLabel="Request free estimate"
              service="Painting"
              variant="primary"
            />
            <a
              href={`tel:${phone}`}
              className="rounded-full border border-slate-400/60 px-6 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-100/10"
            >
              Call to discuss colors
            </a>
          </div>
        </div>
      </InView>
    </section>
  );
}
