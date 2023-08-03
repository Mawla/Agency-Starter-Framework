import { ArrayItemPreviewHighlight } from "../../studio/components/ArrayItemPreviewHighlight";
import { ColorInput } from "../../studio/components/ColorInput";
import {
  DecorationPositionInput,
  DecorationPositionInputWrapper,
} from "../../studio/components/Decorations/DecorationPositionInput";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { DECORATION_LOCATION_OPTIONS } from "./decoration.options";
import { defineField, NumberRule, StringRule } from "sanity";

export const decorations = defineField({
  name: "decorations",
  title: "Decorations",
  type: "array",
  of: [
    {
      type: "object",
      components: {
        item: ArrayItemPreviewHighlight,
      },
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
              title ||
              (isImage && "Image") ||
              (isHTML && "HTML") ||
              "Decoration",
            media: mobileImage || tabletImage || desktopImage || (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    mobile?.background ||
                    tablet?.background ||
                    desktop?.background,
                }}
              />
            ),
          };
        },
      },
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          description:
            "A descriptive title for this decoration, used in the CMS.",
        }),
        defineField({
          name: "location",
          title: "Location",
          type: "string",
          options: {
            list: optionsToList(DECORATION_LOCATION_OPTIONS),
          },
          description: "Position the decoration inside or outside the block.",
        }),
        defineField({
          name: "breakout",
          title: "Breakout",
          type: "boolean",
          description:
            "Stay inside the border radius of the block or allow the decoration to break outside.",
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
    },
  ],
});

export const decoration = defineField({
  name: "decoration",
  title: "Decoration",
  type: "object",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "position", title: "Position" },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "hidden",
      type: "boolean",
      description: "Hide this decoration on this breakpoint.",
      group: ["style", "position", "content"],
    }),
    ...[
      "width",
      "height",
      "top",
      "right",
      "bottom",
      "left",
      "translateX",
      "translateY",
    ].map((name) =>
      defineField({
        name,
        type: "string",
        description: `Use % or px. Use 'auto' to unset.`,
        group: "position",
        validation: (Rule: StringRule) =>
          Rule.custom((value: any) => {
            if (typeof value === "undefined") return true;
            if (value.trim().length === 0) return true;
            const isPixel = !isNaN(+value) || value.trim().endsWith("px");
            const isPercent = value.trim().endsWith("%");
            const isAuto = value.trim() === "auto";
            if (!isPixel && !isPercent && !isAuto)
              return `This field must end with either px or % or 'auto'.`;
            return true;
          }),
        components: {
          input: DecorationPositionInput,
          field: DecorationPositionInputWrapper,
        },
      }),
    ),
    defineField({
      name: "rotate",
      type: "string",
      description: `Value between 0 and 360. Use 'auto' to unset.`,
      group: "position",
      validation: (Rule: StringRule) =>
        Rule.custom((value: any) => {
          if (typeof value === "undefined") return true;
          if (value.trim().length === 0) return true;
          const isAuto = value.trim() === "auto";
          if (!isAuto && (value < -360 || value > 360))
            return `This field must be between -360 and 360 or 'auto'.`;

          return true;
        }),
      components: {
        input: DecorationPositionInput,
        field: DecorationPositionInputWrapper,
      },
    }),
    defineField({
      name: "scale",
      type: "string",
      description: `Value around 1. Where 1 is 100% and 0 is hidden. Use 'auto' to unset.`,
      group: "position",
      validation: (Rule: StringRule) =>
        Rule.custom((value: any) => {
          if (typeof value === "undefined") return true;
          if (value.trim().length === 0) return true;
          const isAuto = value.trim() === "auto";
          if (!isAuto && value < 0)
            return `This field must be between 0 and 1 or 'auto'.`;

          return true;
        }),
      components: {
        input: DecorationPositionInput,
        field: DecorationPositionInputWrapper,
      },
    }),
    defineField({
      name: "background",
      type: "string",
      description: "Hex color code for the background of the decoration.",
      group: "style",
      components: {
        input: ColorInput,
      },
      validation: (Rule) =>
        Rule.custom((value) => {
          if (typeof value === "undefined") return true;
          if (value.trim().length === 0) return true;
          if (!value.startsWith("#")) {
            return "value must start with #";
          }
          if (value.length !== 7) {
            return "value must be 7 characters long";
          }
          return true;
        }),
    }),
    defineField({
      name: "opacity",
      type: "number",
      description:
        "Number between 0 and 1 setting the opacity of the decoration.",
      group: "style",
      validation: (Rule: NumberRule) => Rule.max(1).positive(),
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Use an image as decoration",
      group: "content",
      hidden: ({ parent, value }) => !value && Boolean(parent?.html),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "repeat",
      type: "boolean",
      description: "Set as repeating background",
      group: "content",
      hidden: ({ parent, value }) => !value && !Boolean(parent?.image),
    }),
    defineField({
      name: "html",
      type: "text",
      description:
        "Use raw HTML. All potentially dangerous tags will be stripped.",
      rows: 4,
      group: "content",
      hidden: ({ parent, value }) => !value && Boolean(parent?.image),
    }),
  ],
});
