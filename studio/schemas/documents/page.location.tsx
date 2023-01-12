import { baseLanguage } from "../../../languages";
import { SanityFieldType, SchemaName } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { pageBase } from "./_page";
import contentPage from "./page.content";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.location";

const fields = [...contentPage.fields] as SanityFieldType[];
const parentFieldIndex = fields.findIndex(({ name }) => name === "parent");

fields.splice(parentFieldIndex + 1, 0, {
  name: "workableLocation",
  title: "Workable location",
  type: "reference",
  weak: true,
  to: [{ type: "workable.location" }],
});

export default {
  name: SCHEMA_NAME,
  title: "Location",
  type: "document",
  singleton: false,
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      media: "hero.0.visual.image1",
    },
  },
  icon: () => <DocumentIcon type="location" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: fields,
};
