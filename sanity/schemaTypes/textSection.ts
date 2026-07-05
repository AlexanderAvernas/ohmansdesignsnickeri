export default {
  name: "textSection",
  title: "Tjänster",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Rubrik",
      type: "string",
    },
    {
      name: "body",
      title: "Text",
      type: "text",
    },
    {
      name: "order",
      title: "Ordning (1, 2, 3...)",
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