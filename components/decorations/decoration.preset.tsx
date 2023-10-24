import { DecorationLocationSelect } from "../../studio/components/Decorations/DecorationLocationSelect";
import DocumentPreview from "../../studio/components/Preview/DocumentPreview";
import { BlueprintPaper } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "preset.decoration",
  title: "Decorations",
  type: "document",
  icon: () => <BlueprintPaper weight="thin" size={20} />,
  liveEdit: true,
  preview: {
    select: {
      title: "title",
      mobile: "mobile",
      mobileImage: "mobile.image",
      mobileHTML: "mobile.html",
      tablet: "tablet",
      tabletImage: "tablet.image",
      tabletHTML: "tablet.html",
      desktop: "desktop",
      desktopImage: "desktop.image",
      desktopHTML: "desktop.html",
    },
    prepare({
      title,
      mobile = {},
      tablet = {},
      desktop = {},
      mobileImage,
      tabletImage,
      desktopImage,
      mobileHTML,
      tabletHTML,
      desktopHTML,
    }) {
      const isImage = Boolean(mobileImage || tabletImage || desktopImage);
      const isHTML = Boolean(mobileHTML || tabletHTML || desktopHTML);

      return {
        title:
          title || (isImage && "Image") || (isHTML && "HTML") || "Decoration",
        media: mobileImage || tabletImage || desktopImage || (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                mobile?.background || tablet?.background || desktop?.background,
            }}
          />
        ),
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
      description: "A descriptive title for this decoration, used in the CMS.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      components: {
        field: DecorationLocationSelect,
      },
      description: "Position the decoration inside or outside the block.",
    }),
    defineField({
      name: "breakout",
      title: "Breakout",
      type: "boolean",
      description:
        "Stay inside the bounding box of the block or allow the decoration to break outside.",
    }),
    defineField({
      name: "mobile",
      title: "Mobile",
      type: "decoration",
      description:
        'The base decoration, used on "mobile" breakpoints and higher.',
    }),
    defineField({
      name: "tablet",
      title: "Tablet",
      type: "decoration",
      options: { collapsible: true, collapsed: true },
      description:
        'Override the base decoration for "tablet" breakpoints and higher.',
    }),
    defineField({
      name: "desktop",
      title: "Desktop",
      type: "decoration",
      options: { collapsible: true, collapsed: true },
      description:
        'Override the base decoration for "desktop" breakpoints and higher.',
    }),
  ],
});

export default schema;
