import buttonSchema from "../../components/buttons/Button.schema";
import IconPicker from "../../studio/components/IconPicker";
import { DocumentIcon } from "../../studio/utils/DocumentIcon";
import { ICONS } from "../../types";
import { SchemaName } from "../../types.sanity";
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
const LANGUAGE_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "language",
) as any;
const EXTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "external",
) as any;

const PREVIEW = {
  preview: {
    select: {
      title: "title",
      label: "label",
      external: "external",
      items: "items",
    },
    prepare({ title, label, items = [], external }: any) {
      return {
        title: title || label || "[Empty]",
        subtitle: external
          ? external
          : items?.map(({ label }: any) => label).join(", "),
        media: <DocumentIcon type="link" />,
      };
    },
  },
};

export default defineType({
  name: SCHEMA_NAME,
  title: "Footer",
  type: "document",
  icon: () => <DocumentIcon type="footer" />,
  initialValue: {},
  options: { localize: true } as any,
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
              fields: [INTERNAL_FIELD, LANGUAGE_FIELD, EXTERNAL_FIELD],
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
                  fields: [
                    LABEL_FIELD,
                    INTERNAL_FIELD,
                    LANGUAGE_FIELD,
                    EXTERNAL_FIELD,
                  ],
                }),
              ],
              hidden: (({ parent, value }) =>
                !value &&
                (parent?.internal ||
                  parent?.external)) as ConditionalPropertyCallback,
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
            LANGUAGE_FIELD,
            EXTERNAL_FIELD,
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
    }),
    defineField({
      name: "legal",
      title: "Legal",
      type: "string",
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
          fields: [LABEL_FIELD, INTERNAL_FIELD, LANGUAGE_FIELD, EXTERNAL_FIELD],
        }),
      ],
    }),
  ],
});
