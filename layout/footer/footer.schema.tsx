import { defaultBlockTheme } from "../../components/block/block.schema";
import buttonSchema from "../../components/buttons/button.schema";
import IconPicker from "../../studio/components/IconPicker";
import DocumentPreview from "../../studio/components/Preview/DocumentPreview";
import Warning from "../../studio/components/Warning";
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
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "theme", title: "Theme" },
  ],
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
      name: "preview_sync",
      title: "Preview",
      type: "string",
      components: {
        field: DocumentPreview,
      },
      group: ["content", "theme"],
    }),
    defineField({
      name: "warning",
      title: "Warning",
      type: "string",
      options: { localize: false } as any,
      components: { field: Warning },
      description:
        "Updates to configuration will trigger a new deployment on the build server and will take a few minutes to be in effect.",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      group: "content",
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
                  default: true,
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
      group: "content",
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
      group: "content",
    }),
    defineField({
      name: "legal",
      title: "Legal",
      type: "string",
      description: "Additional legal info",
      group: "content",
    }),
    defineField({
      name: "info",
      title: "Info",
      type: "string",
      description: "Additional info placed below the footer logo.",
      group: "content",
    }),
    defineField({
      name: "legalLinks",
      title: "Legal links",
      type: "array",
      description: "List of additional links.",
      group: "content",
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
      group: "content",
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
      group: "theme",
      fields: [defaultBlockTheme],
    }),
  ],
});
