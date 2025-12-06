// components/blocks/PaintingPortfolioGallery.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageGallery } from "@/components/ui/image-gallery";
import { LeadFormModal } from "@/components/LeadFormModal";

interface PaintingGalleryItem {
  id: string;
  title: string;
  summary: string;
  location: React.ReactNode;
  image: string;
  galleryImages: string[];
  story: string;
}

const PAINTING_ITEMS: PaintingGalleryItem[] = [
  {
    id: "full-room-repaint",
    title: "Full room repainting",
    summary:
      "Professional interior repainting for living rooms, bedrooms and whole homes, with careful prep, clean lines and help choosing the right colors.",
    location: (
      <>
        Irvine, Lake Forest, Santa Ana, Tustin & nearby OC
        <br />
        1–3 days · living rooms, bedrooms & common areas
      </>
    ),
    image:
      "InteriorPaintingProjects/InteriorPainting9.jpg",
    galleryImages: [
      "InteriorPaintingProjects/InteriorPainting1.jpg",
      "InteriorPaintingProjects/InteriorPainting2.jpg",
      "InteriorPaintingProjects/InteriorPainting4.jpg",
      "InteriorPaintingProjects/InteriorPainting.jpg",
    ],
    story:
      "We handle full-room and whole-home repainting from start to finish: protecting furniture and floors, repairing cracks and nail holes, caulking gaps and then applying smooth, even coats of paint. We can help you choose colors that match your furniture and light, so the room feels brighter, cleaner and more intentional. Our team keeps edges sharp around trim and ceilings, uses low-VOC paints whenever possible and leaves your home tidy and ready to move back into the same day we finish.",
  },
  {
    id: "accent-wall",
    title: "Accent wall painting & color updates",
    summary:
      "Crisp accent walls that change the mood of the room without repainting every surface.",
    location: (
      <>
        Costa Mesa, Newport Beach, Huntington Beach, Fountain Valley & nearby OC
        <br />
        0.5–1 day · single or multiple accent walls
      </>
    ),
    image:
      "InteriorPaintingProjects/InteriorPainting7.jpg",
    galleryImages: [
      "InteriorPaintingProjects/InteriorPainting.jpg",
      "InteriorPaintingProjects/InteriorPainting3.jpg",
      "InteriorPaintingProjects/InteriorPainting5.jpg",
      "InteriorPaintingProjects/InteriorPainting9.jpg",
    ],
    story:
      "Accent walls are the fastest way to update a room without a full repaint. We help pick a color that works with your existing walls and furniture, then carefully mask edges, baseboards and trim so the new color looks sharp and intentional. Lines at corners and ceilings stay straight, outlets and switches are handled cleanly, and we always leave the rest of the room spotless so the new wall feels like it has always been part of your design.",
  },
  {
    id: "popcorn-removal",
    title: "Popcorn texture removal & smooth repainting",
    summary:
      "We remove dated popcorn texture, repair the surface and repaint ceilings or walls so the room feels clean and modern.",
    location: (
      <>
        Anaheim, Orange, Garden Grove, Fullerton & nearby OC
        <br />
        1–2 days · popcorn removal + repaint for 1–2 rooms
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=1200&auto=format&fit=crop",
    ],
    story:
      "Popcorn texture dates a room and collects dust, so we carefully remove it, skim coat and sand to create a smooth, modern surface before repainting. We protect floors, furniture and vents, control dust as much as possible and use the right primers so the new paint bonds well and looks even. The result is a ceiling or wall that feels fresh and clean, instantly changing how the whole space feels when you walk in.",
  },
  {
    id: "large-space-office",
    title: "Large room, office & common-area repainting",
    summary:
      "Efficient repainting for offices, garages and common areas in one consistent color across big spaces.",
    location: (
      <>
        Irvine, Santa Ana, Anaheim, Orange & nearby OC
        <br />
        1–3 days · offices, garages & large technical spaces
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=1200&auto=format&fit=crop",
    galleryImages: [
      "InteriorPaintingProjects/InteriorPainting7.jpg",
      "InteriorPaintingProjects/InteriorPainting8.jpg",
      "InteriorPaintingProjects/InteriorPainting9.jpg",
    ],
    story:
      "For larger spaces like offices, garages and common areas we focus on clean coverage, consistent color and minimal disruption to your day. We plan around your schedule, protect floors and equipment, and use the right tools for tall walls and ceilings so the work moves quickly but safely. A single, well-chosen color can make a workspace feel brighter and more professional, and our crew is used to handling bigger volumes without sacrificing attention to detail at doors, trim and corners.",
  },
];

export function PaintingPortfolioGallery() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeItem, setActiveItem] = useState<PaintingGalleryItem | null>(null);

  const phone = process.env.ARM_MAX_PHONE || "+1628279622";

  useEffect(() => {
    if (!carouselApi) return;

    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    update();
    carouselApi.on("select", update);

    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (activeItem) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeItem]);

  function openModal(item: PaintingGalleryItem) {
    setActiveItem(item);
  }

  function closeModal() {
    setActiveItem(null);
  }

  return (
    <>
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex flex-col justify-between gap-4 md:mb-8 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-2xl font-semibold md:mb-3 md:text-3xl">
                Interior painting projects in real OC homes
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                Scroll sideways to see a few examples of living rooms, bedrooms
                and hallways we recently repainted.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <button
                type="button"
                className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                See more photos
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => carouselApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className="h-9 w-9 rounded-full border-slate-300 bg-white disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => carouselApi?.scrollNext()}
                  disabled={!canScrollNext}
                  className="h-9 w-9 rounded-full border-slate-300 bg-white disabled:opacity-40"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
            className="relative"
          >
            <CarouselContent className="mb-4 mt-2">
              {PAINTING_ITEMS.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full pl-4 md:basis-1/2 lg:basis-[420px]"
                >
                  <article
                    className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-3 shadow-sm transition hover:-translate-y-1 hover:border-sky-400 hover:bg-white md:p-4 cursor-pointer"
                    onClick={() => openModal(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openModal(item);
                      }
                    }}
                  >
                    <div>
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105 md:h-64"
                        />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-900 md:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {item.summary}
                      </p>
                    </div>
                    <p className="mt-3 text-xs font-medium text-slate-500 md:text-sm">
                      {item.location}
                    </p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-300 hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close project details</span>
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-6 pt-12 md:p-8 md:pt-14 scrollbar-thin-dark">
              <div className="pr-2 md:pr-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Project spotlight
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
                  {activeItem.title}
                </h2>
                <p className="mt-2 text-sm md:text-base text-slate-300">
                  {activeItem.location}
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  {activeItem.summary}
                </p>
              </div>

              <ImageGallery
                title="Photos from our painting projects"
                subtitle="A few angles that show how the rooms look after repainting."
                images={activeItem.galleryImages}
                className="mt-4"
              />

              <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-6 md:px-7 md:py-7 md:flex md:items-center md:justify-between md:gap-8">
                <div className="max-w-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                    Ready for a refresh?
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                    Let’s repaint your living room, bedroom or the whole home.
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Send a quick request or call us to talk through colors, sheen and
                    rooms you want to update.
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 md:mt-0 md:min-w-[260px]">
                  <LeadFormModal
                    triggerLabel="Request free estimate"
                    service="Painting"
                    variant="primary"
                  />
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center rounded-full border border-slate-500 px-6 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                  >
                    Call to discuss colors
                  </a>
                </div>
              </div>

              <div className="mt-6 px-1 md:px-2">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeItem.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
