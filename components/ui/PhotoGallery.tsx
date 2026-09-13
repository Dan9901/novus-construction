"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Photo } from "@/data/photos";

export function PhotoGallery({ title, photos }: { title: string; photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenedIndex = useRef<number | null>(null);

  const openAt = (index: number) => {
    lastOpenedIndex.current = index;
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    setActiveIndex(null);
    const openedIndex = lastOpenedIndex.current;
    if (openedIndex !== null) thumbnailRefs.current[openedIndex]?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % photos.length));
  }, [photos.length]);

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

  const active = activeIndex === null ? null : photos[activeIndex];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            ref={(el) => {
              thumbnailRefs.current[index] = el;
            }}
            type="button"
            onClick={() => openAt(index)}
            className="group overflow-hidden text-left"
            aria-label={`Open photo ${index + 1} of ${photos.length}: ${photo.alt}`}
          >
            <PlaceholderImage
              label={photo.alt}
              ratio="aspect-square"
              src={photo.src}
              sizes="(max-width: 640px) 50vw, 33vw"
              className="transition-opacity duration-300 group-hover:opacity-90"
            />
          </button>
        ))}
      </div>

      {active !== null && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          className="fixed inset-0 z-[60] flex flex-col bg-foreground/97 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-sm font-medium text-background/70">
              {activeIndex + 1} / {photos.length}
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

          <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-background/25 bg-foreground/60 text-background transition-colors hover:border-accent hover:text-accent sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            {/* Contained, not cropped: most interior shots here are portrait. */}
            <PlaceholderImage
              key={active.src}
              label={active.alt}
              ratio="h-[68vh] w-full max-w-5xl"
              src={active.src}
              fit="contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="bg-transparent"
            />

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-background/25 bg-foreground/60 text-background transition-colors hover:border-accent hover:text-accent sm:right-6"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <p className="px-6 pb-7 pt-4 text-center text-sm text-background/75">{active.alt}</p>
        </div>
      ) : null}
    </div>
  );
}
