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
              <img
                src="/icons/check-circle.svg"
                alt="check"
                style={{
                  position: "absolute",
                  transform:
                    "translateX(-100%) translateX(-6px) translateY(-6px)",
                  width: 16,
                  height: 16,
                  display: "inline-block",
                }}
              />
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
        ],
      },
    },
    SCRIPT_REFERENCE_FIELD,
  ],
});
