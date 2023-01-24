import { DocumentIcon } from "../../utils/DocumentIcon";
import buttonSchema from "../objects/button";
import React from "react";
import { defineType } from "sanity";

const INTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "internal"
);
const LANGUAGE_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "language"
);
const EXTERNAL_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "external"
);
const DIALOG_FIELD = buttonSchema.fields.find(({ name }) => name === "dialog");
const FILE_FIELD = buttonSchema.fields.find(({ name }) => name === "file");
const DOWNLOAD_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "download"
);
const PARAMS_FIELD = buttonSchema.fields.find(({ name }) => name === "params");
const NEW_WINDOW_FIELD = buttonSchema.fields.find(
  ({ name }) => name === "newWindow"
);

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
  icon: () => <DocumentIcon type="link" />,
  fields: [
    INTERNAL_FIELD,
    LANGUAGE_FIELD,
    EXTERNAL_FIELD,
    PARAMS_FIELD,
    DIALOG_FIELD,
    FILE_FIELD,
    DOWNLOAD_FIELD,
    NEW_WINDOW_FIELD,
  ],
});
