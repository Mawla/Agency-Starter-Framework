import {
  defaultBlockTheme,
  defaultBlockGroups,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { LayoutHalfVertical } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block15",
  title: "Split text",
  type: "object",
  icon: () => <LayoutHalfVertical weight="thin" />,
  description: "Side by side text block",
  preview: {
    select: {
      title: "title",
      body: "body",
      intro: "intro",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle, intro, body }: any) {
      return {
        title: title || cmsTitle || "Split text",
        subtitle: `${blocksToText(intro)} ${blocksToText(body)}`,
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro (left)",
      type: "portabletext.full",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body (right)",
      type: "portabletext.full",
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
        { ...defaultTextTheme, name: "intro", title: "Intro (left)" },
        { ...defaultTextTheme, name: "body", title: "Body (right)" },
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
