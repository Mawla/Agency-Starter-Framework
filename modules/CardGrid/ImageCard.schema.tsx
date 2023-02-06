import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { IMAGE_RATIO_OPTIONS } from "./ImageCardOptions";
import React from "react";
import { defineType, defineField } from "sanity";

export const schema = defineType({
  title: "Image card",
  name: "card.image",
  type: "document",
  icon: () => <DocumentIcon type="image" />,
  preview: {
    select: {
      media: "image",
      title: "image.asset.alt",
    },
  },
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "Theme",
      name: "theme",
    },
  ],
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
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
        {
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
              {
                name: "ratio",
                type: "select",
                options: {
                  list: optionsToList(IMAGE_RATIO_OPTIONS),
                },
              },
            ],
          },
        },
      ],
    }),
  ],
});

export default schema;
