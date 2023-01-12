import { BackgroundColorType } from "../../../components/module/BackgroundOptions";
import {
  SpaceType,
  SPACE_OPTIONS,
} from "../../../components/module/SpacingOptions";
import { BreadcrumbProps } from "../../../modules/Breadcrumb/Breadcrumb";
import { ColorType } from "../../../types";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { prefixWithLanguage } from "../../utils/language/prefix-with-language";
import { EllipsisVerticalIcon } from "@sanity/icons";
import React from "react";

type SchemaType = SanitySchemaType & {
  type: "object";

  initialValue: {
    theme?: {
      text?: ColorType;
      background?: BackgroundColorType;
      space?: SpaceType;
    };
  };
  fields: ({
    name: keyof BreadcrumbProps | "language" | "preset" | "copyPaste";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "module.breadcrumb",
  title: "Breadcrumb",
  type: "object",
  description: "Navigation path",
  icon: () => <DocumentIcon type="breadcrumb" />,
  initialValue: {
    theme: {
      background: "white",
      text: "black",
    },
  },
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title = "Breadcrumb", language }) {
      return {
        title: title,
        subtitle: prefixWithLanguage(language),
      };
    },
  },
  groups: [
    {
      name: "theme",
      title: "Theme",
      default: true,
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
      type: "styles",
      group: "theme",
      options: {
        fields: [
          {
            name: "text",
            title: "Text",
            type: "color",
          },
          {
            name: "background",
            title: "Background",
            type: "color",
          },
          {
            name: "space",
            title: "Space",
            type: "space",
            options: {
              list: optionsToList(SPACE_OPTIONS),
            },
          },
        ],
      },
    },
  ],
};

export default schema;
