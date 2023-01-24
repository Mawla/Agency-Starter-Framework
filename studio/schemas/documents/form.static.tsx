import { STATIC_FORMS, STATIC_FORM_OPTIONS } from "../../../types";
import { SchemaName } from "../../../types.sanity";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { optionsToList } from "../../utils/fields/optionsToList";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

export const SCHEMA_NAME: SchemaName = "form.static";

export default defineType({
  name: SCHEMA_NAME,
  title: "Static form",
  type: "document",
  icon: () => <DocumentIcon type="form" />,
  initialValue: {},
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the form used to identify it in the cms.",
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: "formId",
      title: "Form id",
      type: "string",
      validation: (Rule: StringRule) => Rule.required(),
      options: {
        direction: "horizontal",
        list: optionsToList(STATIC_FORMS),
      },
    }),
    defineField({
      name: "success",
      title: "Success message",
      type: "richtext.simple",
    }),
    defineField({
      name: "error",
      title: "Error message",
      type: "richtext.simple",
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "options",
          title: "Options",
          icon: () => <DocumentIcon type="form" />,
          preview: {
            select: {
              title: "key",
              subtitle: "value",
            },
          },
          fields: [
            defineField({
              name: "key",
              title: "Key",
              type: "string",
              options: {
                list: optionsToList(STATIC_FORM_OPTIONS),
              },
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});
