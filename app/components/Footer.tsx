export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="kontakt" className="bg-stone-950 border-t border-stone-800">
      {/* Kontakt-band */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Varumärke */}
          <div>
            <div className="mb-6">
              <span className="text-stone-100 font-serif text-2xl tracking-widest uppercase block">
                Öhmans
              </span>
              <span className="text-stone-500 text-xs tracking-[0.3em] uppercase">
                Design & Snickeri
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              Platsbyggda möbler och skräddarsydda inredningslösningar med känsla
              för detaljer.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-stone-400 text-xs tracking-[0.3em] uppercase mb-6">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+46000000000"
                  className="text-stone-300 hover:text-stone-100 text-sm transition-colors duration-300"
                >
                  000 – 000 00 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ohmansdesignsnickeri.se"
                  className="text-stone-300 hover:text-stone-100 text-sm transition-colors duration-300"
                >
                  info@ohmansdesignsnickeri.se
                </a>
              </li>
              <li className="text-stone-500 text-sm pt-2">
                Mån–Fre: 08:00 – 17:00
              </li>
            </ul>
          </div>

          {/* Snabblänkar */}
          <div>
            <h3 className="text-stone-400 text-xs tracking-[0.3em] uppercase mb-6">
              Navigering
            </h3>
            <ul className="space-y-3">
              {["Om mig", "Tjanster", "Galleri", "Kontakt"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-stone-500 hover:text-stone-300 text-sm transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Nedre balk */}
      <div className="border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-700 text-xs tracking-wider">
            © {currentYear} Öhmans Design & Snickeri. Alla rättigheter
            förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}