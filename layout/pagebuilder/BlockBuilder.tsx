import { Block1Props } from "../../blocks/block1/Block1";
import { Block2Props } from "../../blocks/block2/Block2";
import { Block3Props } from "../../blocks/block3/Block3";
import { Block4Props } from "../../blocks/block4/Block4";
import { Block6Props } from "../../blocks/block6/Block6";
import { Block8Props } from "../../blocks/block8/Block8";
import { Block9Props } from "../../blocks/block9/Block9";
import { Block11Props } from "../../blocks/block11/Block11";
import { GenericBlockProps } from "../../types";
import { BlockSchemaName } from "../../types.sanity";
import BlockErrorBoundary from "./BlockErrorBoundary";
import { LazyLoadInView } from "./LazyLoadInView";
import React, { ComponentType } from "react";
import { Suspense, lazy } from "react";

const Block11 = lazy<ComponentType<Block11Props>>(
  () =>
    import(/* webpackChunkName: "Block11" */ "../../blocks/block11/Block11"),
);

const Block8 = lazy<ComponentType<Block8Props>>(
  () => import(/* webpackChunkName: "Block8" */ "../../blocks/block8/Block8"),
);
const Block9 = lazy<ComponentType<Block9Props>>(
  () => import(/* webpackChunkName: "Block9" */ "../../blocks/block9/Block9"),
);
const Block6 = lazy<ComponentType<Block6Props>>(
  () => import(/* webpackChunkName: "Block6" */ "../../blocks/block6/Block6"),
);
const Block4 = lazy<ComponentType<Block4Props>>(
  () => import(/* webpackChunkName: "Block4" */ "../../blocks/block4/Block4"),
);
const Block3 = lazy<ComponentType<Block3Props>>(
  () => import(/* webpackChunkName: "Block3" */ "../../blocks/block3/Block3"),
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
  return (
    <main>
      {items?.map((item, i) => (
        <Suspense fallback={``} key={item._key}>
          <BlockErrorBoundary>
            <LazyLoadInView
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
              id={item._key}
            >
              {/* all blocks */}

              {item._type === "block.block4" && (
                <Block4 {...(item as Block4Props)} />
              )}
              {item._type === "block.block3" && (
                <Block3 {...(item as Block3Props)} />
              )}
              {item._type === "block.block2" && (
                <Block2 {...(item as Block2Props)} />
              )}
              {item._type === "block.block1" && (
                <Block1 {...(item as Block1Props)} />
              )}
              {item._type === "block.block8" && (
                <Block8 {...(item as Block8Props)} />
              )}
              {item._type === "block.block6" && (
                <Block6 {...(item as Block6Props)} />
              )}
              {item._type === "block.block9" && (
                <Block9 {...(item as Block9Props)} />
              )}

              {item._type === "block.block11" && (
                <Block11 {...(item as Block11Props)} />
              )}
            </LazyLoadInView>
          </BlockErrorBoundary>
        </Suspense>
      ))}
    </main>
  );
};

export const BlockBuilderMemo = React.memo(BlockBuilder);
