import { ArrayItemPreviewHighlight } from "../../studio/components/ArrayItemPreviewHighlight";
import { ColorInput } from "../../studio/components/ColorInput";
import {
  DecorationPositionInput,
  DecorationPositionInputWrapper,
} from "../../studio/components/Decorations/DecorationPositionInput";
import { UnsetObjectButton } from "../../studio/components/UnsetObjectButton";
import decorationPresetSchema from "./decoration.preset";
import { defineField, NumberRule, StringRule } from "sanity";

export const decorations = defineField({
  name: "decorations",
  title: "Decorations",
  type: "array",
  of: [{ type: "decorationWrapper" }, { type: "cssdecoration" }],
});

function validateCSSUnit(Rule: StringRule) {
  return Rule.custom((value: any) => {
    if (typeof value === "undefined") return true;
    if (value.trim().length === 0) return true;
    const isPixel = !isNaN(+value) || value?.trim().endsWith("px");
    const isValidUnit = value
      .trim()
      .match(/(em|ex|\%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)$/);
    const isAuto = value.trim() === "auto";
    if (!isPixel && !isValidUnit && !isAuto)
      return `This field must end with either a valid CSS unit (e.g 100px or 10%) or 'auto'.`;
    return true;
  });
}

export const decorationWrapper = defineField({
  name: "decorationWrapper",
  title: "Decoration",
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

      presetTitle: "preset.title",
      presetMobile: "preset.mobile",
      presetMobileImage: "preset.mobile.image",
      presetMobileHTML: "preset.mobile.html",
      presetTablet: "preset.tablet",
      presetTabletImage: "preset.tablet.image",
      presetTabletHTML: "preset.tablet.html",
      presetDesktop: "preset.desktop",
      presetDesktopImage: "preset.desktop.image",
      presetDesktopHTML: "preset.desktop.html",
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

      presetTitle,
      presetMobile = {},
      presetTablet = {},
      presetDesktop = {},
      presetMobileImage,
      presetTabletImage,
      presetDesktopImage,
      presetMobileHTML,
      presetTabletHTML,
      presetDesktopHTML,
    }) {
      const isImage = Boolean(
        mobileImage ||
          tabletImage ||
          desktopImage ||
          presetMobileImage ||
          presetTabletImage ||
          presetDesktopImage,
      );
      const isHTML = Boolean(
        mobileHTML ||
          tabletHTML ||
          desktopHTML ||
          presetMobileHTML ||
          presetTabletHTML ||
          presetDesktopHTML,
      );

      return {
        title:
          title ||
          presetTitle ||
          (isImage && "Image") ||
          (isHTML && "HTML") ||
          "Decoration",
        media: mobileImage ||
          tabletImage ||
          desktopImage ||
          presetMobileImage ||
          presetTabletImage ||
          presetDesktopImage || (
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  mobile?.background ||
                  tablet?.background ||
                  desktop?.background ||
                  presetMobile?.background ||
                  presetTablet?.background ||
                  presetDesktop?.background,
              }}
            />
          ),
      };
    },
  },
  fields: [
    defineField({
      name: "preset",
      title: "Preset",
      type: "reference",
      to: [{ type: "preset.decoration" }],
      weak: true,
    }),
    ...decorationPresetSchema.fields,
  ],
});

export const decoration = defineField({
  name: "decoration",
  title: "Decoration",
  type: "object",
  components: {
    field: UnsetObjectButton,
  },
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "position", title: "Size & Position" },
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
        validation: validateCSSUnit,
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
      description:
        "Hex color code or valid CSS background for the background of the decoration, e.g #ff0000 or linear-gradient(to right, #e96443, #904e95).",
      group: "style",
      components: {
        input: ColorInput,
      },
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
      name: "borderRadius",
      type: "string",
      description: `Use % or px. Use 'auto' to unset.`,
      group: "style",
      validation: validateCSSUnit,
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Use an image as decoration",
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.html || parent?.video),
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
      name: "video",
      type: "video",
      description: "Use a video as decoration",
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.html || parent?.image),
    }),
    defineField({
      name: "html",
      type: "text",
      description:
        "Use raw HTML. All potentially dangerous tags will be stripped.",
      rows: 4,
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.image || parent?.video),
    }),
  ],
});
