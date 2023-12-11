import {
  defaultBlockTheme,
  defaultBlockGroups,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { Tables } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block5",
  title: "Pricing comparison tables",
  type: "object",
  icon: () => <Tables weight="thin" />,
  description: "Compare pricing features ",
  preview: {
    select: {
      title: "title",
      intro: "intro",
      cmsTitle: "cmsTitle",
    },
    prepare({ title, cmsTitle, intro }: any) {
      return {
        title: title || cmsTitle || "Pricing comparison tables",
        subtitle: blocksToText(intro),
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
      title: "Intro",
      type: "portabletext.simple",
      group: "content",
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [defaultBlockTheme, defaultTitleTheme, defaultTextTheme],
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
