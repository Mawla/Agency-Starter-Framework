import { Block0Props } from "../../blocks/block0/Block0";
import { Block1Props } from "../../blocks/block1/Block1";
import { Block2Props } from "../../blocks/block2/Block2";
import { Block3Props } from "../../blocks/block3/Block3";
import { Block4Props } from "../../blocks/block4/Block4";
import { Block5Props } from "../../blocks/block5/Block5";
import { Block7Props } from "../../blocks/block7/Block7";
import { Block10Props } from "../../blocks/block10/Block10";
import { Block12Props } from "../../blocks/block12/Block12";
import { Block13Props } from "../../blocks/block13/Block13";
import { Block14Props } from "../../blocks/block14/Block14";
import { Block15Props } from "../../blocks/block15/Block15";
import { Block16Props } from "../../blocks/block16/Block16";
import { Block17Props } from "../../blocks/block17/Block17";
import { Block18Props } from "../../blocks/block18/Block18";
import { CSSDecorationProps } from "../../components/decorations/CSSDecoration";
import { DecorationProps } from "../../components/decorations/Decoration";
import { GenericBlockProps } from "../../types";
import { BlockSchemaName } from "../../types.sanity";
import BlockErrorBoundary from "./BlockErrorBoundary";
import { BlockLoadInView } from "./BlockLoadInView";
import React, { ComponentType } from "react";
import { Suspense, lazy } from "react";

const Block5 = lazy<ComponentType<Block5Props>>(
  () => import(/* webpackChunkName: "Block5" */ "../../blocks/block5/Block5"),
);

const Block3 = lazy<ComponentType<Block3Props>>(
  () => import(/* webpackChunkName: "Block3" */ "../../blocks/block3/Block3"),
);

const Block7 = lazy<ComponentType<Block7Props>>(
  () => import(/* webpackChunkName: "Block7" */ "../../blocks/block7/Block7"),
);

const Block18 = lazy<ComponentType<Block18Props>>(
  () =>
    import(/* webpackChunkName: "Block18" */ "../../blocks/block18/Block18"),
);

const Block17 = lazy<ComponentType<Block17Props>>(
  () =>
    import(/* webpackChunkName: "Block17" */ "../../blocks/block17/Block17"),
);

const Block16 = lazy<ComponentType<Block16Props>>(
  () =>
    import(/* webpackChunkName: "Block16" */ "../../blocks/block16/Block16"),
);

const Block15 = lazy<ComponentType<Block15Props>>(
  () =>
    import(/* webpackChunkName: "Block15" */ "../../blocks/block15/Block15"),
);

const Block14 = lazy<ComponentType<Block14Props>>(
  () =>
    import(/* webpackChunkName: "Block14" */ "../../blocks/block14/Block14"),
);

const Block13 = lazy<ComponentType<Block13Props>>(
  () =>
    import(/* webpackChunkName: "Block13" */ "../../blocks/block13/Block13"),
);

const Block12 = lazy<ComponentType<Block12Props>>(
  () =>
    import(/* webpackChunkName: "Block12" */ "../../blocks/block12/Block12"),
);

const Block0 = lazy<ComponentType<Block0Props>>(
  () => import(/* webpackChunkName: "Block0" */ "../../blocks/block0/Block0"),
);

const Block10 = lazy<ComponentType<Block10Props>>(
  () =>
    import(/* webpackChunkName: "Block10" */ "../../blocks/block10/Block10"),
);

const Block4 = lazy<ComponentType<Block4Props>>(
  () => import(/* webpackChunkName: "Block4" */ "../../blocks/block4/Block4"),
);
const Block2 = lazy<ComponentType<Block2Props>>(
  () => import(/* webpackChunkName: "Block2" */ "../../blocks/block2/Block2"),
);
const Block1 = lazy<ComponentType<Block1Props>>(
  () => import(/* webpackChunkName: "Block1" */ "../../blocks/block1/Block1"),
);

export type BlockBuilderProps = {
  items: GenericBlockProps[];
};

// Sections that need to be loaded before network idle or inview
// It won't load if you don't add it here when for instance a block is position: fixed.
const NON_LAZY_LOAD_SECTIONS: BlockSchemaName[] = [];
const INITIAL_SECTIONS_TO_LOAD: number = 2;
const INVIEW_LOAD_ONLY_SECTIONS: BlockSchemaName[] = [];

export const BlockBuilder = ({ items }: BlockBuilderProps) => {
  if (!items?.length) return null;

  const firstBlocks = [items?.[0], items?.[1]].filter(Boolean);
  firstBlocks?.map((block) => {
    const b = block;
    if (b?.image) b.image.priority = true;
    if (b?.mobileImage) b.mobileImage.priority = true;
    if (b?.video) b.video.priority = true;

    b.decorations?.map((decoration: DecorationProps | CSSDecorationProps) => {
      const d = decoration as any;
      if (d?.image) d.image.priority = true;
      if (d?.mobile?.image) d.mobile.image.priority = true;
      if (d?.tablet?.image) d.tablet.image.priority = true;
      if (d?.desktop?.image) d.desktop.image.priority = true;
      if (d.preset?.mobile?.image) d.preset.mobile.image.priority = true;
      if (d.preset?.tablet?.image) d.preset.tablet.image.priority = true;
      if (d.preset?.desktop?.image) d.preset.desktop.image.priority = true;
      return d;
    });
  });

  return (
    <main>
      {items?.map((item, i) => (
        <Suspense fallback={``} key={item._key}>
          <BlockErrorBoundary>
            <BlockLoadInView
              // show essential sections immediately
              enabled={
                i > INITIAL_SECTIONS_TO_LOAD &&
                NON_LAZY_LOAD_SECTIONS.indexOf(item._type) === -1
              }
              // load non essential sections after network idle
              // and heavy non essential sections only when in view
              networkIdle={INVIEW_LOAD_ONLY_SECTIONS.indexOf(item._type) === -1}
              background={item.theme?.background}
              block={item._type}
              _key={item._key}
              slug={item.slug}
              index={i}
            >
              {/* all blocks */}
              {item._type === "block.block4" && (
                <Block4 {...(item as Block4Props)} />
              )}
              {item._type === "block.block2" && (
                <Block2 {...(item as Block2Props)} />
              )}
              {item._type === "block.block1" && (
                <Block1 {...(item as Block1Props)} />
              )}
              {item._type === "block.block10" && (
                <Block10 {...(item as Block10Props)} />
              )}

              {item._type === "block.block0" && (
                <Block0 {...(item as Block0Props)} />
              )}

              {item._type === "block.block12" && (
                <Block12 {...(item as Block12Props)} />
              )}

              {item._type === "block.block13" && (
                <Block13 {...(item as Block13Props)} />
              )}

              {item._type === "block.block14" && (
                <Block14 {...(item as Block14Props)} />
              )}

              {item._type === "block.block15" && (
                <Block15 {...(item as Block15Props)} />
              )}

              {item._type === "block.block16" && (
                <Block16 {...(item as Block16Props)} />
              )}

              {item._type === "block.block7" && (
                <Block7 {...(item as Block7Props)} />
              )}

              {item._type === "block.block17" && (
                <Block17 {...(item as Block17Props)} />
              )}

              {item._type === "block.block18" && (
                <Block18 {...(item as Block18Props)} />
              )}

              {item._type === "block.block3" && (
                <Block3 {...(item as Block3Props)} />
              )}

              {item._type === "block.block5" && (
                <Block5 {...(item as Block5Props)} />
              )}
            </BlockLoadInView>
          </BlockErrorBoundary>
        </Suspense>
      ))}
    </main>
  );
};

export const BlockBuilderMemo = React.memo(BlockBuilder);
