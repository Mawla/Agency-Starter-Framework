import DialogSelect, {
  DialogSelectWrapper,
} from "../../studio/components/DialogSelect";
import IconPicker from "../../studio/components/IconPicker";
import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { getLinkableTypes } from "../../studio/utils/schemas/getLinkableTypes";
import { ICONS } from "../../types";
import { ICON_POSITION_OPTIONS, VARIANT_OPTIONS } from "./buttonoptions";
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
  initialValue: {
    variant: "primary",
    iconPosition: "after",
  },
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
      name: "external",
      title: "External link",
      description: "Link to a website, e.g https://www.example.com.",
      type: "string",
      group: "link",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.internal ||
          parent?.dialog ||
          parent?.file)) as ConditionalPropertyCallback,
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
        (parent?.external ||
          parent?.dialog ||
          parent?.file)) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "language",
      group: "link",
      description: "Switch to a different language version of the page.",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.external ||
          parent?.dialog ||
          parent?.file)) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "params",
      title: "Extra url parameters",
      type: "string",
      group: "link",
      description:
        "Use this for a #hash or ?querystring. This field is not automatically updated when the destination changes.",
      hidden: ({ parent, value }) =>
        !value && (parent?.external || parent?.dialog || parent?.file),
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
        (parent?.internal ||
          parent?.external ||
          parent?.file)) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      group: "link",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.external ||
          parent?.dialog ||
          parent?.internal)) as ConditionalPropertyCallback,
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
        !(parent?.file || parent?.external)) as ConditionalPropertyCallback,
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
      name: "variant",
      title: "Variant",
      type: "string",
      group: "theme",
      description: "Choose styling option.",
      options: {
        list: optionsToList(VARIANT_OPTIONS),
      },
    }),
    defineField({
      name: "alt",
      title: "Alt",
      type: "boolean",
      group: "theme",
      description: "Remove background color.",
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
        list: optionsToList(ICON_POSITION_OPTIONS),
      },
      initialValue: "after",
      group: "theme",
      description: "Make the button stretch as wide as it can go.",
    }),
  ],
  preview: {
    select: {
      label: "label",
      external: "external",
    },
    prepare({ label = "", external }: any) {
      return {
        title: label,
        subtitle: external ? external : null,
        media: <DocumentIcon type="link" />,
      };
    },
  },
});

export default schema;
