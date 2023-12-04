import { ArrayItemPreviewHighlight } from "../../studio/components/ArrayItemPreviewHighlight";
import BlockSlugField from "../../studio/components/BlockSlugField";
import { DecorationLocationSelect } from "../../studio/components/Decorations/DecorationLocationSelect";
import { CodeEditor } from "../../studio/components/Theme/CodeEditor";
import { defineField } from "sanity";

export const cssDecoration = defineField({
  name: "cssdecoration",
  title: "CSS Decoration",
  type: "object",
  components: {
    item: ArrayItemPreviewHighlight,
  },
  preview: {
    select: {
      title: "title",
      image: "image",
      html: "html",
    },
    prepare({ title, image, html }) {
      const isImage = Boolean(image);
      const isHTML = Boolean(html);

      return {
        title:
          title || (isImage && "Image") || (isHTML && "HTML") || "Decoration",
        media: image,
      };
    },
  },
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "position", title: "Size & Position" },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "A descriptive title for this decoration, used in the CMS.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
      components: {
        field: DecorationLocationSelect,
      },
      description: "Position the decoration inside or outside the block.",
    }),
    defineField({
      name: "breakout",
      title: "Breakout",
      type: "boolean",
      group: "content",
      description:
        "Stay inside the bounding box of the block or allow the decoration to break outside.",
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Use an image as decoration",
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.html || parent?.video),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageRepeat",
      type: "boolean",
      description: "Set image as repeating background",
      group: "content",
      hidden: ({ parent, value }) => !value && !Boolean(parent?.image),
    }),
    defineField({
      name: "video",
      type: "video",
      description: "Use a video as decoration",
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.html || parent?.image),
    }),
    defineField({
      name: "html",
      type: "text",
      description:
        "Use raw HTML. All potentially dangerous tags will be stripped.",
      rows: 4,
      group: "content",
      hidden: ({ parent, value }) =>
        !value && Boolean(parent?.image || parent?.video),
    }),
    defineField(
      {
        name: "slug",
        title: "Identifier",
        type: "slug",
        group: "style",
        description:
          "A unique identifier for this block, used for the css class name.",
        components: {
          input: BlockSlugField,
        },
        options: {
          prefix: ".",
          useTitle: false,
          disableArrayWarning: true,
          source: (doc, options) => (options.parent as any).title,
        },
      },
      { strict: false },
    ),
    defineField({
      name: "css",
      type: "text",
      description:
        "Use CSS to style the decoration. Use class .x { } to target the decoration, it will be replaced with a unique class name.",
      rows: 20,
      group: "style",
      components: {
        input: CodeEditor,
      },
      initialValue: `.x {
  
}

@media (min-width: 768px){
  .x {
    
  }
}

@media (min-width: 1024px){
  .x {
    
  }
}
      `,
    }),
  ],
});
