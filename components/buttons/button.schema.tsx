import { UnsetObjectButton } from "../../studio/components/UnsetObjectButton";
import { getLinkableTypes } from "../../studio/utils/schemas/getLinkableTypes";
import presetButtonSchema from "./button.preset";
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
          parent?.internal || parent?.file,
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
        Boolean(parent?.href || parent?.file)) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "params",
      title: "Extra url parameters",
      type: "string",
      group: "link",
      description:
        "Use this for a #hash or ?querystring. This field is not automatically updated when the destination changes.",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.href || parent?.file),
      validation: (Rule: StringRule) =>
        Rule.custom((value: any) => {
          if (typeof value === "undefined") return true; // Allow undefined values
          if (!value.startsWith("#") && !value.startsWith("?"))
            return `This field must start with either # or ?.`;
          return true;
        }),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      group: "link",
      hidden: (({ parent, value }) =>
        !value &&
        Boolean(
          parent?.href || parent?.internal,
        )) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "target",
      title: "Open in",
      type: "string",
      group: "link",
      description:
        "Choose between opening the link in a new window or lightbox",
      options: {
        list: [
          { title: "New window", value: "_blank" },
          { title: "Lightbox", value: "lightbox" },
        ],
      },
    }),
    defineField({
      name: "download",
      title: "Download",
      type: "boolean",
      group: "link",
      description: "Make the button download the file",
      hidden: (({ parent, value }) =>
        !value &&
        !Boolean(parent?.file || parent?.href)) as ConditionalPropertyCallback,
    }),
    defineField({
      name: "presetTheme",
      title: "Preset",
      type: "reference",
      group: "theme",
      to: [{ type: "preset.button" }],
      weak: true,
    }),
    defineField({
      name: "customTheme",
      title: "Custom theme",
      description: "Overrides the theme from the preset",
      type: "object",
      group: "theme",
      options: { collapsible: true, collapsed: true },
      components: {
        field: UnsetObjectButton,
      },
      fields: presetButtonSchema.fields.filter(
        (field) => !["title", "slug", "default"].includes(field.name),
      ),
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
