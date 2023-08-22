import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoTestimonialsList } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block11, Block11Props } from "./Block11";
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

export const CardTheme = () => (
  <Block11
    {...DEMO_CONTENT}
    testimonials={demoTestimonialsList}
    theme={{
      testimonials: {
        card: { background: "black" },
        title: { color: "white" },
        content: { color: "white" },
        name: { color: "white" },
        jobTitle: { color: "white" },
      },
    }}
  />
);

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
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block11
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
          <Block11
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
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
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
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
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
