import buttonSchema from "../../components/buttons/button.schema";
import { SPACE_OPTIONS } from "../../components/module/spacing.options";
import { WIDTH_OPTIONS } from "../../components/module/width.options";
import { optionsToList } from "../../studio/utils/fields/optionsToList";
import { STORY_ALIGN_OPTIONS } from "./story.options";
import { EllipsisVerticalIcon } from "@sanity/icons";
import { StarMedalAward } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType, defineField } from "sanity";

const INTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "internal",
);
const EXTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "external",
);
const DIALOGS_FIELD = buttonSchema.fields.find(({ name }) => name === "dialog");

const schema = defineType({
  name: "module.story",
  title: "Story",
  type: "object",
  icon: () => <StarMedalAward weight="thin" />,
  description: "Employee testimonial with photo",
  preview: {
    select: {
      quote: "quote",
      person: "person.name.en",
      image: "image",
      backgroundImage: "backgroundImage",
    },
    prepare({ quote, person, image, backgroundImage }: any) {
      return {
        title: quote,
        subtitle: person,
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
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 2,
      group: "content",
      description: "Testimonial quote.",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
      group: "content",
      description: "Short additional paragraph.",
    }),
    defineField({
      name: "person",
      title: "Person",
      type: "reference",
      to: [{ type: "person" }],
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      description:
        "Square image. Preferred size: 1200x1200. Format transparent PNG.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      group: "content",
      description:
        "Wide photo used on the background. Should at least be 3520px wide. Format JPG",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      type: "object",
      name: "videoLink",
      title: "Video link",
      fields: [INTERNAL_FIELD, DIALOGS_FIELD, EXTERNAL_FIELD].map(
        (x) =>
          ({
            ...x,
            group: null,
          } as any),
      ),
      group: "content",
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "language",
      group: "language",
    }),
    defineField({
      name: "preset",
      title: "Preset",
      type: "preset",
      group: "tools",
    }),
    defineField({
      name: "copyPaste",
      title: "Copy Paste",
      type: "copyPaste",
      group: "tools",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "object",
      group: "theme",
      fields: [
        defineField({
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
              {
                name: "width",
                type: "select",
                options: {
                  list: optionsToList(WIDTH_OPTIONS),
                },
              },
            ],
          },
        }),
        defineField({
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
        }),
      ],
    }),
  ],
});

export default schema;
