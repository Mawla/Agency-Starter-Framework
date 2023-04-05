import { GenericModuleProps } from "../../types";
import { ModuleSchemaName } from "../../types.sanity";
import { LazyLoadInView } from "./LazyLoadInView";
import ModuleErrorBoundary from "./ModuleErrorBoundary";
import React, { ComponentType } from "react";
import { Suspense, lazy } from "react";

export type ModuleBuilderProps = {
  items: GenericModuleProps[];
};

// Sections that need to be loaded before network idle or inview
// It won't load if you don't add it here when for instance a module is position: fixed.
const NON_LAZY_LOAD_SECTIONS: ModuleSchemaName[] = [];
const INITIAL_SECTIONS_TO_LOAD: number = 2;
const INVIEW_LOAD_ONLY_SECTIONS: ModuleSchemaName[] = [];

export const ModuleBuilder = ({ items }: ModuleBuilderProps) => {
  return (
    <main>
      {items?.map((item, i) => (
        <Suspense fallback={``} key={item._key}>
          <ModuleErrorBoundary>
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
              module={item._type}
              id={item._key}
            ></LazyLoadInView>
          </ModuleErrorBoundary>
        </Suspense>
      ))}
    </main>
  );
};

export const ModuleBuilderMemo = React.memo(ModuleBuilder);
