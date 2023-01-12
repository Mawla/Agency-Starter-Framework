import { baseLanguage } from "../../../languages";
import { SanityFieldType, SchemaName } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { ORDER_PUBLISHED_DESC, pageBase } from "./_page";
import contentPage from "./page.content";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.department";

const fields = [...contentPage.fields] as SanityFieldType[];
const parentFieldIndex = fields.findIndex(({ name }) => name === "parent");

fields.splice(parentFieldIndex + 1, 0, {
  name: "workableDepartment",
  title: "Workable department",
  type: "reference",
  weak: true,
  to: [{ type: "workable.department" }],
});

fields.splice(parentFieldIndex + 2, 0, {
  name: "image",
  title: "Image",
  type: "image",
  description: "Used in the departments grid module",
});

fields.splice(parentFieldIndex + 3, 0, {
  name: "description",
  title: "Description",
  localize: true,
  type: "text",
  rows: 2,
  description: "Used in the departments grid module",
});

export default {
  name: SCHEMA_NAME,
  title: "Department",
  type: "document",
  singleton: false,
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.visual.image1",
    },
  },
  icon: () => <DocumentIcon type="department" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: fields,
};
