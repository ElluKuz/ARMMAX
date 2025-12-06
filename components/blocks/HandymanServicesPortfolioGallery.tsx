// components/blocks/HandymanServicesPortfolioGallery.tsx
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

interface TvArtGalleryItem {
  id: string;
  title: string;
  summary: string;
  details: React.ReactNode;
  image: string;
  galleryImages: string[];
  story: string;
}

const TV_ART_ITEMS: TvArtGalleryItem[] = [
  {
    id: "living-room-tv",
    title: "Living room TV Mounting",
    summary:
      "Professional TV mounting on drywall, brick or concrete. Laser-level alignment and stud finding on every job. Every TV is installed with a laser level and proper anchors, so your screen is perfectly straight, secure and at the right height for comfortable viewing.",
    details: (
      <>
        Irvine, Lake Forest, Tustin, Orange & nearby OC
        <br />
        1–3 hours · single TV with soundbar
      </>
    ),
    image:
      "tvartmount/tv-mounting-art-hanging-in-OC-county-4.jpg",
    galleryImages: [
      "tvartmount/tv-mounting-art-hanging-in-OC-county-13.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-14.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-15.jpg",
    ],
    story:
      "",
  },
  {
    id: "gallery-wall",
    title: "Professional Art Hanging with Laser Precision",
    summary:
      "Our art mounting service turns a blank wall into a finished space. We hang paintings, framed photos and posters with laser-level accuracy, so every piece is straight, evenly spaced and correctly centered.",
    details: (
      <>
        Costa Mesa, Newport Beach & nearby OC
        <br />
        3–5 hours · layout + installation for gallery wall
      </>
    ),
    image:
      "tvartmount/tv-mounting-art-hanging-in-OC-county-1.jpg",
    galleryImages: [
      "tvartmount/tv-mounting-art-hanging-in-OC-county-9.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-8.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-7.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-6.jpg",
    ],
    story:
      "We started by placing frames on the floor, checked spacing with the client and only then transferred the layout to the wall. This way every frame has a clear place, the TV is at the right height and the whole composition looks intentional instead of random nails everywhere.",
  },
  {
    id: "bedroom-tv",
    title: "Large-Scale Art Installation in High-Ceiling Spaces",
    summary:
      "Heavy mirrors, canvases and decorative pieces need more than one nail in the wall. Our wall art installation service focuses on safety and accuracy, especially for larger or heavier items.",
    details: (
      <>
        Tustin, Irvine, Anaheim Hills, Orange & nearby OC
        <br />
        2–4 hours · heavy art & mirrors over furniture
      </>
    ),
    image:
      "tvartmount/tv-mounting-art-hanging-in-OC-county-11.jpg",
    galleryImages: [
      "tvartmount/tv-mounting-art-hanging-in-OC-county-2.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-3.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-5.jpg",
      "tvartmount/tv-mounting-art-hanging-in-OC-county-1.jpg",
    ],
    story:
      "Correct anchors for weight and wall type (drywall, brick, concrete). Precise centering over sofas, beds and consoles. Neat, minimal number of holes in the wall",
  },
  
];

export function HandymanServicesPortfolioGallery() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeItem, setActiveItem] = useState<TvArtGalleryItem | null>(null);

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

  // блокируем скролл body на время модалки
  useEffect(() => {
    if (activeItem) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeItem]);

  function openModal(item: TvArtGalleryItem) {
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
                TV & art mounting projects in real OC homes
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                Scroll sideways to see how we mount TVs, soundbars and artwork
                in living rooms, bedrooms and rentals across Orange County.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <button
                type="button"
                className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                Ask for more TV & art photos
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
              {TV_ART_ITEMS.map((item) => (
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

      {/* Модалка проекта, как у gazebo */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white">
            {/* Крестик фиксированный */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-300 hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close project details</span>
            </button>

            {/* Скролл внутри модалки */}
            <div className="max-h-[85vh] overflow-y-auto p-6 pt-12 md:p-8 md:pt-14 scrollbar-thin-dark">
              {/* Заголовок + краткое описание */}
              <div className="pr-2 md:pr-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
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

              {/* Галерея фоток */}
              <ImageGallery
                title=""
                subtitle=""
                images={activeItem.galleryImages}
                className="mt-4"
              />

              {/* CTA под галереей — уже под TV тематику */}
              <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-6 md:px-7 md:py-7 md:flex md:items-center md:justify-between md:gap-8">
                <div className="max-w-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                    Ready to finish your TV wall?
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                    We’ll mount TVs, soundbars and artwork in one clean visit.
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Send TV sizes, wall types and a few photos, and we’ll plan
                    safe mounting and clean layouts for your space.
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 md:mt-0 md:min-w-[260px]">
                  <LeadFormModal
                    triggerLabel="Send TV & art list"
                    service="TV mounting & Art hanging"
                    variant="primary"
                  />
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center rounded-full border border-slate-500 px-6 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                  >
                    Call to discuss setup
                  </a>
                </div>
              </div>

              {/* История проекта */}
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
