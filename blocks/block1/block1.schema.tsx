import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { SPACE_OPTIONS } from "../../components/block/spacing.options";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { BORDER_RADIUS_OPTIONS, VERTICAL_ALIGN_OPTIONS } from "../../types";
import {
  GAP_OPTIONS,
  LAYOUT_COLUMN_OPTIONS,
  MEDIA_POSITION_OPTIONS,
} from "./block1.options";
import { Image } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block1",
  title: "Text and Media",
  type: "object",
  icon: () => <Image weight="thin" />,
  description: "Text, image or video and feature list left or right",
  preview: {
    select: {
      title: "title",
      image: "image",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle, image, mobileImage }: any) {
      return {
        title: title || cmsTitle || "Block 1",
        media: image || mobileImage || <Image weight="thin" />,
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,

    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portabletext.full",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.video || parent?.script),
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "portabletext.full",
      group: "content",
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile image",
      description:
        'Image used on screens smaller than 768px wide. If not set, "Image" will be used.',
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.video || parent?.script),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.image || parent?.script),
    }),
    defineField({
      name: "script",
      title: "Script",
      type: "reference",
      to: [{ type: "script" }],
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.image || parent?.video),
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defineField({
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
              {
                name: "fullHeight",
                type: "boolean",
              },
              {
                name: "rounded",
                type: "select",
                options: {
                  list: optionsToList(BORDER_RADIUS_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
          name: "layout",
          title: "Layout",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "columns",
                title: "Grid columns",
                type: "select",
                options: {
                  list: optionsToList(LAYOUT_COLUMN_OPTIONS),
                },
              }),
              defineField({
                name: "gap",
                type: "select",
                options: {
                  list: optionsToList(GAP_OPTIONS),
                },
              }),
              defineField({
                name: "mediaPosition",
                title: "Media position",
                type: "select",
                options: {
                  list: optionsToList(MEDIA_POSITION_OPTIONS),
                },
              }),
              defineField({
                name: "verticalAlign",
                title: "Vertical align",
                type: "select",
                options: {
                  list: optionsToList(VERTICAL_ALIGN_OPTIONS),
                },
              }),
              defineField({
                name: "extendMediaWidth",
                type: "boolean",
              }),
            ],
          },
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "styles",
          options: {
            fields: [
              defineField({
                name: "verticalSpace",
                title: "Content space",
                type: "topbottom",
                options: {
                  list: optionsToList(SPACE_OPTIONS),
                },
              }),
            ],
          },
        }),
        defaultTitleTheme,
        defaultTextTheme,
        { ...defaultTextTheme, name: "body", title: "Body" },
        { ...defaultTextTheme, name: "footer", title: "Footer" },
      ],
    }),
    defineField({
      name: "decorations",
      title: "Decorations",
      type: "decorations",
      group: "decorations",
    }),
  ],
});

export default schema;
