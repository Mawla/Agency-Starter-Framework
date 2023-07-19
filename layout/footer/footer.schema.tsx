import { BACKGROUND_COLOR_OPTIONS } from "../../components/block/background.options";
import { SPACE_OPTIONS } from "../../components/block/spacing.options";
import buttonSchema from "../../components/buttons/button.schema";
import IconPicker from "../../studio/components/IconPicker";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { COLORS } from "../../theme";
import { ICONS } from "../../types";
import { SchemaName } from "../../types.sanity";
import { AlignDown, Chain } from "@vectopus/atlas-icons-react";
import React from "react";
import {
  ConditionalPropertyCallback,
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const SCHEMA_NAME: SchemaName = "footer";

const LABEL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "label",
) as any;
const INTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "internal",
) as any;
const HREF_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "href",
) as any;

const PREVIEW = {
  preview: {
    select: {
      title: "title",
      label: "label",
      href: "href",
      items: "items",
    },
    prepare({ title, label, items = [], href }: any) {
      return {
        title: title || label || "[Empty]",
        subtitle: href
          ? href
          : items?.map(({ label }: any) => label).join(", "),
        media: <Chain weight="thin" size={20} />,
      };
    },
  },
};

export default defineType({
  name: SCHEMA_NAME,
  title: "Footer",
  type: "document",
  options: { singleton: true },
  icon: () => <AlignDown weight="thin" size={18} />,
  preview: {
    prepare() {
      return {
        title: `Footer`,
      };
    },
  },
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      description: "Up to 4 lists of links.",
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          ...PREVIEW,
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              type: "object",
              name: "link",
              title: "Link",
              groups: [
                {
                  name: "link",
                  title: "Link",
                },
              ],
              options: {
                collapsible: true,
                collapsed: true,
              },
              ...PREVIEW,
              fields: [INTERNAL_FIELD, HREF_FIELD],
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              description: "List of menu buttons.",
              of: [
                defineArrayMember({
                  type: "object",
                  title: "Items",
                  groups: [
                    {
                      name: "link",
                      title: "Link",
                    },
                  ],
                  ...PREVIEW,
                  fields: [LABEL_FIELD, INTERNAL_FIELD, HREF_FIELD],
                }),
              ],
              hidden: (({ parent, value }) =>
                !value &&
                (parent?.internal ||
                  parent?.href)) as ConditionalPropertyCallback,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          title: "Item",
          groups: [
            {
              name: "link",
              title: "Link",
            },
          ],
          ...PREVIEW,
          fields: [
            LABEL_FIELD,
            INTERNAL_FIELD,
            HREF_FIELD,
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              components: { input: IconPicker },
              options: {
                icons: ICONS,
              } as any,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
      description: "Copyright notice",
    }),
    defineField({
      name: "legal",
      title: "Legal",
      type: "string",
      description: "Additional legal info",
    }),
    defineField({
      name: "info",
      title: "Info",
      type: "string",
      description: "Additional info placed below the footer logo.",
    }),
    defineField({
      name: "legalLinks",
      title: "Legal links",
      type: "array",
      description: "List of additional links.",
      of: [
        defineArrayMember({
          type: "object",
          title: "Items",
          groups: [
            {
              name: "link",
              title: "Link",
            },
          ],
          ...PREVIEW,
          fields: [LABEL_FIELD, INTERNAL_FIELD, HREF_FIELD],
        }),
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "object",
      fields: [
        defineField({
          name: "mobile",
          title: "Mobile",
          type: "image",
        }),
        defineField({
          name: "desktop",
          title: "Desktop",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      fields: [
        defineField({
          name: "block",
          title: "Block",
          type: "styles",
          options: {
            fields: [
              {
                name: "space",
                title: "Space",
                type: "space",
                options: {
                  list: optionsToList(SPACE_OPTIONS),
                },
              },
              {
                name: "background",
                type: "color",
                options: {
                  colors: BACKGROUND_COLOR_OPTIONS,
                },
              },
              {
                name: "text",
                type: "color",
                options: {
                  colors: COLORS,
                },
              },
            ],
          },
        }),
      ],
    }),
  ],
});
