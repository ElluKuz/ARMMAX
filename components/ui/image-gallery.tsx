// components/ui/image-gallery.tsx
"use client";

import { cn } from "@/lib/utils";

export interface ImageGalleryProps {
  title?: string;
  subtitle?: string;
  images: string[];
  className?: string;
}

export function ImageGallery({
  title = "Project photos",
  subtitle = "A few angles from this backyard gazebo project.",
  images,
  className,
}: ImageGalleryProps) {
  return (
    <section
      className={cn(
        "w-full flex flex-col items-center justify-start py-8 md:py-10",
        className,
      )}
    >
      <div className="max-w-3xl text-center px-4">
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
        {subtitle && (
          <p className="text-sm text-slate-400 mt-2 md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {/* Галерея снизу — как в исходном примере */}
      <div className="flex items-center gap-2 h-[320px] md:h-[380px] w-full max-w-5xl mt-8 px-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative group flex-grow transition-all w-40 md:w-56 rounded-lg overflow-hidden h-full duration-500 hover:w-full"
          >
            <img
              className="h-full w-full object-cover object-center"
              src={src}
              alt={`project-image-${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// чтобы при желании можно было импортировать по default
export default ImageGallery;
