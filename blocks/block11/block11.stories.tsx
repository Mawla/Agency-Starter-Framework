import { demoTestimonialsList } from "../../stories/content";
import { Block11, Block11Props } from "./Block11";
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
} from "./block11.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block11,
  title: "Blocks/Block11",
} as Meta;

const DEMO_CONTENT: Block11Props = {
  title: "Testimonials",
  intro: (
    <p>
      Explore the whole collection of open-source web components and elements
      built with the utility classes from Tailwind
    </p>
  ),
  testimonials: demoTestimonialsList,
  buttons: [{ label: "Read more" }],
};

export const Default = () => <Block11 {...DEMO_CONTENT} />;

export const OneCard = () => (
  <Block11 {...DEMO_CONTENT} testimonials={demoTestimonialsList?.slice(0, 1)} />
);

export const TwoCards = () => (
  <Block11 {...DEMO_CONTENT} testimonials={demoTestimonialsList?.slice(0, 2)} />
);

export const ThreeCards = () => (
  <Block11 {...DEMO_CONTENT} testimonials={demoTestimonialsList?.slice(0, 3)} />
);

export const FourCards = () => (
  <Block11 {...DEMO_CONTENT} testimonials={demoTestimonialsList?.slice(0, 4)} />
);

export const FiveCards = () => (
  <Block11 {...DEMO_CONTENT} testimonials={demoTestimonialsList?.slice(0, 5)} />
);

export const SixCards = () => (
  <Block11 {...DEMO_CONTENT} testimonials={demoTestimonialsList?.slice(0, 6)} />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block11
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

export const Alignments = () => (
  <>
    {(Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align) => (
      <div key={align}>
        <Block11
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
        <Block11
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
        <Block11
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
        <Block11
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
        <Block11
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
