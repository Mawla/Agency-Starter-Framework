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
import { Block3 } from "./Block3";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block3,
  title: "Blocks/Block3",
} as Meta;

const DEMO_CONTENT = {
  title: "Start your free trial today",
  intro: <p>Try Platform for 30 days. No credit card required. </p>,
  buttons: [{ label: "Free trail", href: "/" }],
};

export const Default = () => <Block3 {...DEMO_CONTENT} />;
export const Image = () => (
  <Block3
    {...DEMO_CONTENT}
    image={demoImage}
    theme={{
      block: {
        space: {
          top: "xl",
          bottom: "xl",
        },
      },
      title: {
        color: "white",
      },
      intro: {
        color: "white",
      },
      image: {
        gradientFromOpacity: 0.5,
        gradientToOpacity: 0.2,
      },
    }}
  />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block3
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block3
          {...DEMO_CONTENT}
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
        <Block3
          title="Block3"
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
        <Block3
          intro={<p>Block3</p>}
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
        <Block3
          intro={<p>Block3</p>}
          theme={{
            intro: { size },
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
          <Block3
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
