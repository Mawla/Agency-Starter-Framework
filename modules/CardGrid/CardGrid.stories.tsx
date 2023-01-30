import { SPACE_OPTIONS } from "../../components/module/SpacingOptions";
import { demoImage, demoImage2, demoImage3 } from "../../stories/content";
import { CardGrid, CardGridProps } from "./CardGrid";
import {
  AlignType,
  ALIGN_OPTIONS,
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  ButtonPositionType,
  BUTTON_POSITION_OPTIONS,
  COLUMN_OPTIONS,
  GapType,
  GAP_OPTIONS,
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "./CardGridOptions";
import { ComposableCardProps } from "./ComposableCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: CardGrid,
  title: "Modules/CardGrid/CardGrid",
} as Meta;

const DEMO_ITEMS: CardGridProps["items"] = new Array(6).fill({
  type: "card.composable",
  title: "Title",
  text: <p>Text</p>,
  theme: {
    card: {
      border: "neutral-85",
    },
  },
} as ComposableCardProps);

const DEMO_CONTENT = {
  eyebrow: "Team work statement",
  title:
    "Descriptive statement lorem ipsum dolor sit amet consect etur adipiscing elit",
  intro: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
      accumsan, risus sem sollicitudin lacus. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
    </p>
  ),
  buttons: [{ label: "button" }],
};

export const Default = () => <CardGrid {...DEMO_CONTENT} />;

export const ModuleAlign = () => (
  <>
    {(Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align: AlignType) => (
      <div key={align} className="border">
        <CardGrid
          {...DEMO_CONTENT}
          buttons={[
            { label: "button 1" },
            { label: "button 2" },
            { label: "button 3" },
            { label: "button 4" },
            { label: "button 5" },
            { label: "button 6" },
            { label: "button 7" },
          ]}
          theme={{ module: { align } }}
        />
      </div>
    ))}
  </>
);

export const ModuleBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <CardGrid {...DEMO_CONTENT} theme={{ module: { background: color } }} />
      ),
    )}
  </>
);

export const Rounded = () => (
  <div className="flex flex-col gap-10">
    <CardGrid
      {...DEMO_CONTENT}
      theme={{
        module: {
          background: "brand-dark",
        },
      }}
    />
    <CardGrid
      {...DEMO_CONTENT}
      theme={{
        module: {
          background: "brand-dark",
        },
        decorations: {
          roundedTop: "none",
          roundedBottom: "none",
        },
      }}
    />
    <CardGrid
      {...DEMO_CONTENT}
      theme={{
        module: {
          background: "brand-dark",
        },
        decorations: {
          roundedTop: "lg",
          roundedBottom: "none",
        },
      }}
    />
    <CardGrid
      {...DEMO_CONTENT}
      theme={{
        module: {
          background: "brand-dark",
        },
        decorations: {
          roundedTop: "none",
          roundedBottom: "lg",
        },
      }}
    />
  </div>
);

export const ModuleDecorationsOnes = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <CardGrid
          {...DEMO_CONTENT}
          theme={{
            module: {
              background: color,
              align: "center",
            },
          }}
        />
      ),
    )}
  </>
);

export const ModuleSpacing = () => (
  <>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <>
        <div key={size} className="border">
          <CardGrid
            {...DEMO_CONTENT}
            theme={{ module: { space: { top: size, bottom: size } } }}
          />
        </div>
        <div key={size} className="border">
          <CardGrid
            {...DEMO_CONTENT}
            theme={{
              module: {
                background: "neutral-95",
                space: { top: size, bottom: size },
              },
            }}
          />
        </div>
      </>
    ))}
  </>
);

export const GridGaps = () => (
  <>
    {(Object.keys(GAP_OPTIONS) as GapType[]).map((gap: GapType) => (
      <div key={gap} className="border">
        <CardGrid
          items={DEMO_ITEMS}
          title={gap}
          theme={{
            module: { space: { top: "none", bottom: "none" } },
            grid: { columns: 3, gapHorizontal: gap, gapVertical: gap },
          }}
        />
      </div>
    ))}
  </>
);

export const GridColumns = () => (
  <div>
    {(Object.entries(COLUMN_OPTIONS) as [key: string, label: string][]).map(
      ([columns, label]) => (
        <div key={label} className="border">
          <CardGrid
            eyebrow={columns}
            title="column"
            items={DEMO_ITEMS}
            theme={{
              module: {
                space: { top: "none", bottom: "none" },
              },
              grid: {
                columns: columns as any,
              },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const GridStagger = () => (
  <>
    {(Object.entries(COLUMN_OPTIONS) as [key: string, label: string][]).map(
      ([columns, label]) => (
        <div key={label} className="border">
          <CardGrid
            eyebrow={columns}
            title="column"
            items={[...DEMO_ITEMS, ...DEMO_ITEMS]}
            theme={{
              module: {
                space: { top: "none", bottom: "none" },
              },
              grid: {
                stagger: true,
                columns: columns as any,
              },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const TitleSizes = () => (
  <>
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map(
      (size: TitleSizeType) => (
        <CardGrid
          eyebrow={size}
          title={size}
          theme={{
            module: { space: { top: "none", bottom: "sm" } },
            title: {
              size,
            },
          }}
        />
      ),
    )}
  </>
);

export const ButtonPosition = () => (
  <>
    {(Object.keys(BUTTON_POSITION_OPTIONS) as ButtonPositionType[]).map(
      (position: ButtonPositionType) =>
        (Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align: AlignType) => (
          <div key={position + align} className="border">
            <CardGrid
              {...DEMO_CONTENT}
              items={DEMO_ITEMS}
              theme={{ buttons: { position }, module: { align } }}
            />
          </div>
        )),
    )}
  </>
);

export const Slider = () => (
  <div>
    {(Object.entries(COLUMN_OPTIONS) as [key: string, label: string][]).map(
      ([columns, label]) => (
        <CardGrid
          theme={{
            module: {
              space: { top: "none", bottom: "none" },
            },
            grid: {
              columns: columns as any,
            },
            slider: {
              mobile: true,
              desktop: true,
            },
          }}
          items={DEMO_ITEMS}
        />
      ),
    )}

    <CardGrid
      title="On white background"
      intro={<p>Should be scrolling full width</p>}
      theme={{
        module: {
          background: "white",
          space: { top: "none", bottom: "none" },
        },
        grid: {
          columns: 3,
        },
        slider: {
          mobile: true,
          desktop: true,
        },
      }}
      items={DEMO_ITEMS}
    />

    <CardGrid
      title="On background"
      intro={
        <p>
          Should be scrolling inside background on desktop, full width on mobile
        </p>
      }
      theme={{
        module: {
          background: "neutral-95",
          space: { top: "none", bottom: "none" },
        },
        grid: {
          columns: 3,
        },
        slider: {
          mobile: true,
          desktop: true,
        },
      }}
      items={DEMO_ITEMS}
    />

    <CardGrid
      title="Mobile and desktop"
      intro={<p>Should be a slider on mobile and on desktop</p>}
      theme={{
        grid: {
          columns: 3,
        },
        slider: {
          mobile: true,
          desktop: true,
        },
      }}
      items={DEMO_ITEMS}
    />

    <CardGrid
      title="Mobile only"
      intro={<p>Should be a slider on mobile, not on desktop</p>}
      theme={{
        grid: {
          columns: 3,
        },
        slider: {
          mobile: true,
          desktop: false,
        },
      }}
      items={DEMO_ITEMS}
    />

    <CardGrid
      title="Desktop only"
      intro={<p>Should not be a slider on mobile, slider on desktop</p>}
      theme={{
        grid: {
          columns: 3,
        },
        slider: {
          mobile: false,
          desktop: true,
        },
      }}
      items={DEMO_ITEMS}
    />

    <CardGrid
      title="No slider"
      intro={<p>Should not be a slider on mobile or on desktop</p>}
      theme={{
        grid: {
          columns: 3,
        },
        slider: {
          mobile: false,
          desktop: false,
        },
      }}
      items={DEMO_ITEMS}
    />
  </div>
);

export const ImageCardGrid = () => (
  <CardGrid
    title="Image cards"
    theme={{
      grid: {
        columns: 3,
      },
    }}
    items={[
      {
        type: "card.image",
        image: demoImage,
        theme: { image: { ratio: "1/1" } },
      },
      {
        type: "card.image",
        image: demoImage2,
        theme: { image: { ratio: "4/3" } },
      },
      {
        type: "card.image",
        image: demoImage3,
        theme: { image: { ratio: "19/27" } },
      },
    ]}
  />
);
