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
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);
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
              Projekt
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
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Titel */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-200">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeProject && (
        <div className="fixed inset-0 z-[100] bg-stone-950/98 flex flex-col">
          {/* Toprad */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800 shrink-0">
            <div>
              <h3 className="text-stone-100 font-serif text-lg md:text-xl">
                {activeProject.title}
              </h3>
              <p className="text-stone-500 text-xs tracking-[0.25em] uppercase mt-0.5">
                {currentIndex + 1} / {allImages.length}
              </p>
            </div>
            <button
              onClick={close}
              className="text-stone-500 hover:text-stone-100 transition-colors p-2"
              aria-label="Stäng"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Bildyta + text (scrollbar om litet skärm) */}
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Vänster: bild + pilar */}
            <div className="relative flex-1 flex items-center justify-center bg-stone-950 min-h-0">
              <div className="relative w-full h-full max-w-4xl mx-auto px-14 py-6">
                <Image
                  src={allImages[currentIndex]}
                  alt={`${activeProject.title} – bild ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>

              {/* Pil vänster */}
              {allImages.length > 1 && (
                <button
                  onClick={prev}
                  className="absolute left-3 text-stone-500 hover:text-stone-100 transition-colors p-2"
                  aria-label="Föregående"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}

              {/* Pil höger */}
              {allImages.length > 1 && (
                <button
                  onClick={next}
                  className="absolute right-3 text-stone-500 hover:text-stone-100 transition-colors p-2"
                  aria-label="Nästa"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>

            {/* Höger panel: beskrivning + thumbnails */}
            <div className="lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col shrink-0">
              {/* Beskrivning */}
              <div className="p-6 border-b border-stone-800">
                <p className="text-stone-400 text-sm leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Thumbnails */}
              <div className="p-4 flex-1 overflow-y-auto">
                <p className="text-stone-600 text-xs tracking-[0.25em] uppercase mb-3">
                  Alla bilder
                </p>
                <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`relative aspect-square overflow-hidden transition-all duration-200 ${
                        i === currentIndex
                          ? "ring-1 ring-stone-300 opacity-100"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Bild ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 border-t border-stone-800">
                <a
                  href="#kontakt"
                  onClick={close}
                  className="block text-center border border-stone-600 text-stone-300 text-xs tracking-[0.2em] uppercase py-3 hover:bg-stone-100 hover:text-stone-950 hover:border-stone-100 transition-all duration-300"
                >
                  Liknande projekt?
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}