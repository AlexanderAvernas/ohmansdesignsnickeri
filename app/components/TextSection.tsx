import { client, TextSectionItem } from "@/lib/sanity";

const FALLBACK: TextSectionItem[] = [
  {
    _key: "1",
    heading: "Platsbyggda möbler",
    body: "Designar och tillverkar garderober, bokhyllor och förvaringslösningar som passar precis din miljö. Varje detalj är genomtänkt och anpassad efter dina önskemål.",
  },
  {
    _key: "2",
    heading: "Finsnickerier",
    body: "Med många års erfarenhet levererar jag finsnickeri av högsta klass. Vi använder enbart material av bästa kvalitet – massivt trä, fanér och handmålad finish.",
  },
  {
    _key: "3",
    heading: "Från skiss till färdigt",
    body: "Jag följer ditt projekt hela vägen – från första mötet och skisser till montering och slutresultat.",
  },
];

async function getTextSections(): Promise<TextSectionItem[] | null> {
  try {
    const data = await client.fetch<TextSectionItem[]>(
      `*[_type == "textSection"] | order(order asc) { _key, heading, body }`
    );
    return data?.length ? data : null;
  } catch {
    return null;
  }
}

export default async function TextSection() {
  const items = (await getTextSections()) ?? FALLBACK;

  return (
    <section id="tjanster" className="bg-stone-950 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Sektion-rubrik */}
        <div className="mb-16 md:mb-20">
          <p className="text-stone-500 text-xs tracking-[0.35em] uppercase mb-3">
            Vad vi erbjuder
          </p>
          <div className="w-12 h-px bg-stone-700" />
        </div>

        {/* Tre kolumner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {items.map((item, i) => (
            <div key={item._key} className="group">
              {/* Nummer */}
              <span className="text-stone-700 font-serif text-5xl leading-none block mb-6 group-hover:text-stone-600 transition-colors duration-500">
                0{i + 1}
              </span>
              <h3 className="text-stone-100 font-serif text-xl md:text-2xl mb-4">
                {item.heading}
              </h3>
              <div className="w-8 h-px bg-stone-700 mb-5 group-hover:w-16 group-hover:bg-stone-500 transition-all duration-500" />
              <p className="text-stone-400 text-base leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}