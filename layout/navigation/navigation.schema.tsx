import buttonSchema from "../../components/buttons/button.schema";
import IconPicker from "../../studio/components/IconPicker";
import { ICONS } from "../../types";
import { SchemaName } from "../../types.sanity";
import {
  Chain,
  JustifyAll,
  TriangleExclamation,
} from "@vectopus/atlas-icons-react";
import React from "react";
import { ConditionalPropertyCallback, defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "navigation";

const LABEL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "label")[0],
};

const INTERNAL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "internal")[0],
  hidden: (({ parent, value }) =>
    !value && parent?.href) as ConditionalPropertyCallback,
};

const LANGUAGE_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "language")[0],
  hidden: (({ parent, value }) =>
    !value && parent?.href) as ConditionalPropertyCallback,
};

const HREF_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "href")[0],
  hidden: (({ parent, value }) =>
    !value && parent?.internal) as ConditionalPropertyCallback,
};

const PREVIEW = {
  preview: {
    select: {
      label: "label",
      href: "href",
      children: "children",
    },
    prepare({ label, children = [], href }: any) {
      return {
        title: label || "[Empty]",
        subtitle: href
          ? href
          : children?.map(({ label }: { label: string }) => label).join(", "),
        media: label?.trim().length ? (
          <Chain weight="thin" size={20} />
        ) : (
          <TriangleExclamation weight="thin" size={20} />
        ),
      };
    },
  },
};

export default defineType({
  name: SCHEMA_NAME,
  title: "Navigation",
  type: "document",
  icon: () => <JustifyAll weight="thin" size={18} />,
  initialValue: {},
  options: { localize: true } as any,
  preview: {
    prepare() {
      return {
        title: `Navigation`,
      };
    },
  },
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
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
            HREF_FIELD,
            {
              name: "children",
              title: "Submenu",
              type: "array",
              description: "List of submenu buttons.",
              of: [
                {
                  type: "object",
                  title: "Submenu",
                  groups: [
                    {
                      name: "link",
                      title: "Link",
                    },
                  ],
                  ...PREVIEW,
                  fields: [
                    LABEL_FIELD,
                    {
                      ...INTERNAL_FIELD,
                      hidden: (({ parent, value }) =>
                        !value && parent?.href) as ConditionalPropertyCallback,
                    },
                    {
                      ...LANGUAGE_FIELD,
                      hidden: (({ parent, value }) =>
                        !value && parent?.href) as ConditionalPropertyCallback,
                    },
                    {
                      ...HREF_FIELD,
                      hidden: (({ parent, value }) =>
                        !value &&
                        parent?.internal) as ConditionalPropertyCallback,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    {
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          title: "Button",
          ...PREVIEW,
          fields: [
            { ...LABEL_FIELD, group: null as any },
            {
              ...INTERNAL_FIELD,
              hidden: (({ parent, value }) =>
                !value && parent?.href) as ConditionalPropertyCallback,
              group: null as any,
            },
            {
              ...LANGUAGE_FIELD,
              hidden: (({ parent, value }) =>
                !value && parent?.href) as ConditionalPropertyCallback,
              group: null as any,
            },
            {
              ...HREF_FIELD,
              hidden: (({ parent, value }) =>
                !value && parent?.internal) as ConditionalPropertyCallback,
              group: null as any,
            },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              components: { input: IconPicker },
              options: {
                icons: ICONS,
              } as any,
            },
          ],
        },
      ],
    },
  ],
});
