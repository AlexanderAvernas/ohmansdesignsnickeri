import { client, urlFor } from "../../lib/sanity";
import GalleryClient, { GalleryProject } from "./GalleryClient";

const FALLBACK_PROJECTS: GalleryProject[] = [
  {
    id: "1",
    title: "Altanräcke",
    description:
      "Glaset är infräst och ligger i ett spår, väldigt cleant utseende . Säkerhets glas så klart",
    mainImage:
      "/Projekt1.png",
    images: [
      "/Projekt1.2.png",
      "/Projekt1.3.png",
      "/Projekt1.4.png",
    ],
  },
  {
    id: "2",
    title: "Platsbyggd Garderob",
    description:
"Optimal förvaring. Fantastiskt låddjup 750mm blums längsta helutdrags gejder. Numrerat knivskuret ekfaner. Pigmenterad osmo snö.",
    mainImage:
      "/Projekt2.png",
    images: [
      "/Projekt2.2.png",
      "/Projekt2.3.png",
      "/Projekt2.4.png",
    ],
  },
  {
    id: "3",
    title: "Förvaring",
    description:
      "Platsbyggd förvaring under trapp",
    mainImage:
      "/Projekt3.png",
    images: [
      "/Projekt3.2.png",
      "/Projekt3.3.png",
    ],
  },
  {
    id: "4",
    title: "Fondvägg",
    description:
      "Den är så fin denna fondvägg. Fanerad mdf i botten och sedan massiva eklister som sitter med 16mm mellanrum. Härlig struktur och utseende då 6st storlekar blandas hela tiden.",
    mainImage:
      "/Projekt4.png",
    images: [
      "/Projekt4.2.png",
      "/Projekt4.3.png",
    ],
  },
  {
    id: "5",
    title: "Pardörrar",
    description:
      "Dubbla nytillverkade k-märkta pardörrar. Mycket krav på materialet så klart.",
    mainImage:
      "/Projekt5.png",
    images: [
      "/Projekt5.2.png",
      "/Projekt5.3.png",
    ],
  },
  {
    id: "6",
    title: "Trappa och förvaring",
    description:
      "En enbalkstrappa samt förvaring /sittbänkar och räcke. En vacker lösning då rymden i rummet är extra viktig.",
    mainImage:
      "/Projekt6.png",
    images: [
      "/Projekt6.2.png",
      "/Projekt6.3.png",
    ],
  },
];

type SanityProject = {
  _id: string;
  title: string;
  description: string;
  mainImage: { asset: { _ref: string; _type: "reference" }; _type: "image" };
  images: { asset: { _ref: string; _type: "reference" }; _type: "image" }[];
};

async function getProjects(): Promise<GalleryProject[] | null> {
  try {
    const data = await client.fetch<SanityProject[]>(
      `*[_type == "project"] | order(order asc) {
        _id, title, description, mainImage, images[]
      }`
    );
    if (!data?.length) return null;
    return data.map((p) => ({
      id: p._id,
      title: p.title ?? "",
      description: p.description ?? "",
      mainImage: p.mainImage?.asset?._ref
        ? urlFor(p.mainImage).width(800).url()
        : FALLBACK_PROJECTS[0].mainImage,
      images: (p.images ?? [])
        .filter((img) => img?.asset?._ref)
        .map((img) => urlFor(img).width(1200).url()),
    }));
  } catch {
    return null;
  }
}

export default async function Gallery() {
  const projects = (await getProjects()) ?? FALLBACK_PROJECTS;
  return <GalleryClient projects={projects} />;
}