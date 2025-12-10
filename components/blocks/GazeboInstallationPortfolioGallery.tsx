// components/blocks/GazeboInstallationPortfolioGallery.tsx
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

interface GazeboGalleryItem {
  id: string;
  title: string;
  summary: string;
  details: React.ReactNode; 
  image: string;
  galleryImages: string[];
  story: string;
}

const GAZEBO_ITEMS: GazeboGalleryItem[] = [
  {
    id: "pavers-gazebo",
    title: "Premium Gazebos, Installed the Right Way",
    summary:
      "Gazebo installations we complete every week: solid aluminum frames, louvered and open-roof pergolas, and spa-side structures built on existing patios.",
    details: (
      <>
        Irvine, Lake Forest, Orange & nearby OC
        <br />
        4–8 hours same-day 
      </>
    ),
    image: "/gazebo-installation/gazebo_assembly-10.jpg",
    galleryImages: [
      "/gazebo-installation/gazebo_assembly-1.jpg",
      "/gazebo-installation/gazebo_assembly-2.jpg",
      "/gazebo-installation/gazebo_assembly-3.jpg",
      "/gazebo-installation/gazebo_assembly-4.jpg",
      "/gazebo-installation/gazebo_assembly-5.jpg",
    ],
    story:
      "Most of our clients buy a gazebo or pergola online and quickly realize how much work the installation really is. These projects show what it looks like when a professional crew handles the hard part. We take care of layout, leveling, anchoring and all the small adjustments, so you don’t have to spend weekends reading manuals and moving heavy parts around.",
  },
  {
    id: "deck-pergola",
    title: "Custom Gazebo & Pergola Installations",
    summary:
      "Most backyards are not perfectly flat, so our team focuses on precise leveling, structural anchoring and clean integration with what’s already there.",
    details: (
      <>
        Huntington Beach, Costa Mesa, Newport Beach
        <br />
        1 full day
      </>
    ),
    image: "/gazebo-installation/gazebo_assembly-14.jpg",
    galleryImages: [
      "/gazebo-installation/gazebo_assembly-6.jpg",
      "/gazebo-installation/gazebo_assembly-4.jpg",
      "/gazebo-installation/gazebo_assembly-8.jpg",
      "/gazebo-installation/gazebo_assembly-1.jpg",
      "/gazebo-installation/gazebo_assembly-2.jpg",
    ],
    story:
      "From paver patios and stamped concrete to artificial turf and back decks, we know how to mount each structure safely and cleanly. By the end of the day you get a solid, finished gazebo — not a half-done project and a pile of tools.",
  },
  {
    id: "grass-gazebo",
    title: "From DIY Kits to Finished Gazebos",
    summary:
      "A clean, solid structure that are safe in wind and weather, lines up well with the house, and instantly makes the backyard more usable — whether for family dinners, quiet mornings with coffee, or evenings in the hot tub.",
    details: (
      <>
        Mission Viejo, Santa Margarita & nearby OC
        <br />
        1–2 visits
      </>
    ),
    image: "/gazebo-installation/gazebo_assembly-3.jpg",
    galleryImages: [
      "/gazebo-installation/gazebo_assembly-6.jpg",
      "/gazebo-installation/gazebo_assembly-9.jpg",
      "/gazebo-installation/gazebo_assembly-10.jpg",
      "/gazebo-installation/gazebo_assembly-13.jpg",
      "/gazebo-installation/gazebo_assembly-2.jpg",
    ],
    story:
      "We check the condition of your patio or concrete pad, choose the right mounting method and make sure every post is perfectly plumb. Curtains, louvers and doors open smoothly, and the whole structure feels stable and secure. That’s the difference between a rushed install and a gazebo you’ll trust for years.",
  },
  {
    id: "poolside-pergola",
    title: "Create your outdoor oasis",
    summary:
      "Every project in this gallery started with the same goal: make the backyard more usable.",
    details: (
      <>
        Tustin, Santa Ana, Orange & nearby OC
        <br />
        1 day
      </>
    ),
    image: "/gazebo-installation/gazebo_assembly-12.jpg",
    galleryImages: [
      "/gazebo-installation/gazebo_assembly-2.jpg",
      "/gazebo-installation/gazebo_assembly-4.jpg",
      "/gazebo-installation/gazebo_assembly-15.jpg",
      "/gazebo-installation/gazebo_assembly-14.jpg",
      "/gazebo-installation/gazebo_assembly-12.jpg",
    ],
    story:
      "We listen to how you actually use the space — family dinners, parties, quiet mornings, workouts — and place the structure where it makes the most sense. Each surface needs a different approach. We use shims and custom brackets on uneven pavers, heavy-duty anchors on concrete, and proper footings where there is no hard base. The result is the same: a clean, level structure that looks like it was designed together with your house from day one.",
  },
];

export function GazeboInstallationPortfolioGallery() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeItem, setActiveItem] = useState<GazeboGalleryItem | null>(null);

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

  // блокируем скролл body, пока модалка открыта
  useEffect(() => {
    if (activeItem) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeItem]);

  function openModal(item: GazeboGalleryItem) {
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
                Gazebo & pergola projects in real OC yards
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                Scroll sideways to see how we assemble and anchor gazebos on
                pavers, concrete and decks across Orange County.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <button
                type="button"
                className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                Ask for more backyard photos
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
              {GAZEBO_ITEMS.map((item) => (
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
                    <p className="mt-4 text-sm font-medium text-slate-600 md:text-[0.95rem]">
                      {item.details}
                    </p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Модалка проекта */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white">
            {/* Крестик наверху, не скроллится */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-300 hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close project details</span>
            </button>

            {/* Скролл ТОЛЬКО внутри этой области */}
            <div className="max-h-[85vh] overflow-y-auto p-6 pt-12 md:p-8 md:pt-14 scrollbar-thin-dark">
              {/* Заголовок + summary */}
              <div className="pr-2 md:pr-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
                  Project spotlight
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
                  {activeItem.title}
                </h2>
                <p className="mt-2 text-sm md:text-base text-slate-300">
                  {activeItem.details}
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  {activeItem.summary}
                </p>
              </div>

              {/* Галерея проекта */}
              <ImageGallery
                title="Photos from our projects"
                subtitle="A few angles that show how the gazebo looks from the house, patio and yard."
                images={activeItem.galleryImages}
                className="mt-4"
              />

              {/* СНАЧАЛА CTA-БЛОК ПОД КАРТИНКАМИ */}
              <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-6 md:px-7 md:py-7 md:flex md:items-center md:justify-between md:gap-8">
                <div className="max-w-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                    Ready to enjoy more shade?
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                    We’ll assemble and anchor your gazebo so it feels solid and
                    safe.
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Send the model and a few photos of your yard, and we’ll give
                    a clear estimate with a plan for concrete, pavers or deck.
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 md:mt-0 md:min-w-[260px]">
                  <LeadFormModal
                    triggerLabel="Request backyard estimate"
                    service="Gazebo installation"
                    variant="primary"
                  />
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center rounded-full border border-slate-500 px-6 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                  >
                    Call to discuss your yard
                  </a>
                </div>
              </div>

              {/* А ПОТОМ ТЕКСТ-ИСТОРИЯ ПРОЕКТА */}
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
