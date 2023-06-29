import IconLoader from "../../components/images/IconLoader";
import { demoImage } from "../../stories/content";
import { Block1 } from "./Block1";
import {
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
} from "./block1.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block1,
  title: "Blocks/Block1",
} as Meta;

const DEMO_CONTENT = {
  title: " Work with tools you already use",
  image: demoImage,
  intro: (
    <p>
      Deliver great service experiences fast - without the complexity of
      traditional ITSM solutions.Accelerate critical development work, eliminate
      toil, and deploy changes with ease.
    </p>
  ),
  features: (
    <>
      <ul className="list-none relative">
        {[
          "Continuous integration and deployment",
          "Development workflow",
          "Knowledge management",
        ].map((item, index) => (
          <li key={index} className="!pl-0 !relative">
            <IconLoader
              icon="check-circle"
              className="absolute left-0 -translate-x-[calc(100%+.75em)] top-[.25em] w-[1em] h-[1em] text-current !mt-0"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p>
        Deliver great service experiences fast - without the complexity of
        traditional ITSM solutions.
      </p>
    </>
  ),
};

export const Default = () => <Block1 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block1
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
        <Block1
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
        <Block1
          title={DEMO_CONTENT.title}
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
        <Block1
          intro={DEMO_CONTENT.intro}
          features={DEMO_CONTENT.features}
          theme={{
            intro: { size },
            features: { size },
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
        <Block1
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const ImagePosition = () => (
  <>
    <Block1 {...DEMO_CONTENT} title="default" />
    <Block1
      {...DEMO_CONTENT}
      theme={{
        image: {
          position: "left",
        },
      }}
      title="left"
    />
    <Block1
      {...DEMO_CONTENT}
      theme={{
        image: {
          position: "right",
        },
      }}
      title="right"
    />
  </>
);
