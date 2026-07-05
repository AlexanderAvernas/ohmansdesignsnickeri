export default {
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Projektnamn",
      type: "string",
    },
    {
      name: "description",
      title: "Beskrivning",
      type: "text",
    },
    {
      name: "mainImage",
      title: "Huvudbild (visas i galleriet)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "images",
      title: "Övriga bilder",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "order",
      title: "Ordning i galleriet (1, 2, 3...)",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Ordning",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};