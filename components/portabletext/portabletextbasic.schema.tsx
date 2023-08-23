import { SCRIPT_REFERENCE_FIELD } from "../script/script.schema";
import { defineField } from "sanity";

export default defineField({
  name: "portabletext.basic",
  title: "Rich Text",
  type: "array",
  of: [
    {
      type: "block",
      title: "Rich text",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
        {
          title: "Check",
          value: "check",
          component: ({ children }) => (
            <span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  transform:
                    "translateX(-100%) translateX(-6px) translateY(-2px)",
                  width: 16,
                  height: 16,
                  display: "inline-block",
                }}
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="currentColor"
                ></path>
              </svg>
              {children}
            </span>
          ),
          icon: () => (
            <svg
              viewBox="0 0 25 25"
              width="1em"
              height="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 8h9V7h-9v1Zm0 5h9v-1h-9v1Zm0 5h9v-1h-9v1Z"
                fill="#000"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.707 8 9 5.707 8.293 5 6 7.293 4.707 6 4 6.707 5.293 8 6 8.707 6.707 8ZM6.707 13 9 10.707 8.293 10 6 12.293 4.707 11 4 11.707 5.293 13l.707.707.707-.707ZM6.707 18 9 15.707 8.293 15 6 17.293 4.707 16 4 16.707 5.293 18l.707.707.707-.707Z"
                fill="#000"
              />
            </svg>
          ),
        },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "link",
            options: {
              modal: { type: "dialog" },
            },
          },
          {
            name: "color",
            title: "Color",
            type: "highlight",
            options: {
              modal: { type: "dialog" },
            },
          },
        ],
      },
    },
    { type: "image.simple" },
    { type: "video" },
    SCRIPT_REFERENCE_FIELD,
  ],
});
