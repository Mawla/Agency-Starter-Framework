import { getVideoPreview } from "../../../components/video/video.schema";
import { DocumentIcon } from "../../utils/DocumentIcon";
import React from "react";
import { defineField, defineType, SlugRule } from "sanity";

const schema = defineType({
  name: "dialog.video",
  title: "Video Dialog",
  type: "object",
  icon: () => <DocumentIcon type="video" />,
  preview: getVideoPreview("video."),
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "language",
    }),
    defineField({
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      description:
        "Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
    }),
  ],
});

export default schema;
