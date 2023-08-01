import {
  defaultBlockTheme,
  defaultBlockGroups,
} from "../../components/block/block.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { blocksToText } from "../../studio/utils/portableText/portableTextToText";
import { NewspaperArticle } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block14",
  title: "Article",
  type: "object",
  icon: () => <NewspaperArticle weight="thin" />,
  description: "Long form resource content with sidebar",
  preview: {
    select: {
      body: "body",
    },
    prepare({ body = "Article" }: any) {
      return {
        title: blocksToText(body),
      };
    },
  },
  groups: defaultBlockGroups,
  fields: [
    ...defaultBlockTools,
    defineField({
      name: "body",
      title: "Body",
      type: "portabletext.full",
      group: "content",
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        {
          ...defaultBlockTheme,
          options: {
            ...(defaultBlockTheme.options as {}),
            fields: (
              defaultBlockTheme.options as { fields: { name: string }[] }
            ).fields.filter((field) => field.name !== "align"),
          },
        },
      ],
    }),
  ],
});

export default schema;
