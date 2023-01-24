import { SPACE_OPTIONS } from "../../../components/module/SpacingOptions";
import { WIDTH_OPTIONS } from "../../../components/module/WidthOptions";
import { StoryProps } from "../../../modules/Story/Story";
import { STORY_ALIGN_OPTIONS } from "../../../modules/Story/StoryOptions";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import buttonSchema from "../objects/button";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

const INTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "internal"
);
const EXTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "external"
);
const DIALOGS_FIELD = buttonSchema.fields.find(({ name }) => name === "dialog");

type SchemaType = SanitySchemaType & {
  type: "object";
  fields: ({
    name: keyof StoryProps | "language" | "preset" | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "module.story",
  title: "Story",
  type: "object",
  icon: () => <DocumentIcon type="quote" />,
  description: "Employee testimonial with photo",
  preview: {
    select: {
      quote: "quote",
      person: "person.name.en",
      language: "language",
      image: "image",
      backgroundImage: "backgroundImage",
    },
    prepare({ quote, person, language, image, backgroundImage }: any) {
      return {
        title: quote,
        subtitle: prefixWithLanguage(language, person),
        media: image || backgroundImage,
      };
    },
  },
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "theme",
      title: "Theme",
    },
    {
      name: "language",
      title: "Language",
    },
    {
      name: "tools",
      title: " ",
      icon: EllipsisVerticalIcon,
    },
  ],
  fields: [
    {
      name: "label",
      title: "Label",
      type: "string",
      group: "content",
    },
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 2,
      group: "content",
      description: "Testimonial quote.",
    },
    {
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
      group: "content",
      description: "Short additional paragraph.",
    },
    {
      name: "person",
      title: "Person",
      type: "reference",
      to: [{ type: "person" }],
      group: "content",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      description:
        "Square image. Preferred size: 1200x1200. Format transparent PNG.",
      options: {
        hotspot: true,
      },
    },
    {
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      group: "content",
      description:
        "Wide photo used on the background. Should at least be 3520px wide. Format JPG",
      options: {
        hotspot: true,
      },
    },
    {
      type: "object",
      name: "videoLink",
      title: "Video link",
      fields: [INTERNAL_FIELD, DIALOGS_FIELD, EXTERNAL_FIELD].map((x) => ({
        ...x,
        group: null,
      })),
      group: "content",
    },
    {
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
    },
    {
      name: "preset",
      title: "Preset",
      type: "preset",
      group: "tools",
    },
    {
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
    },
    {
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        {
          name: "module",
          title: "Module",
          type: "styles",
          options: {
            fields: [
              {
                name: "space",
                type: "space",
                options: {
                  list: optionsToList(SPACE_OPTIONS),
                },
              },
              // {
              //   name: 'background',
              //   type: 'color',
              //   options: {
              //     colors: STORY_BACKGROUND_COLOR_OPTIONS,
              //   },
              // },
              {
                name: "width",
                type: "select",
                options: {
                  list: optionsToList(WIDTH_OPTIONS),
                },
              },
            ],
          },
        },
        {
          name: "image",
          title: "Image",
          type: "styles",
          options: {
            fields: [
              {
                name: "align",
                type: "select",
                options: {
                  list: optionsToList(STORY_ALIGN_OPTIONS),
                },
              },
            ],
          },
        },
      ],
    },
  ],
};

export default schema;
