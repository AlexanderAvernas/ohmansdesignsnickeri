"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type GalleryProject = {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  images: string[];
};

type Props = {
  projects: GalleryProject[];
};

export default function GalleryClient({ projects }: Props) {
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = activeProject
    ? [activeProject.mainImage, ...activeProject.images]
    : [];

  const openProject = (project: GalleryProject) => {
    setActiveProject(project);
    setCurrentIndex(0);
  };

  const close = () => {
    setActiveProject(null);
    setCurrentIndex(0);
  };

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeProject, prev, next]);

  return (
    <section id="galleri" className="bg-stone-950 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-stone-500 text-xs tracking-[0.35em] uppercase mb-3">
            Mitt arbete
          </p>
          <div className="flex items-end justify-between">
            <h2 className="text-stone-100 font-serif text-3xl md:text-4xl">
              Galleri
            </h2>
            <span className="text-stone-600 text-sm tracking-wider hidden sm:block">
              Klicka för att utforska
            </span>
          </div>
          <div className="w-12 h-px bg-stone-700 mt-4" />
        </div>

        {/* Projektgrid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => openProject(project)}
              className="group relative aspect-[4/3] overflow-hidden text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400"
            >
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              {/* Titel */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-400">
                <p className="text-stone-300 text-xs tracking-[0.25em] uppercase mb-1">
                  {project.images.length + 1} bilder
                </p>
                <h3 className="text-stone-100 font-serif text-lg leading-snug">
                  {project.title}
                </h3>
              </div>
              {/* Liten ikon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 border border-stone-300/60 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-stone-200"
                  >
                    <path
                      d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeProject && (
        <div className="fixed inset-0 z-[100] bg-stone-950 flex flex-col">
          {/* Stäng-knapp uppe till höger */}
          <button
            onClick={close}
            className="absolute top-5 right-5 z-20 text-stone-400 hover:text-stone-100 transition-colors p-2"
            aria-label="Stäng"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          {/* Huvudbild – tar upp hela skärmen */}
          <div className="relative flex-1 min-h-0">
            <Image
              src={allImages[currentIndex]}
              alt={`${activeProject.title} – bild ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* Gradient i botten för text-läsbarhet */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none" />

            {/* Titel + beskrivning över gradienten */}
            <div className="absolute bottom-28 left-6 right-6 md:left-12 md:right-12 max-w-2xl">
              <h3 className="text-stone-100 font-serif text-xl md:text-2xl mb-2">
                {activeProject.title}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                {activeProject.description}
              </p>
            </div>

            {/* Pil vänster */}
            {allImages.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-100 transition-colors p-3 bg-stone-950/40 hover:bg-stone-950/70"
                aria-label="Föregående"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            {/* Pil höger */}
            {allImages.length > 1 && (
              <button
                onClick={next}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-100 transition-colors p-3 bg-stone-950/40 hover:bg-stone-950/70"
                aria-label="Nästa"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Nedre rad: thumbnails + räknare + Tillbaka */}
          <div className="shrink-0 bg-stone-950 border-t border-stone-800 px-6 py-4 flex items-center gap-4">
            {/* Räknare */}
            <span className="text-stone-500 text-xs tracking-[0.25em] uppercase shrink-0">
              {currentIndex + 1} / {allImages.length}
            </span>

            {/* Thumbnails – horisontell scroll */}
            <div
              className="flex gap-2 overflow-x-auto flex-1"
              style={{ scrollbarWidth: "none" }}
            >
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`relative aspect-square w-14 shrink-0 overflow-hidden transition-all duration-200 ${
                    i === currentIndex
                      ? "ring-1 ring-stone-300 opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Bild ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>

            {/* Tillbaka-knapp */}
            <button
              onClick={close}
              className="shrink-0 flex items-center gap-2 border border-stone-600 text-stone-300 text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-stone-100 hover:text-stone-950 hover:border-stone-100 transition-all duration-300"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M19 12H5M12 5l-7 7 7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Tillbaka
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
