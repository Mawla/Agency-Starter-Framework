import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { BORDER_RADIUS_OPTIONS } from "../../types";
import { AlignCenter } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block4",
  title: "Default content",
  type: "object",
  icon: () => <AlignCenter weight="thin" />,
  description: "Basic title, intro, buttons and image or video block",
  preview: {
    select: {
      title: "title",
      image: "image",
      body: "body",
      intro: "intro",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle, intro, body, image }: any) {
      return {
        title: title || cmsTitle || "Default content",
        subtitle: `${blocksToText(intro)} ${blocksToText(body)}`,
        media: image || <AlignCenter weight="thin" />,
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
      name: "subtitle",
      title: "Subtitle",
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
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
      group: "content",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defaultBlockTheme,
        defaultTitleTheme,
        { ...defaultTitleTheme, name: "subtitle" },
        defaultTextTheme,
        { ...defaultTextTheme, name: "body" },
        defineField({
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
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
