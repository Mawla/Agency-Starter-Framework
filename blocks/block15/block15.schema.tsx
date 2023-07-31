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
    },
    prepare({ title = "Split text", body1, body2 }: any) {
      return {
        title,
        subtitle: `${blocksToText(body1)} ${blocksToText(body2)}`,
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
      name: "body1",
      title: "Body left",
      type: "portabletext.basic",
      group: "content",
    }),
    defineField({
      name: "body2",
      title: "Body right",
      type: "portabletext.basic",
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
        { ...defaultTextTheme, name: "body1", title: "Body left" },
        { ...defaultTextTheme, name: "body2", title: "Body right" },
      ],
    }),
  ],
});

export default schema;
