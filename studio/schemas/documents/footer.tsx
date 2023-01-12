import { SchemaName } from "../../../types.sanity";
import IconPicker from "../../components/IconPicker";
import { DocumentIcon } from "../../utils/DocumentIcon";
import buttonSchema from "../objects/button";
import React from "react";

export const SCHEMA_NAME: SchemaName = "footer";

const LABEL_FIELD = buttonSchema.fields.find(({ name }) => name === "label");
const INTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "internal"
);
const LANGUAGE_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "language"
);
const EXTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "external"
);

const PREVIEW = {
  preview: {
    select: {
      title: "title",
      label: "label",
      external: "external",
      items: "items",
    },
    prepare({ title, label, items = [], external }) {
      return {
        title: title || label || "[Empty]",
        subtitle: external
          ? external
          : items?.map(({ label }) => label).join(", "),
        media: <DocumentIcon type="link" />,
      };
    },
  },
};

export default {
  name: SCHEMA_NAME,
  title: "Footer",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="footer" />,
  initialValue: {},
  localize: true,
  preview: {
    prepare() {
      return {
        title: `Footer`,
      };
    },
  },
  fields: [
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          ...PREVIEW,
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
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
            },
            {
              name: "items",
              title: "Items",
              type: "array",
              description: "List of menu buttons.",
              of: [
                {
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
                },
              ],
              hidden: ({ parent, value }) =>
                !value && (parent?.internal || parent?.external),
            },
          ],
        },
      ],
    },
    {
      name: "socials",
      title: "Socials",
      type: "array",
      of: [
        {
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
            {
              name: "icon",
              title: "Icon",
              type: "string",
              components: { input: IconPicker },
            },
          ],
        },
      ],
    },
    {
      name: "copyright",
      title: "Copyright",
      type: "string",
    },
    {
      name: "legal",
      title: "Legal",
      type: "string",
    },
    {
      name: "legalLinks",
      title: "Legal links",
      type: "array",
      description: "List of additional links.",
      of: [
        {
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
        },
      ],
    },
  ],
};
