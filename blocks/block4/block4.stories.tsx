import { demoImage2, demoImage3 } from "../../stories/content";
import { Block4 } from "./Block4";
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
} from "./block4.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block4,
  title: "Blocks/Block4",
} as Meta;

const DEMO_CONTENT = {
  title: "We didn't reinvent the wheel ",
  intro: (
    <p>
      We are strategists, designers and developers. Innovators and problem
      solvers. Small enough to be simple and quick, but big enough to deliver
      the scope you want at the pace you need.
    </p>
  ),
  buttons: [{ label: "Free trail", href: "/" }],
  image: demoImage2,
};

export const Default = () => <Block4 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block4
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
        <Block4
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
        <Block4
          {...DEMO_CONTENT}
          theme={{
            title: { size },
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
        <Block4
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
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
        <Block4
          {...DEMO_CONTENT}
          theme={{
            intro: { color },
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
        <Block4
          {...DEMO_CONTENT}
          image={demoImage3}
          theme={{
            block: { align },
          }}
        />
      </div>
    ))}
  </>
);
