import CaptureScreenshot from "../../studio/components/CaptureScreenshot/CaptureScreenshot";
import PresetUsage from "../../studio/components/Presets/PresetUsage";
import DocumentPreview from "../../studio/components/Preview/DocumentPreview";
import { defaultTitleTheme } from "./title.schema";
import { Text } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "preset.theme.title",
  title: "Heading styles",
  type: "document",
  icon: () => <Text weight="thin" size={20} />,
  liveEdit: true,
  preview: {
    select: {
      title: "title",
      size: "theme.size",
      weight: "theme.weight",
      font: "theme.font",
      color: "theme.color",
      screenshot: "image",
    },
    prepare({
      title = "Heading preset",
      size,
      weight,
      font,
      color,
      screenshot,
    }) {
      return {
        title: title,
        subtitle: [size, weight, font, color].filter(Boolean).join(" "),
        media: screenshot,
      };
    },
  },
  fields: [
    defineField({
      name: "preview_sync",
      title: "Preview",
      type: "string",
      components: {
        field: DocumentPreview,
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "A descriptive title for this heading, used in the CMS.",
    }),
    { ...defaultTitleTheme, name: "theme", title: "Theme" },

    defineField({
      name: "preview",
      title: "Preview",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "text",
          rows: 2,
          description: "Change the text of the preview to see how it looks.",
        }),
        defineField({
          type: "styles",
          name: "styles",
          title: "Styles",
          options: {
            allowCopyPaste: false,
            fields: [
              {
                name: "background",
                type: "color",
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "400x300 screenshot used for previews in the CMS.",
    }),
    defineField(
      {
        name: "screenshot",
        title: "Screenshot",
        type: "string",
        components: {
          field: CaptureScreenshot,
        },
        options: {
          width: 200,
          height: 200,
        },
      },
      { strict: false },
    ),
    defineField({
      name: "usage",
      title: "Used on",
      type: "string",
      components: { field: PresetUsage },
    }),
  ],
});

export default schema;
