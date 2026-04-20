import { client, urlFor, HeroData, SanityImageSource } from "@/lib/sanity";
import Image from "next/image";

// Fallback-data om Sanity inte är konfigurerat
const FALLBACK: HeroData = {
  h1: "Öhmans Design & Snickeri",
  h2: "Hantverk med känsla för detaljer",
  paragraph:
    "Platsbyggda möbler och skräddarsydda inredningslösningar – från första skiss till färdigt resultat.",
  backgroundImage: {
    _type: "image",
    asset: { _ref: "", _type: "reference" },
  },
};

const FALLBACK_BG = "/HeroOhmanssnickeri.jpg"; // Lägg en bild här eller använd Unsplash-URL nedan
const FALLBACK_BG_URL =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80";

async function getHeroData(): Promise<HeroData | null> {
  try {
    const data = await client.fetch<HeroData>(
      `*[_type == "hero"][0]{ h1, h2, paragraph, backgroundImage }`
    );
    return data;
  } catch {
    return null;
  }
}

export default async function Hero() {
  const data = (await getHeroData()) ?? FALLBACK;

  let bgUrl = FALLBACK_BG;
  try {
    if (data.backgroundImage?.asset?._ref) {
      bgUrl = urlFor(data.backgroundImage as SanityImageSource)
        .width(1800)
        .url();
    }
  } catch {
    // Använd fallback
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Bakgrundsbild */}
      <div className="absolute inset-0">
        <Image
          src={bgUrl}
          alt="Öhmans Design & Snickeri"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/10" />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
        <div className="max-w-3xl">
          {/* <p className="text-stone-400 text-xs tracking-[0.35em] uppercase mb-6">
            Hantverk sedan generationer
          </p> */}
          <h1 className="text-stone-100 font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            {data.h1}
          </h1>
          <h2 className="text-stone-300 font-serif text-xl md:text-2xl font-light mb-6 leading-relaxed">
            {data.h2}
          </h2>
          <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-xl mb-10">
            {data.paragraph}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-block bg-stone-100 text-stone-950 text-sm tracking-[0.2em] uppercase px-8 py-4 hover:bg-white transition-colors duration-300"
            >
              Begär offert
            </a>
            <a
              href="#galleri"
              className="inline-block border border-stone-600 text-stone-300 text-sm tracking-[0.2em] uppercase px-8 py-4 hover:border-stone-300 transition-colors duration-300"
            >
              Se galleri
            </a>
          </div>
        </div>
      </div>

      {/* Scroll-indikator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
        <span className="text-stone-500 text-xs tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-stone-500 to-transparent" />
      </div>
    </section>
  );
}