import { demoImage } from "../../stories/content";
import { Block3 } from "./Block3";
import {
  AlignType,
  ALIGN_OPTIONS,
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  IntroColorType,
  IntroSizeType,
  INTRO_COLOR_OPTIONS,
  INTRO_SIZE_OPTIONS,
  TitleColorType,
  TitleSizeType,
  TITLE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./block3.options";
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

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block3
            {...DEMO_CONTENT}
            theme={{
              block: { background: color },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(TITLE_COLOR_OPTIONS) as TitleColorType[]).map((color) => (
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
    {(Object.keys(INTRO_COLOR_OPTIONS) as IntroColorType[]).map((color) => (
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
    {(Object.keys(INTRO_SIZE_OPTIONS) as IntroSizeType[]).map((size) => (
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
    {(Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align) => (
      <div key={align}>
        <Block3
          {...DEMO_CONTENT}
          theme={{
            block: { align },
          }}
        />
      </div>
    ))}
  </>
);
