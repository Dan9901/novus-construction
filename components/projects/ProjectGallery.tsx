"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { projectCategoryPlaceholder, type ProjectCategory } from "@/data/projects";

export function ProjectGallery({
  projectName,
  category,
  count,
}: {
  projectName: string;
  category: ProjectCategory;
  count: number;
}) {
  const images = Array.from({ length: count }, (_, index) => ({
    label: `${projectName} — Photo ${index + 1}`,
  }));

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenedIndex = useRef<number | null>(null);
  const placeholderCategory = projectCategoryPlaceholder[category];

  const openAt = (index: number) => {
    lastOpenedIndex.current = index;
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    setActiveIndex(null);
    const openedIndex = lastOpenedIndex.current;
    if (openedIndex !== null) {
      thumbnailRefs.current[openedIndex]?.focus();
    }
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.label}
            ref={(el) => {
              thumbnailRefs.current[index] = el;
            }}
            type="button"
            onClick={() => openAt(index)}
            className="group text-left"
            aria-label={`Open photo ${index + 1} of ${images.length}`}
          >
            <PlaceholderImage
              label={`Photo ${index + 1}`}
              category={placeholderCategory}
              ratio="aspect-square"
              index={index}
              className="transition-opacity duration-300 group-hover:opacity-85"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} photo gallery`}
          className="fixed inset-0 z-[60] flex flex-col bg-foreground/97 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-sm font-medium text-background/70">
              {activeIndex + 1} / {images.length}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center border border-background/25 text-background transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-16">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-background/25 text-background transition-colors hover:border-accent hover:text-accent sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <div className="w-full max-w-3xl">
              <PlaceholderImage
                label={images[activeIndex].label}
                category={placeholderCategory}
                ratio="aspect-[4/3]"
                index={activeIndex}
                className="w-full"
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-background/25 text-background transition-colors hover:border-accent hover:text-accent sm:right-6"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
