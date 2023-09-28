import { COLUMN_OPTIONS } from "../../blocks/block18/block18.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { referenceFilterCurrentLanguage } from "../../studio/utils/language/reference-filter-current-language";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import {
  BORDER_RADIUS_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  HORIZONTAL_ALIGN_OPTIONS,
  PADDING_OPTIONS,
} from "../../types";
import { defaultBlockGroups } from "../block/block.schema";
import { testimonialItemObject } from "../testimonials/testimonials.schema";
import { defaultTitleTheme } from "../title/title.schema";
import { MessagingLines } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "card.testimonial",
  title: "Testimonial card",
  type: "object",
  icon: () => <MessagingLines weight="thin" />,
  preview: {
    select: {
      refTitle: "testimonialRef.jobTitle",
      refName: "testimonialRef.name",
      refContent: "testimonialRef.content",
      title: "testimonial.jobTitle",
      name: "testimonial.name",
      content: "testimonial.content",
    },
    prepare({ refTitle, refName, refContent, title = "", name = "", content }) {
      return {
        title: `${name || refName} ${title || refTitle}`,
        subtitle: blocksToText(content || refContent),
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    defineField({
      name: "testimonialRef",
      title: "Reusable testimonial",
      type: "reference",
      to: [{ type: "testimonials.item" }],
      options: {
        filter: referenceFilterCurrentLanguage,
      },
      hidden: ({ parent, value }) => !value && Boolean(parent?.testimonial),
      group: "content",
    }),
    defineField({
      ...testimonialItemObject,
      name: "testimonial",
      hidden: ({ parent, value }) => !value && Boolean(parent?.testimonialRef),
      group: "content",
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defineField({
          name: "card",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "color",
                title: "Text color",
                type: "color",
              }),
              defineField({
                name: "background",
                type: "color",
              }),
              defineField({
                name: "align",
                type: "select",
                options: {
                  list: optionsToList(HORIZONTAL_ALIGN_OPTIONS),
                },
              }),
              {
                name: "paddingX",
                type: "select",
                options: {
                  list: optionsToList(PADDING_OPTIONS, true),
                },
              },
              {
                name: "paddingTop",
                type: "select",
                options: {
                  list: optionsToList(PADDING_OPTIONS, true),
                },
              },
              {
                name: "paddingBottom",
                type: "select",
                options: {
                  list: optionsToList(PADDING_OPTIONS, true),
                },
              },
              {
                name: "columns",
                type: "select",
                options: {
                  list: optionsToList(COLUMN_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "border",
          title: "Border",
          type: "styles",
          options: {
            fields: [
              {
                name: "color",
                type: "color",
              },
              {
                name: "width",
                type: "select",
                options: {
                  list: optionsToList(BORDER_WIDTH_OPTIONS),
                },
              },
              {
                name: "radius",
                type: "select",
                options: {
                  list: optionsToList(BORDER_RADIUS_OPTIONS),
                },
              },
            ],
          },
        }),
        { ...defaultTitleTheme, name: "title" },
        { ...defaultTitleTheme, name: "content" },
        { ...defaultTitleTheme, name: "name" },
        { ...defaultTitleTheme, name: "jobTitle" },
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
