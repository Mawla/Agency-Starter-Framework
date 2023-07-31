import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { MessagingLines } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block11",
  title: "Grid layout testimonial cards",
  type: "object",
  icon: () => <MessagingLines weight="thin" />,
  description:
    "Up to three testimonial cards for every row and show a title, description, avatar, name, and job title",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Grid layout testimonial cards" }: any) {
      return {
        title: title,
      };
    },
  },

  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "testimonials.list",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defaultTitleTheme,
        defaultTextTheme,
        defineField({
          name: "testimonials",
          title: "Testimonials",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
              },
              {
                name: "title",
                type: "color",
              },
              {
                name: "content",
                type: "color",
              },
              {
                name: "name",
                type: "color",
              },
              {
                name: "jobTitle",
                type: "color",
              },
            ],
          },
        }),
      ],
    }),
  ],
});

export default schema;
