import { baseLanguage } from "../../../languages";
import { SanityFieldType, SchemaName } from "../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { ORDER_PUBLISHED_DESC, pageBase, PUBLISHED_AT_FIELD } from "./_page";
import contentPage from "./page.content";
import React from "react";

export const SCHEMA_NAME: SchemaName = "page.pressrelease";

const fields = [...contentPage.fields] as SanityFieldType[];
const parentFieldIndex = fields.findIndex(({ name }) => name === "parent");

fields.splice(parentFieldIndex + 1, 0, {
  name: "image",
  title: "Image",
  type: "image",
  description: "Used in the press releases grid module",
});

export default {
  name: SCHEMA_NAME,
  title: "Press release",
  type: "document",
  singleton: false,
  orderings: [ORDER_PUBLISHED_DESC],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      image: "image",
      heroImage: "hero.0.visual.image1",
      date: "publishedAt",
    },
    prepare({ title, date, image, heroImage }) {
      return {
        title: `${title}`,
        subtitle: `${date}`,
        media: image || heroImage,
      };
    },
  },
  icon: () => <DocumentIcon type="pressrelease" />,
  initialValue: {
    ...pageBase.initialValue,
  },
  fieldsets: [...pageBase.fieldsets],
  fields: [...fields, PUBLISHED_AT_FIELD],
};
