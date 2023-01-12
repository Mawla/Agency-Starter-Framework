import { SchemaName } from "../../../types.sanity";
import IconPicker from "../../components/IconPicker";
import { DocumentIcon } from "../../utils/DocumentIcon";
import { getLinkableTypes } from "../../utils/schemas/getLinkableTypes";
import buttonSchema from "../objects/button";
import React from "react";

export const SCHEMA_NAME: SchemaName = "navigation";

const LABEL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "label")[0],
};

const INTERNAL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "internal")[0],
  hidden: ({ parent, value }) => !value && parent?.external,
};

const LANGUAGE_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "language")[0],
  hidden: ({ parent, value }) => !value && parent?.external,
};

const EXTERNAL_FIELD = {
  ...buttonSchema.fields.filter(({ name }) => name === "external")[0],
  hidden: ({ parent, value }) => !value && parent?.internal,
};

const PREVIEW = {
  preview: {
    select: {
      label: "label",
      external: "external",
      children: "children",
    },
    prepare({ label, children = [], external }) {
      return {
        title: label || "[Empty]",
        subtitle: external
          ? external
          : children?.map(({ label }) => label).join(", "),
        media: label?.trim().length ? (
          <DocumentIcon type="link" />
        ) : (
          <DocumentIcon type="warning" />
        ),
      };
    },
  },
};

export default {
  name: SCHEMA_NAME,
  title: "Navigation",
  type: "document",
  singleton: true,
  icon: () => <DocumentIcon type="navigation" />,
  initialValue: {},
  localize: true,
  preview: {
    prepare() {
      return {
        title: `Navigation`,
      };
    },
  },
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          groups: [
            {
              name: "link",
              title: "Link",
            },
          ],
          ...PREVIEW,
          fields: [
            LABEL_FIELD,
            INTERNAL_FIELD,
            LANGUAGE_FIELD,
            EXTERNAL_FIELD,
            {
              name: "children",
              title: "Submenu",
              type: "array",
              description:
                "List of submenu buttons. Be sure not to add an internal or external link when adding a submenu.",
              of: [
                {
                  type: "object",
                  title: "Submenu",
                  groups: [
                    {
                      name: "link",
                      title: "Link",
                    },
                  ],
                  ...PREVIEW,
                  fields: [
                    LABEL_FIELD,
                    {
                      ...INTERNAL_FIELD,
                      hidden: ({ parent, value }) => !value && parent?.external,
                    },
                    {
                      ...LANGUAGE_FIELD,
                      hidden: ({ parent, value }) => !value && parent?.external,
                    },
                    {
                      ...EXTERNAL_FIELD,
                      hidden: ({ parent, value }) => !value && parent?.internal,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          title: "Button",
          fields: [
            { ...LABEL_FIELD, group: null },
            {
              ...INTERNAL_FIELD,
              hidden: ({ parent, value }) => !value && parent?.external,
              group: null,
            },
            {
              ...LANGUAGE_FIELD,
              hidden: ({ parent, value }) => !value && parent?.external,
              group: null,
            },
            {
              ...EXTERNAL_FIELD,
              hidden: ({ parent, value }) => !value && parent?.internal,
              group: null,
            },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              components: { input: IconPicker },
            },
          ],
        },
      ],
    },
  ],
};
