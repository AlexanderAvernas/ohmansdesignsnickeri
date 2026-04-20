"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#om-oss", label: "Om mig" },
    { href: "#tjanster", label: "Tjänster" },
    { href: "#galleri", label: "Galleri" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-stone-950/95 backdrop-blur-sm py-4 border-b border-stone-800"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-stone-100 font-serif text-xl tracking-widest uppercase">
            Öhmans
          </span>
          <span className="text-stone-400 text-xs tracking-[0.3em] uppercase mt-0.5">
            Design & Snickeri
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-stone-400 hover:text-stone-100 text-sm tracking-[0.15em] uppercase transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="text-xs tracking-[0.2em] uppercase border border-stone-600 text-stone-300 hover:bg-stone-100 hover:text-stone-950 px-5 py-2.5 transition-all duration-300"
          >
            Offert
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Öppna meny"
        >
          <span
            className={`block w-6 h-px bg-stone-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-stone-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-stone-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-stone-950 border-t border-stone-800 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-stone-300 text-sm tracking-[0.2em] uppercase"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}