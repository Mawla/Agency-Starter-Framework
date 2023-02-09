import buttonSchema from "./button.schema";
import { Chain } from "@vectopus/atlas-icons-react";
import React from "react";
import { defineType } from "sanity";

const INTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "internal",
) as any;
const LANGUAGE_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "language",
) as any;
const HREF_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "href",
) as any;
const DIALOG_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "dialog",
) as any;
const FILE_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "file",
) as any;
const DOWNLOAD_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "download",
) as any;
const PARAMS_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "params",
) as any;
const NEW_WINDOW_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "newWindow",
) as any;

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  groups: [
    {
      name: "link",
      title: "Link",
    },
  ],
  icon: () => <Chain weight="thin" />,
  fields: [
    INTERNAL_FIELD,
    LANGUAGE_FIELD,
    HREF_FIELD,
    PARAMS_FIELD,
    DIALOG_FIELD,
    FILE_FIELD,
    DOWNLOAD_FIELD,
    NEW_WINDOW_FIELD,
  ],
});
