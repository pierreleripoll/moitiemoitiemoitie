import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    spectacles: defineCollection({
      source: "spectacles/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        year: z.string(),
        color: z.string(),
        navigation: z.object({
          order: z.number(),
        }),
        images: z.array(
          z.object({
            src: z.string(),
            caption: z.string(),
            width: z.number(),
            height: z.number(),
          })
        ),
        dates: z
          .array(
            z.object({
              theatre_text: z.string(),
              date_text: z.string(),
              dates_url: z.string(),
              ticket_url: z.string(),
              date_start: z.string(),
              date_end: z.string(),
            })
          )
          .optional(),
      }),
    }),
    collectif: defineCollection({
      source: "collectif.md", // if there's only one file; if multiple, use "collectif/*.md" instead
      type: "page",
      schema: z.object({
        title: z.string(),
        images: z.array(
          z.object({
            src: z.string(),
            caption: z.string(),
            width: z.number(),
            height: z.number(),
          })
        ),
        people: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
          })
        ),
      }),
    }),
    contact: defineCollection({
      source: "contact.md", // if there's only one file; if multiple, use "collectif/*.md" instead
      type: "page",
      schema: z.object({
        title: z.string(),
        images: z.array(
          z.object({
            src: z.string(),
            caption: z.string(),
            width: z.number(),
            height: z.number(),
          })
        ),
      }),
    }),
  },
});
