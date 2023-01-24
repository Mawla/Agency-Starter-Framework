import { ButtonProps } from "../../../components/buttons/Button";
import {
  ICON_POSITION_OPTIONS,
  IconPositionType,
  VARIANT_OPTIONS,
} from "../../../components/buttons/ButtonOptions";
import { SanityFieldType, SanitySchemaType } from "../../../types.sanity";
import DialogSelect, {
  DialogSelectWrapper,
} from "../../components/DialogSelect";
import IconPicker from "../../components/IconPicker";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import { getLinkableTypes } from "../../utils/schemas/getLinkableTypes";
import React from "react";
import { ConditionalPropertyCallback } from "sanity";

type SchemaType = SanitySchemaType & {
  type: "object";
  initialValue: {
    variant?: ButtonProps["variant"];
    iconPosition?: IconPositionType;
  };
  fields: ({
    name:
      | keyof ButtonProps
      | "external"
      | "internal"
      | "dialog"
      | "params"
      | "file"
      | "language"
      | "newWindow";
  } & SanityFieldType)[];
};

const schema: SchemaType = {
  name: "button",
  title: "Button",
  type: "object",
  initialValue: {
    variant: "primary",
    iconPosition: "after",
  },
  groups: [
    {
      name: "link",
      title: "Link",
      default: true,
    },
    {
      name: "theme",
      title: "Theme",
    },
  ],
  fields: [
    {
      name: "label",
      title: "Label",
      type: "string",
      group: "link",
    },
    {
      name: "external",
      title: "External link",
      description: "Link to a website, e.g https://www.example.com.",
      type: "string",
      group: "link",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.internal ||
          parent?.dialog ||
          parent?.file)) as ConditionalPropertyCallback,
    },
    {
      name: "internal",
      title: "Internal link",
      type: "reference",
      group: "link",
      description: "Internal link to a page or article.",
      to: getLinkableTypes(),
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.external ||
          parent?.dialog ||
          parent?.file)) as ConditionalPropertyCallback,
    },
    {
      name: "language",
      title: "Language",
      type: "language",
      group: "link",
      description: "Switch to a different language version of the page.",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.external ||
          parent?.dialog ||
          parent?.file)) as ConditionalPropertyCallback,
    },
    {
      name: "params",
      title: "Extra url parameters",
      type: "string",
      group: "link",
      description:
        "Use this for a #hash or ?querystring. This field is not automatically updated when the destination changes.",
      hidden: ({ parent, value }) =>
        !value && (parent?.external || parent?.dialog || parent?.file),
      validation: (Rule: any) =>
        Rule.custom((value) => {
          if (typeof value === "undefined") return true; // Allow undefined values
          if (!value.startsWith("#") && !value.startsWith("?"))
            return `This field must start with either # or ?.`;
          return true;
        }),
    },
    {
      name: "dialog",
      title: "Dialog",
      type: "string",
      group: "link",
      description: "Open a dialog on this page",
      components: {
        field: DialogSelectWrapper,
        input: DialogSelect,
      },
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.internal ||
          parent?.external ||
          parent?.file)) as ConditionalPropertyCallback,
    },
    {
      name: "file",
      title: "File",
      type: "file",
      group: "link",
      hidden: (({ parent, value }) =>
        !value &&
        (parent?.external ||
          parent?.dialog ||
          parent?.internal)) as ConditionalPropertyCallback,
    },
    {
      name: "download",
      title: "Download",
      type: "boolean",
      group: "link",
      initialValue: false,
      description: "Make the button download the file",
      hidden: (({ parent, value }) =>
        !value &&
        !(parent?.file || parent?.external)) as ConditionalPropertyCallback,
    },
    {
      name: "newWindow",
      title: "Open in new window",
      type: "boolean",
      group: "link",
      initialValue: false,
      description: "Make the button open in a new browser window",
    },
    {
      name: "variant",
      title: "Variant",
      type: "string",
      group: "theme",
      description: "Choose styling option.",
      options: {
        list: optionsToList(VARIANT_OPTIONS),
      },
    },
    {
      name: "alt",
      title: "Alt",
      type: "boolean",
      group: "theme",
      description: "Remove background color.",
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      group: "theme",
      components: { input: IconPicker },
    },
    {
      name: "iconPosition",
      title: "Icon position",
      type: "string",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: optionsToList(ICON_POSITION_OPTIONS),
      },
      initialValue: "after",
      group: "theme",
      description: "Make the button stretch as wide as it can go.",
    },
  ],
  preview: {
    select: {
      label: "label",
      external: "external",
    },
    prepare({ label = "", external }) {
      return {
        title: label,
        subtitle: external ? external : null,
        media: <DocumentIcon type="link" />,
      };
    },
  },
};

export default schema;
