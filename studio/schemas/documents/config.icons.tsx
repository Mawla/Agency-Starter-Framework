import { PREDEFINED_ICONS } from "../../../types";
import { SchemaName } from "../../../types.sanity";
import ThemeIcons, {
  ThemeIconPreview,
} from "../../components/Theme/ThemeIcons";
import Warning from "../../components/Warning";
import { TargetArrowBullseye } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

export const SCHEMA_NAME: SchemaName = "config.icons";

export default defineType({
  name: SCHEMA_NAME,
  title: "Icons",
  type: "document",
  icon: () => <TargetArrowBullseye weight="thin" size={20} />,
  initialValue: {},
  preview: {
    prepare() {
      return {
        title: `Theme configuration`,
      };
    },
  },
  fields: [
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
      name: "predefined",
      title: "Icons",
      type: "object",
      description: "SVG Icons that are required by the theme.",
      components: { input: ThemeIcons },
      fields: Object.entries(PREDEFINED_ICONS).map(
        ([id, { title, description }]) =>
          defineField({
            name: id,
            title,
            description,
            type: "text",
            rows: 2,
            components: { input: ThemeIconPreview },
          }),
      ),
    }),
    defineField({
      name: "rest",
      title: "More icons",
      type: "array",
      description: "Additional SVG icons the user can select from the CMS.",
      of: [
        {
          name: "icon",
          title: "Icon",
          type: "object",
          preview: {
            select: {
              title: "title",
              icon: "icon",
            },
            prepare({ title, icon }) {
              return {
                title: `${title}`,
                media: icon ? (
                  <span dangerouslySetInnerHTML={{ __html: icon }} />
                ) : null,
              };
            },
          },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "text",
              rows: 6,
            }),
          ],
        },
      ],
    }),
  ],
});
