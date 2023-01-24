import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { getVideoPreview } from "../objects/video";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: "video" | "slug" | "language";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "dialog.video",
  title: "Video Dialog",
  type: "object",
  icon: () => <DocumentIcon type="video" />,
  preview: getVideoPreview("video."),
  fields: [
    {
      name: "language",
      title: "Language",
      type: "language",
    },
    {
      name: "slug",
      title: "Identifier",
      type: "slug",
      validation: (Rule: SlugRule) => Rule.required(),
      description:
        "Unique identifier used to link to this dialog from a button. Only lowercase and no special characters except -",
    },
    {
      name: "video",
      title: "Video",
      type: "video",
    },
  ],
};

export default schema;
