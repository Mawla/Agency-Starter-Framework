import { COLUMN_OPTIONS } from "../../blocks/block18/block18.options";
import { defaultBlockGroups } from "../../components/block/block.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import {
  BORDER_RADIUS_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  PADDING_OPTIONS,
  RATIOS,
} from "../../types";
import { FileImage } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "card.image",
  title: "Image card",
  type: "object",
  icon: () => <FileImage weight="thin" />,
  preview: {
    select: {
      image: "image.source",
      alt: "image.alt",
      caption: "image.caption",
      imageAlt: "image.source.asset.altText",
    },
    prepare({ image, alt, caption, imageAlt }: any) {
      return {
        media: image,
        title: caption || alt || imageAlt,
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,
    defineField({
      name: "image",
      title: "Image",
      type: "image.simple",
      group: "content",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defineField({
          name: "image",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "ratio",
                type: "select",
                options: {
                  list: optionsToList(RATIOS),
                },
              }),
            ],
          },
        }),
        defineField({
          name: "card",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "background",
                type: "color",
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
