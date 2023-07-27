import {
  defaultBlockGroups,
  defaultBlockTheme,
} from "../../components/block/block.schema";
import { defaultTextTheme } from "../../components/text/text.schema";
import { defaultTitleTheme } from "../../components/title/title.schema";
import { defaultBlockTools } from "../../studio/schemas/objects/tools";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { VideoPlayerWebsite } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineField, defineType } from "sanity";

const schema = defineType({
  name: "block.block9",
  title: "Video embed content",
  type: "object",
  icon: () => <VideoPlayerWebsite weight="thin" />,
  description: "Basic title, intro, buttons and video block",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title = "Video embed content" }: any) {
      return {
        title: title,
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
      name: "video",
      title: "Video",
      type: "video",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "buttongroup",
      group: "content",
    }),

    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [defaultBlockTheme, defaultTitleTheme, defaultTextTheme],
    }),
  ],
});

export default schema;
