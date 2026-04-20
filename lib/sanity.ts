// src/lib/sanity.ts
// Byt ut projectId och dataset när du sätter upp Sanity

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Typer för Sanity-data
export type SanityImageSource = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type HeroData = {
  h1: string;
  h2: string;
  paragraph: string;
  backgroundImage: SanityImageSource;
};

export type TextSectionItem = {
  _key: string;
  heading: string;
  body: string;
};

export type AboutData = {
  heading: string;
  paragraph1: string;
  paragraph2: string;
};

export type GalleryData = {
  mainImage: SanityImageSource;
  images: SanityImageSource[];
};

export type SiteSettings = {
  logo: string;
  phone: string;
  email: string;
};