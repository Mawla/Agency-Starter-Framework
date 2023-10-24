import { WIDTH_OPTIONS } from "../../components/block/width.options";
import DocumentPreview from "../../studio/components/Preview/DocumentPreview";
import Warning from "../../studio/components/Warning";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { SchemaName } from "../../types.sanity";
import { ALIGN_OPTIONS } from "./navigation.options";
import {
  Chain,
  JustifyAll,
  TriangleExclamation,
} from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "navigation";

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
      name: "items",
      title: "Items",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          preview: {
            select: {
              label: "button.label",
              href: "href",
              children: "children",
            },
            prepare({ label, children = [], href }: any) {
              return {
                title: label || "[Empty]",
                subtitle: href
                  ? href
                  : children
                      ?.map(({ label }: { label: string }) => label)
                      .join(", "),
                media: label?.trim().length ? (
                  <Chain weight="thin" size={20} />
                ) : (
                  <TriangleExclamation weight="thin" size={20} />
                ),
              };
            },
          },
          fields: [
            defineField({
              name: "button",
              type: "button",
            }),
            {
              name: "children",
              title: "Submenu",
              type: "array",
              description: "List of submenu buttons.",
              of: [{ title: "Button", type: "button" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      group: "content",
      of: [{ title: "Button", type: "button" }],
    }),
    defineField({
      name: "banner",
      type: "object",
      title: "Banner",
      group: "content",
      description: "Message or call to action above the navigation",
      fields: [
        defineField({
          name: "content",
          title: "Content",
          type: "text",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "link",
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
              {
                name: "width",
                type: "select",
                options: {
                  list: optionsToList(WIDTH_OPTIONS),
                },
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
            ],
          },
        }),
        defineField({
          name: "banner",
          title: "Banner",
          type: "styles",
          options: {
            fields: [
              {
                name: "hidden",
                type: "boolean",
              },
              {
                name: "background",
                type: "color",
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
          name: "breadcrumb",
          title: "Breadcrumb",
          type: "styles",
          options: {
            fields: [
              {
                name: "hidden",
                type: "boolean",
              },
              {
                name: "background",
                type: "color",
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
      ],
    }),
  ],
});
