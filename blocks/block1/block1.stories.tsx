import { SPACE_OPTIONS } from "../../components/block/spacing.options";
import { IconLoaderProps } from "../../components/images/IconLoader";
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
  BORDER_RADIUS_OPTIONS,
  BorderRadiusType,
  ColorType,
  VERTICAL_ALIGN_OPTIONS,
  VerticalAlignType,
} from "../../types";
import { Block1, Block1Props } from "./Block1";
import {
  GAP_OPTIONS,
  GapType,
  LAYOUT_COLUMN_OPTIONS,
  layoutColumnType,
} from "./block1.options";
import { Meta } from "@storybook/react";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

export default {
  component: Block1,
  title: "Blocks/1. Text and Media",
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
  footer: <p>this is a footer</p>,
  body: (
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
export const MobileImage = () => (
  <Block1 {...DEMO_CONTENT} mobileImage={demoImage2} />
);

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

export const TextSizes = () => (
  <>
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
      <div key={size}>
        <Block1
          intro={DEMO_CONTENT.intro}
          body={DEMO_CONTENT.body}
          footer={DEMO_CONTENT.footer}
          theme={{
            intro: { size },
            body: { size },
            footer: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const TextColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block1
          intro={DEMO_CONTENT.intro}
          body={DEMO_CONTENT.body}
          footer={DEMO_CONTENT.footer}
          theme={{
            intro: { color },
            body: { color },
            footer: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const ImageRadius = () => (
  <>
    {(Object.keys(BORDER_RADIUS_OPTIONS) as BorderRadiusType[]).map(
      (rounded) => (
        <div key={rounded}>
          <Block1
            title={rounded}
            image={demoImage}
            theme={{
              image: { rounded },
            }}
          />
          <Block1
            title={rounded}
            image={demoImage}
            theme={{
              image: { rounded, fullHeight: true },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const verticalAlignContent = () => (
  <>
    {(Object.keys(VERTICAL_ALIGN_OPTIONS) as VerticalAlignType[]).map(
      (verticalAlign) => (
        <div key={verticalAlign}>
          <Block1
            title={`verticalAlign: ${verticalAlign}`}
            image={demoImage}
            theme={{
              layout: { verticalAlign },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const columns = () => (
  <>
    {(Object.keys(LAYOUT_COLUMN_OPTIONS) as layoutColumnType[]).map(
      (columns) => (
        <div
          key={columns}
          className="[&>div>div>div>div>div>div>div>div>div>div]:border"
        >
          <Block1
            title={`columns: ${columns}`}
            theme={{
              block: {
                width: "outer",
                padding: { top: "none", bottom: "none" },
                margin: { top: "none", bottom: "2xs" },
              },
              layout: {
                columns,
              },
            }}
          />
        </div>
      ),
    )}

    {(Object.keys(LAYOUT_COLUMN_OPTIONS) as layoutColumnType[]).map(
      (columns) => (
        <div key={columns} className="border-b border-white pb-10 mb-10">
          <Block1
            title={`columns: ${columns}`}
            image={demoImage2}
            theme={{
              block: {
                outerBackground: "black",
                width: "outer",
                background: "white",
                padding: { top: "none", bottom: "none" },
                margin: { top: "sm", bottom: "sm" },
              },
              layout: {
                columns,
                gap: "2xl",
                extendMediaWidth: false,
                mediaPosition: "right",
              },
            }}
          />
          <Block1
            title={`columns: ${columns}`}
            image={demoImage2}
            theme={{
              block: {
                outerBackground: "black",
                width: "outer",
                background: "white",
                padding: { top: "none", bottom: "none" },
                margin: { top: "none", bottom: "sm" },
              },
              layout: {
                columns,
                gap: "2xl",
                extendMediaWidth: false,
                mediaPosition: "left",
              },
            }}
          />
          <Block1
            title={`columns: ${columns}, extendMediaWidth`}
            image={demoImage2}
            theme={{
              block: {
                outerBackground: "black",
                width: "outer",
                background: "white",
                padding: { top: "none", bottom: "none" },
                margin: { top: "none", bottom: "sm" },
              },
              layout: {
                columns,
                gap: "2xl",
                extendMediaWidth: true,
                mediaPosition: "right",
              },
            }}
          />
          <Block1
            title={`columns: ${columns}, extendMediaWidth`}
            image={demoImage2}
            theme={{
              block: {
                outerBackground: "black",
                width: "outer",
                background: "white",
                padding: { top: "none", bottom: "none" },
                margin: { top: "none", bottom: "sm" },
              },
              layout: {
                columns,
                gap: "2xl",
                extendMediaWidth: true,
                mediaPosition: "left",
              },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const GridGaps = () => (
  <>
    {(Object.keys(GAP_OPTIONS) as GapType[]).map((gap: GapType) => (
      <div
        key={gap}
        className="[&>div>div>div>div>div>div>div>div>div>div]:border"
      >
        <Block1
          title={gap}
          theme={{
            block: {
              width: "outer",
              padding: { top: "none", bottom: "none" },
              margin: { top: "none", bottom: "2xs" },
            },
            layout: { gap },
          }}
        />
      </div>
    ))}
  </>
);

export const verticalSpaceContent = () => (
  <>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label}>
        <Block1
          title={`verticalSpace: ${label}`}
          image={demoImage}
          theme={{
            content: {
              verticalSpace: {
                top: size,
                bottom: size,
              },
            },
          }}
        />
      </div>
    ))}
  </>
);

export const verticalAlignMedia = () => (
  <>
    {(Object.keys(VERTICAL_ALIGN_OPTIONS) as VerticalAlignType[]).map(
      (verticalAlign) => (
        <div key={verticalAlign}>
          <Block1
            {...DEMO_CONTENT}
            title={`verticalAlign: ${verticalAlign}`}
            theme={{
              layout: { verticalAlign },
            }}
          />
          <Block1
            {...DEMO_CONTENT}
            image={demoImage3}
            intro={<p style={{ height: 600 }}>…content…</p>}
            title={`verticalAlign: ${verticalAlign}`}
            theme={{
              layout: { verticalAlign },
            }}
          />
          <Block1
            {...DEMO_CONTENT}
            image={undefined}
            video={{
              provider: "youtube",
              videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
            }}
            title={`verticalAlign: ${verticalAlign}`}
            theme={{
              layout: { verticalAlign },
            }}
          />
          <Block1
            {...DEMO_CONTENT}
            title={`verticalAlign: ${verticalAlign}`}
            image={undefined}
            video={undefined}
            theme={{
              layout: { verticalAlign },
            }}
            script={{
              title: "embed",
              items: [
                {
                  html: `<div class='w-full h-[200px] border border-[royalblue] p-10'>this is a script</div>`,
                },
              ],
            }}
          />
          <Block1
            {...DEMO_CONTENT}
            title={`verticalAlign: ${verticalAlign}`}
            image={undefined}
            video={undefined}
            theme={{
              layout: { verticalAlign },
            }}
            script={{
              title: "embed",
              items: [
                {
                  html: `<div class='w-full h-[600px] border border-[royalblue] p-10'>this is a script</div>`,
                },
              ],
            }}
          />
        </div>
      ),
    )}
  </>
);

export const mediaPosition = () => (
  <>
    <Block1 {...DEMO_CONTENT} title="default" />
    <Block1
      {...DEMO_CONTENT}
      theme={{
        layout: {
          mediaPosition: "left",
        },
      }}
      title="left"
    />
    <Block1
      {...DEMO_CONTENT}
      theme={{
        layout: {
          mediaPosition: "right",
        },
      }}
      title="right"
    />
  </>
);

export const Video = () => (
  <Block1
    {...DEMO_CONTENT}
    image={undefined}
    video={{
      provider: "youtube",
      videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    }}
  />
);

export const ImageHeight = () => (
  <>
    <Block1
      {...DEMO_CONTENT}
      intro={<p style={{ height: 600 }}>…</p>}
      title="fullHeight false"
      theme={{
        image: {
          fullHeight: false,
        },
      }}
    />
    <Block1
      title="full height false"
      image={demoImage3}
      theme={{
        image: {
          fullHeight: false,
        },
      }}
    />
    <Block1
      {...DEMO_CONTENT}
      title="full height true"
      theme={{
        image: {
          fullHeight: true,
        },
      }}
    />
    <Block1
      title="full height true"
      image={demoImage3}
      theme={{
        image: {
          fullHeight: true,
        },
      }}
    />
  </>
);

export const Decorations = () => (
  <>
    <Block1
      {...DEMO_CONTENT}
      intro={<p style={{ height: 600 }}>intro…</p>}
      theme={{
        image: { fullHeight: false },
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
    <Block1
      {...DEMO_CONTENT}
      theme={{
        image: { fullHeight: true },
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
    <Block1
      {...DEMO_CONTENT}
      image={undefined}
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
    <Block1
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
    <Block1
      {...DEMO_CONTENT}
      image={undefined}
      video={undefined}
      script={{
        title: "youtube embed",
        items: [
          {
            src: `//js-eu1.hsforms.net/forms/v2.js`,
            onload: `
          hbspt.forms.create({
            region: "na1",
            portalId: "8176446",
            formId: "e1c83e9f-aaea-4c98-a17d-776b82668276",
            target: "#hubspot-form-id"
          });
          `,
            html: `<div id="hubspot-form-id">loading form</div>`,
          },
        ],
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
export const Scripts = () => (
  <>
    <Block1
      {...DEMO_CONTENT}
      image={undefined}
      video={undefined}
      script={{
        title: "embed",
        items: [
          {
            html: `<div class='w-full h-full border border-[royalblue] p-10'>this is a script</div>`,
          },
        ],
      }}
    />{" "}
    <Block1
      {...DEMO_CONTENT}
      image={undefined}
      video={undefined}
      theme={{
        layout: {
          mediaPosition: "left",
        },
      }}
      script={{
        title: "embed",
        items: [
          {
            src: `//js-eu1.hsforms.net/forms/v2.js`,
            onload: `
          hbspt.forms.create({
            region: "na1",
            portalId: "8176446",
            formId: "e1c83e9f-aaea-4c98-a17d-776b82668276",
            target: "#hubspot-form-id"
          });
          `,
            html: `<div id="hubspot-form-id">loading form</div>`,
          },
        ],
      }}
    />
    <Block1
      {...DEMO_CONTENT}
      image={undefined}
      video={undefined}
      theme={{
        layout: {
          mediaPosition: "right",
        },
      }}
      script={{
        title: "embed",
        items: [
          {
            html: `<div class='w-full h-full border border-[royalblue] p-10'>this is a script</div>`,
          },
        ],
      }}
    />
  </>
);

export const ExtendMediaWidth = () => {
  const extendMediaWidthThemeBase = {
    block: {
      background: "white",
      width: "full",
      margin: {
        top: "sm",
        bottom: "sm",
      },
      padding: {
        top: "sm",
        bottom: "sm",
      },
      outerBackground: "black",
    },
    content: {
      verticalSpace: {
        top: "sm",
        bottom: "sm",
      },
    },
    layout: {
      extendMediaWidth: true,
    },
  };

  const extendMediaWidthThemeFull = JSON.parse(
    JSON.stringify(extendMediaWidthThemeBase),
  );
  extendMediaWidthThemeFull.block.width = "full";
  extendMediaWidthThemeFull.block.background = "white";
  extendMediaWidthThemeFull.block.outerBackground = "black";

  const extendMediaWidthThemeOuter = JSON.parse(
    JSON.stringify(extendMediaWidthThemeBase),
  );
  extendMediaWidthThemeOuter.block.width = "outer";

  const extendMediaWidthThemeInner = JSON.parse(
    JSON.stringify(extendMediaWidthThemeBase),
  );
  extendMediaWidthThemeInner.block.width = "inner";

  const extendMediaWidthThemeBaseLeft = JSON.parse(
    JSON.stringify(extendMediaWidthThemeBase),
  );
  extendMediaWidthThemeBaseLeft.layout.mediaPosition = "left";

  const extendMediaWidthThemeOuterLeft = JSON.parse(
    JSON.stringify(extendMediaWidthThemeOuter),
  );
  extendMediaWidthThemeOuterLeft.layout.mediaPosition = "left";

  const extendMediaWidthThemeInnerLeft = JSON.parse(
    JSON.stringify(extendMediaWidthThemeInner),
  );
  extendMediaWidthThemeInnerLeft.layout.mediaPosition = "left";

  return (
    <div>
      <Block1
        title="ExtendMediaWidth full left"
        image={demoImage}
        theme={extendMediaWidthThemeBaseLeft as Block1Props["theme"]}
      />
      <Block1
        title="ExtendMediaWidth outer left"
        image={demoImage}
        theme={extendMediaWidthThemeOuterLeft as Block1Props["theme"]}
      />
      <Block1
        title="ExtendMediaWidth inner left"
        image={demoImage}
        theme={extendMediaWidthThemeInnerLeft as Block1Props["theme"]}
      />
      <Block1
        title="ExtendMediaWidth outer"
        image={demoImage}
        theme={extendMediaWidthThemeOuter as Block1Props["theme"]}
      />
      <Block1
        title="ExtendMediaWidth full"
        image={demoImage}
        theme={extendMediaWidthThemeFull as Block1Props["theme"]}
      />
      <Block1
        title="ExtendMediaWidth inner"
        image={demoImage}
        theme={extendMediaWidthThemeInner as Block1Props["theme"]}
      />
      <Block1
        title="SVG"
        theme={extendMediaWidthThemeInner}
        script={{
          title: "embed",
          items: [
            {
              html: `<svg viewBox="0 0 784 784" fill="none" preserveAspectRatio="xMidYMid meet"><rect width="784" height="784" fill="#f00"/></svg>`,
            },
          ],
        }}
      />
    </div>
  );
};
