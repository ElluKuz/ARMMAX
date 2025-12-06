// components/blocks/FurnitureAssemblyPortfolioGallery.tsx
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

interface AssemblyGalleryItem {
  id: string;
  title: string;
  summary: string;
  details: React.ReactNode;
  image: string;
  galleryImages: string[];
  story: string;
}

const ASSEMBLY_ITEMS: AssemblyGalleryItem[] = [
  {
    id: "bedroom-set",
    title: "Living Space & Bedroom Assembly",
    summary:
      "TV cabinets, wall units, beds and storage pieces are built securely and leveled so they function smoothly and look cohesive in your space.",
    details: (
      <>
        Irvine, Lake Forest, Mission Viejo, Anaheim & nearby OC
        <br />
        1–5 hours · IKEA & Amazon mix
      </>
    ),
    image:
      "furnitureassembly/SofaAssembly.jpg",
    galleryImages: [
      "furnitureassembly/SofaAssembly.jpg",
      "furnitureassembly/Foldablebedassembly2.jpg",
      "furnitureassembly/ClosetAssembly2.jpg",
      "furnitureassembly/cabinetsassembly3.jpg",
      "furnitureassembly/StorageAndKitchenCabinetsAssembly2.jpg",
      "furnitureassembly/StorageLivingRoomCabinetsAssembly3.jpg",
    ],
    story:
      "We assemble furniture ranging from entertainment centers to bed frames with precise hardware installation and accurate leveling. The final look is polished, stable and ready for everyday use.",
  },
  {
    id: "living-room",
    title: "Kitchen Cabinet Assembly & Precise Hanging",
    summary:
      "We assemble and mount kitchen cabinets with a focus on durability and accuracy. Seamless, Strong and Professionally",
    details: (
      <>
        Costa Mesa, Newport Beach, Santa Ana & nearby OC
        <br />
        6–10 hours · typical kitchen or main cabinet wall
      </>
    ),
    image:
      "furnitureassembly/EuropeanKitchenCabinetsAssembly.jpg",
    galleryImages: [
      "furnitureassembly/cabinetsassembly.jpg",
      "furnitureassembly/KitchenCabinetsAssembly1.jpg",
      "furnitureassembly/EuropeanKitchenCabinetsAssembly1.jpg",
      "furnitureassembly/EuStorageAndKitchenCabinetsAssembly.jpg",
      
    ],
    story:
      "Kitchen cabinets carry real weight — dishes, cookware, appliances — so proper installation is critical. We level each base cabinet with a laser to ensure a perfect fit for your countertops, and we hang wall units using reinforced anchors designed to hold heavy loads. Every cabinet line is straight, even and structurally secure for years of daily use. Wall cabinets are hung using correct fasteners and into solid structure, while base cabinets are aligned to a flawless plane for countertop placement.",
  },
  {
    id: "kids-room",
    title: "Kids room bunk bed & storage",
    summary:
      "From cribs and bunk beds to storage units and playsets, we assemble kids’ furniture with extra care.",
    details: (
      <>
        Tustin, Irvine, Orange, Anaheim & nearby OC
        <br />
        2–4 hours tipically
      </>
    ),
    image:
      "furnitureassembly/KidsRoomAsembly.jpg",
    galleryImages: [
      "furnitureassembly/KidsRoomAsembly.jpg",
      "furnitureassembly/KidsFoldablebedassembly.jpg",
      "furnitureassembly/KidsOutdoorPlaygroundAssembly.png",
    ],
    story:
      "Every piece is stabilized, tightened and checked for wobble so it can handle everyday use. The result is a room that feels both cozy and reliably built.",
  },
  {
    id: "home-office",
    title: "Professional Vanity & Bathroom Storage Setup",
    summary:
      "We install vanities and cabinets with careful attention to symmetry, alignment and moisture-safe fastening.",
    details:(
      <>
        Newport Beach, Huntington Beach & nearby OC
        <br />
        3–6 hours · vanity + tall cabinet storage
      </>
    ),
    image:
      "furnitureassembly/bathroomcabinetsassembly.jpg",
    galleryImages: [
      "furnitureassembly/Bathroomcabinetsassembly.jpg",
      "furnitureassembly/Bathroomcabinetsassembly2.jpg",
      "furnitureassembly/Bathroomcabinetsassembly4.jpg",
      "furnitureassembly/Bathroomcabinetsassembly3.jpg",


    ],
    story:
      "We assemble bathroom cabinets with precise leveling and secure mounting, so every drawer and door opens smoothly. Hardware is tightened correctly, gaps are even, and the entire unit sits perfectly aligned with plumbing and existing tile lines. The result is a clean, neat finish that looks built-in from day one.",
  },
  {
    id: "entry-storage",
    title: "Outdoor Furniture, Playsets & Shed Assembly",
    summary:
      "From children’s play structures to patio furniture and storage sheds, we assemble outdoor items with durability in mind.",
    details: (
      <>
        Lake Forest, Irvine, Aliso Viejo, Laguna Niguel & nearby OC
        <br />
        4–8 hours · sheds, swing sets & patio sets
      </>
    ),
    image:
      "furnitureassembly/OutdoorKidsPlayground.jpg",
    galleryImages: [
      "furnitureassembly/ShedassemblyOutdoorfurniture.jpg",
      "furnitureassembly/OutdoorKidsPlaygrondAssembly.jpg",
      "furnitureassembly/OutdoorKidsPlaygrondAssembly2.jpg",
      "furnitureassembly/outdoorkidsspace.jpg",
      "furnitureassembly/KidsOutdoorPlaygroundAssembly.png",
      
    ],
    story:
      "Each unit is anchored or leveled correctly to stay steady on pavers, grass or concrete. The result is a reliable outdoor setup that holds up season after season.",
  },
  {
    id: "entry-storage",
    title: "Office Desk & Workstation Assembly Service",
    summary:
      "Our office desk assembly service handles both single tables and large batches for new workspaces.",
    details:(
      <>
        Irvine, Santa Ana, Anaheim, Orange & nearby OC
        <br />
        1–6 hours · home offices & small teams
      </>
    ),
    image:
      "furnitureassembly/OfficeTablesAssembly.jpg",
    galleryImages: [
      "furnitureassembly/WorkingtableAndCabinetsAssemblyIrvine.jpg",
      "furnitureassembly/OfficeTablesAssembly.jpg",
    ],
    story:
      "Every workstation is built securely, aligned evenly and tested for stability so you can start working without delay. Perfect for home offices, studios or teams needing multiple desks installed at once.",
  },
];

export function FurnitureAssemblyPortfolioGallery() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeItem, setActiveItem] = useState<AssemblyGalleryItem | null>(null);

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

  function openModal(item: AssemblyGalleryItem) {
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
                Furniture assembly projects in real OC homes
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                Scroll sideways to see how we set up bedrooms, living rooms, kids
                rooms and home offices for our clients.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <button
                type="button"
                className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                Ask for more examples
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
              {ASSEMBLY_ITEMS.map((item) => (
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

              <ImageGallery
                title=""
                subtitle=""
                images={activeItem.galleryImages}
                className="mt-4"
              />

              <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-6 md:px-7 md:py-7 md:flex md:items-center md:justify-between md:gap-8">
                <div className="max-w-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                    Ready to set up your home?
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                    We’ll assemble beds, sofas, storage and kids rooms in one visit.
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Send links or photos of your furniture and we’ll give a clear
                    estimate and schedule a visit that fits your week.
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 md:mt-0 md:min-w-[260px]">
                  <LeadFormModal
                    triggerLabel="Request assembly estimate"
                    service="Furniture assembly"
                    variant="primary"
                  />
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center rounded-full border border-slate-500 px-6 py-2.5 text-sm font-semibold text-slate-50 hover:bg-slate-800"
                  >
                    Call to discuss your list
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
