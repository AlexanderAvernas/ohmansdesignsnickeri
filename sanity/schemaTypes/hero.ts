export default {
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    {
      name: "h1",
      title: "Rubrik (H1)",
      type: "string",
    },
    {
      name: "h2",
      title: "Underrubrik (H2)",
      type: "string",
    },
    {
      name: "paragraph",
      title: "Brödtext",
      type: "text",
    },
    {
      name: "backgroundImage",
      title: "Bakgrundsbild",
      type: "image",
      options: { hotspot: true },
    },
  ],
};