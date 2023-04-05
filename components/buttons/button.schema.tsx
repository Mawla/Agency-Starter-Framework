import DialogSelect, {
  DialogSelectWrapper,
} from "../../studio/components/DialogSelect";
import IconPicker from "../../studio/components/IconPicker";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { getLinkableTypes } from "../../studio/utils/schemas/getLinkableTypes";
import { ICONS } from "../../types";
import {
  BUTTON_BACKGROUND_COLOR_OPTIONS,
  BUTTON_BORDER_COLOR_OPTIONS,
  BUTTON_ICON_POSITION_OPTIONS,
  BUTTON_TEXT_COLOR_OPTIONS,
} from "./button.options";
import { Chain } from "@vectopus/atlas-icons-react";
import React from "react";
import {
  ConditionalPropertyCallback,
  defineField,
  defineType,
  StringRule,
} from "sanity";

const schema = defineType({
  name: "button",
  title: "Button",
  type: "object",
  groups: [
    {
      name: "link",
      title: "Link",
      default: true,
    },
    {
      name: "theme",
      title: "Theme",
    },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      group: "link",
    }),
    defineField({
      name: "href",
      title: "External link",
      description: "Link to a website, e.g https://www.example.com.",
      type: "string",
      group: "link",
      hidden: (({ parent, value }) =>
        !value &&
        Boolean(
          parent?.internal || parent?.dialog || parent?.file,
        )) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "internal",
      title: "Internal link",
      type: "reference",
      group: "link",
      description: "Internal link to a page or article.",
      to: getLinkableTypes(),
      hidden: (({ parent, value }) =>
        !value &&
        Boolean(
          parent?.href || parent?.dialog || parent?.file,
        )) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "params",
      title: "Extra url parameters",
      type: "string",
      group: "link",
      description:
        "Use this for a #hash or ?querystring. This field is not automatically updated when the destination changes.",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.href || parent?.dialog || parent?.file),
      validation: (Rule: StringRule) =>
        Rule.custom((value: any) => {
          if (typeof value === "undefined") return true; // Allow undefined values
          if (!value.startsWith("#") && !value.startsWith("?"))
            return `This field must start with either # or ?.`;
          return true;
        }),
    }),
    defineField({
      name: "dialog",
      title: "Dialog",
      type: "string",
      group: "link",
      description: "Open a dialog on this page",
      components: {
        field: DialogSelectWrapper,
        input: DialogSelect,
      },
      hidden: (({ parent, value }) =>
        !value &&
        Boolean(
          parent?.internal || parent?.href || parent?.file,
        )) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      group: "link",
      hidden: (({ parent, value }) =>
        !value &&
        Boolean(
          parent?.href || parent?.dialog || parent?.internal,
        )) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "download",
      title: "Download",
      type: "boolean",
      group: "link",
      initialValue: false,
      description: "Make the button download the file",
      hidden: (({ parent, value }) =>
        !value &&
        !Boolean(parent?.file || parent?.href)) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "newWindow",
      title: "Open in new window",
      type: "boolean",
      group: "link",
      initialValue: false,
      description: "Make the button open in a new browser window",
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "theme",
      components: { input: IconPicker },
      options: {
        icons: ICONS,
      } as any,
    }),
    defineField({
      name: "iconPosition",
      title: "Icon position",
      type: "string",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: optionsToList(BUTTON_ICON_POSITION_OPTIONS),
      },
      initialValue: "after",
      group: "theme",
      description: "Make the button stretch as wide as it can go.",
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "styles",
          options: {
            fields: [
              {
                name: "color",
                type: "color",
                options: {
                  colors: BUTTON_TEXT_COLOR_OPTIONS,
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
                options: {
                  colors: BUTTON_BACKGROUND_COLOR_OPTIONS,
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
                options: {
                  colors: BUTTON_BORDER_COLOR_OPTIONS,
                },
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      label: "label",
      href: "href",
    },
    prepare({ label = "", href }: any) {
      return {
        title: label,
        subtitle: href ? href : null,
        media: <Chain weight="thin" />,
      };
    },
  },
});

export default schema;
