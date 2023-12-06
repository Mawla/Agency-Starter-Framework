import {
  defaultBlockTheme,
  defaultBlockGroups,
} from "../../components/block/block.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { HeartPaper } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block17",
  title: "Testimonial poster",
  type: "object",
  icon: () => <HeartPaper weight="thin" />,
  description: "Large testimonial quote",
  preview: {
    select: {
      title: "title",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle }: any) {
      return {
        title: title || cmsTitle || "Testimonial",
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
      name: "testimonials",
      title: "Testimonials",
      type: "testimonials.list",
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
        defineField({
          name: "testimonial",
          title: "Testimonial",
          type: "object",
          options: {
            collapsible: false,
            collapsed: false,
          },
          fields: [
            { ...defaultTitleTheme, name: "title", title: "Title" },
            { ...defaultTitleTheme, name: "content", title: "Content" },
            { ...defaultTitleTheme, name: "name", title: "Name" },
            { ...defaultTitleTheme, name: "jobTitle", title: "Job title" },
          ],
        }),
        defineField({
          name: "slider",
          title: "Slider",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "controlsColor",
                type: "color",
              }),
            ],
          },
        }),
      ],
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
