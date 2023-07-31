import { BACKGROUND_COLOR_OPTIONS } from "../../components/block/background.options";
import buttonSchema from "../../components/buttons/button.schema";
import IconPicker from "../../studio/components/IconPicker";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { SchemaName } from "../../types.sanity";
import { ALIGN_OPTIONS } from "./navigation.options";
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
  options: { singleton: true },
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "theme", title: "Theme" },
  ],
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
      group: "content",
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
      group: "content",
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
            },
          ],
        },
      ],
    },
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
      fields: [
        defineField({
          name: "block",
          title: "Block",
          type: "styles",
          options: {
            fields: [
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
              },
              {
                name: "border",
                type: "color",
                title: "Bottom border",
              },
            ],
          },
        }),
        defineField({
          name: "menu",
          title: "Menu",
          type: "styles",
          options: {
            fields: [
              {
                name: "text",
                type: "color",
                title: "Link color",
              },
              {
                name: "align",
                type: "select",
                options: {
                  list: optionsToList(ALIGN_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "submenu",
          title: "Submenu",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
                title: "Background color",
              },
              {
                name: "text",
                type: "color",
                title: "Link color",
              },
            ],
          },
        }),
        defineField({
          name: "buttons",
          title: "Buttons",
          type: "styles",
          options: {
            fields: [
              {
                name: "background",
                type: "color",
                title: "Background color",
              },
              {
                name: "text",
                type: "color",
                title: "Link color",
              },
            ],
          },
        }),
      ],
    }),
  ],
});
