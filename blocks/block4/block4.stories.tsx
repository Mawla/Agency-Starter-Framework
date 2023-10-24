import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoImage, demoImage2, demoImage3 } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  BorderRadiusType,
} from "../../types";
import { Block4 } from "./Block4";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block4,
  title: "Blocks/4. Default Content",
} as Meta;

const DEMO_CONTENT = {
  title: "We didn't reinvent the wheel ",
  subtitle: "We just made it better.",
  intro: (
    <p>
      We are strategists, designers and developers. Innovators and problem
      solvers. Small enough to be simple and quick, but big enough to deliver
      the scope you want at the pace you need.
    </p>
  ),
  buttons: [{ label: "Free trial", href: "/" }],
  image: demoImage2,
};

export const Default = () => <Block4 {...DEMO_CONTENT} />;
export const Video = () => (
  <Block4
    {...DEMO_CONTENT}
    image={undefined}
    video={{
      provider: "youtube",
      videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    }}
  />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block4
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

export const SubtitleSizes = () => (
  <>
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
      <div key={size}>
        <Block4
          {...DEMO_CONTENT}
          theme={{
            subtitle: { size },
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
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
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
    {(Object.keys(HORIZONTAL_ALIGN_OPTIONS) as HorizontalAlignType[]).map(
      (align) => (
        <div key={align}>
          <Block4
            {...DEMO_CONTENT}
            image={demoImage3}
            theme={{
              block: { align },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const Decorations = () => (
  <>
    <Block4
      {...DEMO_CONTENT}
      decorations={[
        {
          mobile: {
            background: "blue",
            opacity: 0.5,
            bottom: 0,
            right: 0,
            width: 50,
            height: 50,
            top: 20,
            left: 20,
          },
        },
        {
          location: "image",
          breakout: true,
          mobile: {
            background: "blue",
            opacity: 0.5,
            width: 50,
            height: 50,
            top: -20,
            left: -20,
          },
        },
        {
          location: "image",
          breakout: true,
          mobile: {
            background: "blue",
            opacity: 0.5,
            width: 50,
            height: 50,
            bottom: -20,
            right: -20,
          },
        },
      ]}
    />
    <Block4
      {...DEMO_CONTENT}
      video={{
        provider: "youtube",
        videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      }}
      decorations={[
        {
          mobile: {
            background: "blue",
            opacity: 0.5,
            bottom: 0,
            right: 0,
            width: 50,
            height: 50,
            top: 20,
            left: 20,
          },
        },
        {
          location: "image",
          breakout: true,
          mobile: {
            background: "blue",
            opacity: 0.5,
            width: 50,
            height: 50,
            top: -20,
            left: -20,
          },
        },
        {
          location: "image",
          breakout: true,
          mobile: {
            background: "blue",
            opacity: 0.5,
            width: 50,
            height: 50,
            bottom: -20,
            right: -20,
          },
        },
      ]}
    />
  </>
);
export const ImageRadius = () => (
  <>
    {(Object.keys(BORDER_RADIUS_OPTIONS) as BorderRadiusType[]).map(
      (rounded) => (
        <div key={rounded}>
          <Block4
            title={rounded}
            image={demoImage}
            theme={{
              image: { rounded },
            }}
          />
          <Block4
            title={rounded}
            image={demoImage}
            theme={{
              image: { rounded },
            }}
          />
        </div>
      ),
    )}
  </>
);
