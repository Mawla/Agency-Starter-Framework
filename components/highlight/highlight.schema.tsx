import { COLORS } from "../../theme";
import { ColorType } from "../../types";
import { Color } from "@vectopus/atlas-icons-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "highlight",
  title: "Highlight",
  type: "object",
  icon: () => <Color weight="thin" />,
  components: {
    annotation: (props: any) => (
      <span
        style={{
          background:
            COLORS[(props?.value?.color?.background as ColorType) || "black"],
          color: COLORS[(props?.value?.color?.text as ColorType) || "black"],
        }}
      >
        {props.renderDefault(props)}
      </span>
    ),
  },
  fields: [
    defineField({
      name: "color",
      title: "Color",
      type: "styles",
      options: {
        fields: [
          {
            name: "text",
            type: "color",
          },
          {
            name: "background",
            type: "color",
          },
        ],
      },
    }),
  ],
});
