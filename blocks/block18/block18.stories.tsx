import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoIcon1 } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block18, Block18Props } from "./Block18";
import {
  COLUMN_OPTIONS,
  ColumnType,
  GAP_OPTIONS,
  GapType,
} from "./block18.options";
import { Meta } from "@storybook/react";
import React, { useState } from "react";

export default {
  component: Block18,
  title: "Blocks/18. Card Grid",
} as Meta;

const DEMO_CONTENT: Block18Props = {
  title: "title",
  intro: <p>intro</p>,
  footer: <p>footer</p>,
  buttons: [{ label: "Block button" }, { label: "Block button" }],
  items: [
    {
      type: "card.composable",
      _key: "1",
      title: "Title",
      subtitle: "subtitle",
      content: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus ipsum dolor.
        </p>
      ),
      buttons: [{ label: "button" }],
      image: demoIcon1,
      theme: {
        title: { size: "lg" },
        subtitle: { size: "sm" },
        border: { color: "black", width: 1, radius: "lg" },
        card: { paddingX: "10", paddingTop: "10", paddingBottom: "10" },
        content: { size: "lg" },
      },
    },
    {
      type: "card.composable",
      _key: "2",
      title: "Title",
      subtitle: "subtitle",
      content: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus ipsum dolor.
        </p>
      ),
      buttons: [{ label: "button" }],
      image: demoIcon1,
      theme: {
        title: { size: "lg" },
        subtitle: { size: "sm" },
        border: { color: "black", width: 1, radius: "lg" },
        card: { paddingX: "10", paddingTop: "10", paddingBottom: "10" },
        content: { size: "lg" },
      },
    },
    {
      type: "card.composable",
      _key: "3",
      title: "Title",
      subtitle: "subtitle",
      content: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus ipsum dolor.
        </p>
      ),
      buttons: [{ label: "button" }],
      image: demoIcon1,
      theme: {
        title: { size: "lg" },
        subtitle: { size: "sm" },
        border: { color: "black", width: 1, radius: "lg" },
        card: { paddingX: "10", paddingTop: "10", paddingBottom: "10" },
        content: { size: "lg" },
      },
    },
    {
      type: "card.composable",
      _key: "4",
      title: "Title",
      subtitle: "subtitle",
      content: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus ipsum dolor.
        </p>
      ),
      buttons: [{ label: "button" }],
      image: demoIcon1,
      theme: {
        title: { size: "lg" },
        subtitle: { size: "sm" },
        border: { color: "black", width: 1, radius: "lg" },
        card: { paddingX: "10", paddingTop: "10", paddingBottom: "10" },
        content: { size: "lg" },
      },
    },
  ],
};

export const Default = () => <Block18 {...DEMO_CONTENT} />;

export const Cards = () => (
  <Block18
    theme={{
      grid: {
        columns: 2,
      },
    }}
    items={[
      {
        type: "card.composable",
        title: "Composable card",
        theme: { border: { width: 1, color: "black" } },
      },
      {
        type: "card.testimonial",
        title: "Testimonial card",
        theme: { border: { width: 1, color: "black" } },
      },
    ]}
  />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block18
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
          <Block18
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
        <Block18
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
        <Block18
          title={DEMO_CONTENT.title}
          theme={{
            title: { size },
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
        <Block18
          intro={DEMO_CONTENT.intro}
          footer={DEMO_CONTENT.footer}
          theme={{
            intro: { color },
            footer: { color },
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
        <Block18
          intro={DEMO_CONTENT.intro}
          footer={DEMO_CONTENT.footer}
          theme={{
            intro: { size },
            footer: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const GridGaps = () => (
  <>
    {(Object.keys(GAP_OPTIONS) as GapType[]).map((gap: GapType) => (
      <div key={gap} className="border">
        <Block18
          items={DEMO_CONTENT["items"]}
          title={gap}
          theme={{
            grid: { columns: 3, gapHorizontal: gap, gapVertical: gap },
          }}
        />
      </div>
    ))}
  </>
);

export const GridColumns = () => {
  const [currentTab, setCurrentTab] = useState<number>(2);

  return (
    <div style={{ zoom: 1 }} className="relative">
      <span className="absolute inset-y-0 left-1/2 w-px bg-[hotpink] opacity-50" />
      <div className="flex gap-2 mb-4">
        {Object.keys(COLUMN_OPTIONS).map((columns) => (
          <button
            key={columns}
            className={`py-2 px-5 rounded-full border ${
              +columns === currentTab && "bg-[#eee]"
            }`}
            onClick={() => setCurrentTab(+columns)}
          >
            {columns}
          </button>
        ))}
      </div>
      {new Array(currentTab * currentTab + 1).fill("").map((x, i) => (
        <div
          key={i + 1}
          className="mb-10 border p-10 [&>div>div>div>div>div>div>div>div>div>div>div]:border-2"
        >
          <Block18
            items={new Array(i + 1).fill({
              type: "card.composable",
              theme: {
                border: { width: 1, color: "black" },
                card: { paddingY: 10 },
              },
            })}
            theme={{
              block: {
                padding: { top: "none", bottom: "none" },
              },
              slider: {
                mobile: false,
                desktop: false,
              },
              grid: {
                columns: currentTab as ColumnType,
                gapHorizontal: "xl",
                gapVertical: "sm",
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export const ColSpan = () => (
  <Block18
    items={[
      {
        type: "card.composable",
        title: "col span 5",
        theme: { border: { width: 1 }, card: { columns: 5 } },
      },
      {
        type: "card.composable",
        title: "col span 1",
        theme: { border: { width: 1 } },
      },
      {
        type: "card.composable",
        title: "col span 3",
        theme: { border: { width: 1 }, card: { columns: 3 } },
      },
      {
        type: "card.composable",
        title: "col span 3",
        theme: { border: { width: 1 }, card: { columns: 3 } },
      },
      {
        type: "card.composable",
        title: "col span 2",
        theme: { border: { width: 1 }, card: { columns: 2 } },
      },
      {
        type: "card.composable",
        title: "col span 4",
        theme: { border: { width: 1 }, card: { columns: 4 } },
      },
      {
        type: "card.composable",
        title: "col span 2",
        theme: { border: { width: 1 }, card: { columns: 2 } },
      },
      {
        type: "card.composable",
        title: "col span 6",
        theme: { border: { width: 1 }, card: { columns: 6 } },
      },
      {
        type: "card.composable",
        title: "col span 3",
        theme: { border: { width: 1 }, card: { columns: 3 } },
      },
      {
        type: "card.composable",
        title: "col span 3",
        theme: { border: { width: 1 }, card: { columns: 3 } },
      },
    ]}
    theme={{
      block: {
        align: "center",
      },
      grid: {
        columns: 6,
        gapHorizontal: "md",
        gapVertical: "md",
      },
      slider: {
        mobile: false,
      },
    }}
  />
);
// export const ImageCardGrid = () => (
//   <CardGrid
//     title="Image cards"
//     theme={{
//       grid: {
//         columns: 3,
//       },
//     }}
//     items={[
//       { type: 'card.image', image: demoImage, theme: { image: { ratio: '1/1' } } },
//       { type: 'card.image', image: demoImage2, theme: { image: { ratio: '4/3' } } },
//       {
//         type: 'card.image',
//         image: demoImage3,
//         theme: { image: { ratio: '19/27' } },
//       },
//     ]}
//   />
// );

export const GridCenterCards = () => {
  const [currentTab, setCurrentTab] = useState<number>(5);
  const [currentAlign, setCurrentAlign] =
    useState<HorizontalAlignType>("center");

  return (
    <div style={{ zoom: 1 }} className="relative">
      <span className="absolute inset-y-0 left-1/2 w-px bg-[hotpink] opacity-50" />
      <div className="flex gap-2 mb-4">
        {Object.keys(HORIZONTAL_ALIGN_OPTIONS).map((align) => (
          <button
            key={align}
            className={`py-2 px-5 rounded-full border ${
              align === currentAlign && "bg-[#eee]"
            }`}
            onClick={() => setCurrentAlign(align as HorizontalAlignType)}
          >
            {align}
          </button>
        ))}
        {Object.keys(COLUMN_OPTIONS).map((columns) => (
          <button
            key={columns}
            className={`py-2 px-5 rounded-full border ${
              +columns === currentTab && "bg-[#eee]"
            }`}
            onClick={() => setCurrentTab(+columns)}
          >
            {columns}
          </button>
        ))}
      </div>
      {new Array(currentTab * currentTab + 1).fill("").map((x, i) => (
        <div
          key={i}
          className="mb-10 border p-10 [&>div>div>div>div>div>div>div>div>div>div>div]:border-2"
        >
          <Block18
            items={new Array(i + 1).fill({
              type: "card.composable",
              theme: {
                border: { width: 1, color: "black" },
                card: { paddingY: 10 },
              },
            })}
            theme={{
              block: {
                align: currentAlign,
                padding: { top: "none", bottom: "none" },
              },
              slider: {
                mobile: false,
                desktop: false,
              },
              grid: {
                columns: currentTab as ColumnType,
                gapHorizontal: "xl",
                gapVertical: "sm",
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export const Slider = () => (
  <div>
    <div className="bg-black/10">
      <Block18
        title="On inner width"
        intro={<p>Should be scrolling inside the white</p>}
        theme={{
          block: {
            background: "white",
            width: "inner",
            margin: { top: "lg", bottom: "lg" },
            padding: { top: "lg", bottom: "lg" },
          },
          grid: {
            columns: 3,
          },
          slider: {
            mobile: true,
            desktop: true,
          },
        }}
        items={DEMO_CONTENT["items"]}
      />
    </div>

    {(Object.entries(COLUMN_OPTIONS) as [key: string, label: string][]).map(
      ([columns, label]) => (
        <Block18
          theme={{
            grid: {
              columns: columns as any,
            },
            slider: {
              mobile: true,
              desktop: true,
            },
          }}
          items={DEMO_CONTENT["items"]}
        />
      ),
    )}

    <Block18
      title="On white background"
      intro={<p>Should be scrolling full width</p>}
      theme={{
        block: {
          background: "white",
        },
        grid: {
          columns: 3,
        },
        slider: {
          mobile: true,
          desktop: true,
        },
      }}
      items={DEMO_CONTENT["items"]}
    />

    <Block18
      title="On background"
      intro={
        <p>
          Should be scrolling inside background on desktop, full width on mobile
        </p>
      }
      theme={{
        block: {
          text: "white",
          background: "black",
        },
        grid: {
          columns: 3,
        },
        slider: {
          mobile: true,
          desktop: true,
          color: "white",
        },
      }}
      items={DEMO_CONTENT["items"]}
    />

    <Block18
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
      items={DEMO_CONTENT["items"]}
    />

    <Block18
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
      items={DEMO_CONTENT["items"]}
    />

    <Block18
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
      items={DEMO_CONTENT["items"]}
    />

    <Block18
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
      items={DEMO_CONTENT["items"]}
    />
  </div>
);
