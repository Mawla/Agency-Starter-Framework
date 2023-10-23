import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoImage } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block7, Block7Props } from "./Block7";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block7,
  title: "Blocks/7. Item Shelf",
} as Meta;

const items = [
  {
    items: [{ image: demoImage, link: { href: "https://google.com" } }],
    key: "a",
  },
  { items: [{ image: demoImage }, { image: demoImage }], key: "b" },
  {
    items: [{ image: demoImage }, { image: demoImage }, { image: demoImage }],
    key: "c",
  },
  {
    items: [
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
    ],
    key: "d",
  },
  {
    items: [
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
    ],
    key: "e",
  },
  {
    items: [
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
      { image: demoImage },
    ],
    key: "f",
  },
];

const DEMO_CONTENT: Block7Props = {
  title: "Diam",
  intro: (
    <p>
      Ornare tortor enim non vitae ac iaculis in non nibh. Nec ultrices interdum
      vitae blandit egestas sit. Platea phasellus congue elit volutpat fermentum
      nullam quam enim. Eu consequat id.
    </p>
  ),

  buttons: [{ label: "Button" }],
  items: [{ image: demoImage }, { image: demoImage }, { image: demoImage }],
};

export const Default = () => <Block7 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block7
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
          <Block7
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

export const TitleColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block7
          title={DEMO_CONTENT.title}
          theme={{
            title: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleSizes = () => (
  <>
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
      <div key={size}>
        <Block7
          title={DEMO_CONTENT.title}
          theme={{
            title: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block7
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroSizes = () => (
  <>
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
      <div key={size}>
        <Block7
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const Items = () => (
  <>
    {items.reverse().map((item) => (
      <div key={item.key}>
        <Block7
          intro={DEMO_CONTENT.intro}
          title={DEMO_CONTENT.title}
          items={item.items}
        />
      </div>
    ))}
  </>
);
