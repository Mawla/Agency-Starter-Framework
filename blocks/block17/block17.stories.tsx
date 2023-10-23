import { demoImage2 } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block17, Block17Props } from "./Block17";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block17,
  title: "Blocks/17. Testimonial Poster",
} as Meta;

const DEMO_CONTENT: Block17Props = {
  theme: {
    testimonial: {
      jobTitle: {
        color: "black",
        size: "xl",
        weight: "normal",
      },
      name: {
        color: "black",
        size: "xl",
        weight: "semibold",
      },
      title: {
        color: "black",
        size: "xl",
      },
      content: {
        size: "4xl",
        weight: "normal",
        color: "black",
      },
    },
    block: {
      margin: {
        top: "sm",
        bottom: "sm",
      },
      background: "white",
      width: "inner",
      rounded: {
        top: "md",
        bottom: "md",
      },
    },
  },
  testimonials: [
    {
      jobTitle: "job title",
      title: "This is very cool",
      content: [
        {
          _type: "block",
          style: "normal",
          _key: "3b7352913da1",
          markDefs: [
            {
              color: {
                background: "gray-950",
                text: "white",
              },
              _type: "color",
              _key: "b03490dc486e",
            },
          ],
          children: [
            {
              _type: "span",
              marks: [],
              text: "This software will change the way you work it’s professional and saves time, giving you back lost hours spent on paperwork.",
              _key: "e142140e67870",
            },
          ],
        },
      ],
      image: demoImage2,
      name: "Arjen",
    },
    {
      title: "This is very cool!",
      content: [
        {
          _type: "block",
          style: "normal",
          _key: "3b7352913da1",
          markDefs: [
            {
              color: {
                background: "gray-950",
                text: "white",
              },
              _type: "color",
              _key: "b03490dc486e",
            },
          ],
          children: [
            {
              _type: "span",
              marks: [],
              text: "This is a somewhat longer quote. This software will change the way you work it’s professional and saves time, giving you back lost hours spent on paperwork.",
              _key: "e142140e67870",
            },
          ],
        },
      ],
      image: demoImage2,
      name: "Bonnie Bonnie Bonnie Green Blue Red",
      jobTitle: "CTO at Open AI CTO at Open AI CTO at Open AI",
    },
  ],
};

export const Theme = () => <Block17 {...DEMO_CONTENT} />;
export const Single = () => (
  <Block17 testimonials={DEMO_CONTENT.testimonials} />
);
export const Multiple = () => (
  <Block17
    theme={{
      block: {
        margin: {
          top: "xl",
          bottom: "xl",
        },
        // outerBackground: "black",
        // background: "white",
        width: "inner",
        rounded: {
          top: "lg",
          bottom: "lg",
        },
      },
      testimonial: {
        title: {
          size: "base",
          weight: "normal",
        },
        content: {
          size: "3xl",
        },
        name: {
          size: "base",
          weight: "bold",
        },
        jobTitle: {
          size: "base",
          weight: "normal",
        },
      },
    }}
    testimonials={[
      (DEMO_CONTENT.testimonials || [])[1],
      (DEMO_CONTENT.testimonials || [])[0],
      (DEMO_CONTENT.testimonials || [])[0],
    ]}
  />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block17
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
          }}
        />
      </div>
    ))}
  </>
);

export const Alignments = () => (
  <>
    {(Object.keys(HORIZONTAL_ALIGN_OPTIONS) as HorizontalAlignType[]).map(
      (align) => (
        <div key={align}>
          <Block17
            {...DEMO_CONTENT}
            theme={{
              block: { align },
            }}
          />
        </div>
      ),
    )}
  </>
);
