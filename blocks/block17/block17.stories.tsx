import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
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
  title: "Blocks/Block17",
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
              text: "This software will",
              _key: "e142140e67870",
            },
            {
              _type: "span",
              marks: ["strong"],
              text: " change ",
              _key: "eea3e1f115dc",
            },
            {
              _type: "span",
              marks: [],
              text: "the ",
              _key: "d76d4a07f5e2",
            },
            {
              _type: "span",
              marks: ["em"],
              text: "way",
              _key: "5908e19c6315",
            },
            {
              _type: "span",
              marks: [],
              text: " you work it’s professional and saves time, giving you back ",
              _key: "489fbf3c1121",
            },
            {
              marks: ["b03490dc486e"],
              text: "lost hours spent",
              _key: "467b6d67c638",
              _type: "span",
            },
            {
              text: " on paperwork.",
              _key: "bef5e7f8ab6e",
              _type: "span",
              marks: [],
            },
          ],
        },
      ],
      image: demoImage2,
      name: "Arjen",
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
        outerBackground: "black",
        background: "white",
        width: "inner",
      },
    }}
    testimonials={[
      {
        ...(DEMO_CONTENT.testimonials || [])[0],
        content: <p>This is slide 1</p>,
      },
      (DEMO_CONTENT.testimonials || [])[0],
      (DEMO_CONTENT.testimonials || [])[0],
      (DEMO_CONTENT.testimonials || [])[0],
      {
        ...(DEMO_CONTENT.testimonials || [])[0],
        content: <p>And the last slide</p>,
      },
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
