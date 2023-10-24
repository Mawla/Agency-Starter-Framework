import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoImage, demoLogo1, demoLogo2 } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block16, Block16Props } from "./Block16";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block16,
  title: "Blocks/16. Logo Grid",
} as Meta;

const DEMO_LOGOS: Block16Props["items"] = [
  {
    _key: "c173f2fe5fb7",
    title: "Item 1",
    image: demoLogo1,
  },
  {
    _key: "bcf3d1b187cf",
    title: "Item 2",
    image: demoLogo2,
  },
  {
    _key: "3b45427f5e66",
    title: "Item 3",
    image: demoImage,
  },
  {
    _key: "3b45427f5e66",
    title: "Item 3",
    image: demoImage,
  },
];

const DEMO_CONTENT: Block16Props = {
  title: "title",
  intro: <p>intro</p>,
  buttons: [{ label: "Button" }],
  items: [...DEMO_LOGOS],
};

export const Default = () => <Block16 {...DEMO_CONTENT} />;

export const Items = () => (
  <div className="divide-y">
    <Block16 items={[...DEMO_LOGOS.slice(0, 1)]} />
    <Block16 items={[...DEMO_LOGOS.slice(0, 2)]} />
    <Block16 items={[...DEMO_LOGOS.slice(0, 3)]} />
    <Block16 items={[...DEMO_LOGOS.slice(0, 4)]} />
    <Block16 items={[...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 1)]} />
    <Block16 items={[...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 2)]} />
    <Block16 items={[...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 3)]} />
    <Block16 items={[...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 4)]} />
    <Block16
      items={[...DEMO_LOGOS, ...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 1)]}
    />
    <Block16
      items={[...DEMO_LOGOS, ...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 2)]}
    />
    <Block16
      items={[...DEMO_LOGOS, ...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 3)]}
    />
    <Block16
      items={[...DEMO_LOGOS, ...DEMO_LOGOS, ...DEMO_LOGOS.slice(0, 4)]}
    />
  </div>
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block16
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
          <Block16
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
        <Block16
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
        <Block16
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
        <Block16
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
        <Block16
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
