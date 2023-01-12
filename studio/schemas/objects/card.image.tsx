import { IMAGE_RATIO_OPTIONS } from "../../../modules/CardGrid/ImageCardOptions";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import React from "react";

export const schema = {
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
    {
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    },
    {
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
    },
  ],
};

export default schema;
