import CaptureScreenshot from "../../studio/components/CaptureScreenshot/CaptureScreenshot";
import IconPicker from "../../studio/components/IconPicker";
import PresetUsage from "../../studio/components/Presets/PresetUsage";
import DocumentPreview from "../../studio/components/Preview/DocumentPreview";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from "../../theme";
import {
  BORDER_RADIUS_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  PADDING_OPTIONS,
  TEXT_TRANSFORM_OPTIONS,
} from "../../types";
import { BUTTON_ICON_POSITION_OPTIONS } from "./button.options";
import { Text, Stack } from "@sanity/ui";
import { ClickBait } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType, StringRule, SlugRule } from "sanity";

export default defineType({
  name: "preset.button",
  title: "Buttons",
  liveEdit: true,
  type: "document",
  icon: () => <ClickBait weight="thin" size={20} />,
  preview: {
    select: {
      title: "title",
      description: "description",
      isDefault: "default",
      screenshot: "image",
    },
    prepare({
      title = "Button preset",
      description = "",
      isDefault = false,
      screenshot,
    }) {
      return {
        title: title,
        subtitle: `${isDefault ? "[default] " : ""}${description}`,
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
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Unique identifier",
      description:
        "Used to generate a class name for this button that can be used in a custom CSS stylesheet.",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      options: {
        source: (doc, options) => (options.parent as any).title,
      },
      components: {
        field: (props) => (
          <Stack space={2}>
            {props.renderDefault(props)}{" "}
            {props.value && (
              <Text size={1} muted>
                {`.btn-${props.value.current} { … }`}
              </Text>
            )}
          </Stack>
        ),
      },
    }),
    defineField({
      name: "default",
      title: "Default",
      type: "boolean",
      description: "Use this preset as the default for all buttons.",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Icon",
          type: "string",
          components: { input: IconPicker },
        }),
        defineField({
          name: "position",
          title: "Position",
          type: "string",
          options: {
            list: optionsToList(BUTTON_ICON_POSITION_OPTIONS),
          },
        }),
      ],
    }),

    defineField({
      name: "mobile",
      title: "Mobile",
      type: "buttonTheme",
      description: 'The base theme, used on "mobile" breakpoints and higher.',
    }),
    defineField({
      name: "tablet",
      title: "Tablet",
      type: "buttonTheme",
      options: { collapsible: true, collapsed: true },
      description:
        'Override the base theme for "tablet" breakpoints and higher.',
    }),
    defineField({
      name: "desktop",
      title: "Desktop",
      type: "buttonTheme",
      options: { collapsible: true, collapsed: true },
      description:
        'Override the base theme for "desktop" breakpoints and higher.',
    }),
    defineField({
      name: "hover",
      title: "Hover",
      description: "Mouse over effect",
      type: "styles",
      options: {
        fields: [
          defineField({
            name: "underline",
            type: "boolean",
          }),
          defineField({
            name: "label",
            type: "color",
          }),
          defineField({
            name: "background",
            type: "color",
          }),
          defineField({
            name: "border",
            type: "color",
          }),
        ],
      },
    }),
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
      description: "220x100 screenshot used for previews in the CMS.",
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
          width: 220,
          height: 100,
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

export const buttonTheme = defineField({
  name: "buttonTheme",
  title: "Theme",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "styles",
      options: {
        fields: [
          {
            name: "size",
            type: "select",
            options: {
              list: optionsToList(FONT_SIZES),
            },
          },
          {
            name: "weight",
            type: "select",
            options: {
              list: optionsToList(FONT_WEIGHTS),
            },
          },
          {
            name: "font",
            type: "select",
            options: {
              list: optionsToList(FONTS),
            },
          },
          {
            name: "color",
            type: "color",
          },
          {
            name: "transform",
            type: "select",
            options: {
              list: optionsToList(TEXT_TRANSFORM_OPTIONS),
            },
          },
        ],
      },
    }),

    defineField({
      name: "background",
      title: "Background",
      type: "styles",
      options: {
        fields: [
          {
            name: "color",
            type: "color",
          },
          {
            name: "paddingX",
            type: "select",
            options: {
              list: optionsToList(PADDING_OPTIONS, true),
            },
          },
          {
            name: "paddingY",
            type: "select",
            options: {
              list: optionsToList(PADDING_OPTIONS, true),
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
});
