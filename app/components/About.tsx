import { client, AboutData } from "@/lib/sanity";

const FALLBACK: AboutData = {
  heading: "Om Öhmans Design & Snickeri",
  paragraph1:
    "Jag heter Mathias Öhman och driver Öhmans Design & Snickeri med starkt fokus på kvalitet och hantverk. Med många års erfarenhet inom finsnickeri har jag utvecklat en djup förståelse för material, form och funktion. Min verkstad är kärnan i mitt arbete – här väljer jag varje träslag med omsorg och utför varje moment med precision. Jag lägger stor vikt vid detaljer och arbetar med ett genuint hantverkskunnande i varje projekt.",
  paragraph2:
    "Jag strävar efter att skapa design som är funktionell, hållbar och tidlös. För mig handlar det om att aldrig kompromissa med vare sig material eller utförande. Resultatet är möbler och inredningar som inte bara fyller ett rum, utan bidrar till en genomtänkt och harmonisk helhet.",
};

async function getAboutData(): Promise<AboutData | null> {
  try {
    const data = await client.fetch<AboutData>(
      `*[_type == "about"][0]{ heading, paragraph1, paragraph2 }`,
    );
    return data;
  } catch {
    return null;
  }
}

export default async function About() {
  const data = (await getAboutData()) ?? FALLBACK;

  return (
    <section id="om-oss" className="bg-stone-900 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Vänster: dekorativ linje + sektion-label */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-px h-full bg-gradient-to-b from-stone-700 via-stone-600 to-transparent hidden lg:block" />
            <p className="text-stone-500 text-xs tracking-[0.35em] uppercase mb-8">
              Om mig
            </p>
            <h1 className="text-stone-100 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              {data.heading}
            </h1>

            {/* Dekorativ element */}
            <div className="mt-10 flex items-center gap-4">
              <div className="w-16 h-px bg-stone-600" />
              <span className="text-stone-500 text-xs tracking-[0.3em] uppercase">
                Sedan 2010
              </span>
            </div>
          </div>

          {/* Höger: brödtexter */}
          <div className="flex flex-col gap-6">
            <p className="text-stone-300 text-base md:text-lg leading-relaxed">
              {data.paragraph1}
            </p>
            <p className="text-stone-400 text-base leading-relaxed">
              {data.paragraph2}
            </p>
            <div className="pt-4">
              <a
                href="#kontakt"
                className="inline-block border border-stone-600 text-stone-300 text-sm tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-stone-100 hover:text-stone-950 hover:border-stone-100 transition-all duration-300"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
