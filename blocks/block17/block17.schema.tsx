import {
  defaultBlockTheme,
  defaultBlockGroups,
} from "../../components/block/block.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { Question } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block17",
  title: "Testimonial",
  type: "object",
  icon: () => <Question weight="thin" />,
  description: "Large testimonial quote",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Testimonial" }: any) {
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
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [defaultBlockTheme, defaultTitleTheme],
    }),
    defineField({
      name: "decorations",
      title: "Decorations",
      type: "decorations",
      group: "decorations",
    }),
  ],
});

export default schema;
