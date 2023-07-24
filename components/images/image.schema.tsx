import React from "react";
import { defineField, defineType } from "sanity";

const ImagePreview = (props: any) => {
  if (!props?.media?.asset?.url)
    return (
      <div
        style={{
          aspectRatio: "4/3",
          width: "100%",
          border: "1px solid rgba(0,0,0,.1)",
          backgroundColor: "rgba(0,0,0,.05)",
        }}
      />
    );
  return (
    <img
      src={`${props?.media?.asset?.url}?w=550`}
      style={{ maxWidth: "100%" }}
    />
  );
};

const schema = defineType({
  name: "image.simple",
  title: "Image",
  type: "object",
  components: {
    preview: ImagePreview,
  },
  preview: {
    select: {
      alt: "alt",
      caption: "caption",
      media: "source",
      src: "source.asset.url",
    },
    prepare({ alt = "", caption = "", type = "", media }: any) {
      return {
        title: `${alt} ${caption}`,
        subtitle: type,
        media,
      };
    },
  },
  fieldsets: [
    {
      name: "imageOptions",
      title: "Image options",
      options: { collapsed: true, collapsible: true },
    },
  ],
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative text",
      description:
        "The alternative text is used to describe the image for screen readers.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Optional caption to display with the image. Only shown on the website when layout allows for it.",
    }),
  ],
});

export default schema;

export const defaultImageTheme = defineField({
  name: "image",
  title: "Image",
  type: "styles",
  options: {
    fields: [
      {
        name: "preserveAspectRatio",
        type: "boolean",
      },
    ],
  },
});
