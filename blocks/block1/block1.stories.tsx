import IconLoader from "../../components/images/IconLoader";
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
import { ColorType } from "../../types";
import { Block1 } from "./Block1";
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
              icon="check"
              className="absolute left-0 -translate-x-[calc(100%+.75em)] translate-y-1/3 w-[1em] h-[1em] text-current !mt-0"
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
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block1
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
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
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
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
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
        layout: {
          imagePosition: "left",
        },
      }}
      title="left"
    />
    <Block1
      {...DEMO_CONTENT}
      theme={{
        layout: {
          imagePosition: "right",
        },
      }}
      title="right"
    />
  </>
);
