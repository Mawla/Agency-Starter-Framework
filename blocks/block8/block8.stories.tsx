import { demoImage } from "../../stories/content";
import { Block8 } from "./Block8";
import {
  AlignType,
  ALIGN_OPTIONS,
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  IntroColorType,
  INTRO_COLOR_OPTIONS,
  IntroSizeType,
  INTRO_SIZE_OPTIONS,
  TitleColorType,
  TitleSizeType,
  TITLE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./block8.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block8,
  title: "Blocks/Block8",
} as Meta;

const DEMO_CONTENT = {
  title: "The most trusted cryptocurrency platform",
  intro: <p>Here are a few reasons why you should choose Flowbite</p>,

  items: [
    {
      _key: "",
      title: "Secure storage",
      intro: (
        <p>
          We store the vast majority of the digital assets in secure offline
          storage.
        </p>
      ),
      image: demoImage,
    },
    {
      _key: "",
      title: "Insurance",
      intro: (
        <p>
          Flowbite maintains crypto insurance and all USD cash balances are
          covered.
        </p>
      ),
      image: demoImage,
    },
    {
      _key: "",
      title: "Best practices",
      intro: (
        <p>
          Flowbite marketplace supports a variety of the most popular digital
          currencies.
        </p>
      ),
      image: demoImage,
    },
  ],
};

export const Default = () => <Block8 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block8
            {...DEMO_CONTENT}
            theme={{
              block: { background: color },
            }}
          />
        </div>
      )
    )}
  </>
);

export const Alignments = () => (
  <>
    {(Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align) => (
      <div key={align}>
        <Block8
          {...DEMO_CONTENT}
          theme={{
            block: { align },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(TITLE_COLOR_OPTIONS) as TitleColorType[]).map((color) => (
      <div key={color}>
        <Block8
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
        <Block8
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
    {(Object.keys(INTRO_COLOR_OPTIONS) as IntroColorType[]).map((color) => (
      <div key={color}>
        <Block8
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
    {(Object.keys(INTRO_SIZE_OPTIONS) as IntroSizeType[]).map((size) => (
      <div key={size}>
        <Block8
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
