import { PageContext } from "../../context/PageContext";
import { GenericModuleProps } from "../../types";
import { ModuleSchemaName } from "../../types.sanity";
import { LazyLoadInView } from "./LazyLoadInView";
import ModuleErrorBoundary from "./ModuleErrorBoundary";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { Suspense } from "react";

const Story = dynamic<GenericModuleProps>(
  () =>
    import(/* webpackChunkName: "Story" */ "../../modules/Story/Story") as any,
  { suspense: true }
);

const Slides = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "Slides" */ "../../modules/Slides/Slides"
    ) as any,
  { suspense: true }
);

const Gallery = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "Gallery" */ "../../modules/Gallery/Gallery"
    ) as any,
  { suspense: true }
);

const TextImage = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "TextImage" */ "../../modules/TextImage/TextImage"
    ) as any,
  { suspense: true }
);

const Billboard = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "Billboard" */ "../../modules/Billboard/Billboard"
    ) as any,
  { suspense: true }
);

const Breadcrumb = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "Breadcrumb" */ "../../modules/Breadcrumb/Breadcrumb"
    ) as any,
  { suspense: true }
);

const CardGrid = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "CardGrid" */ "../../modules/CardGrid/CardGrid"
    ) as any,
  { suspense: true }
);

const RichText = dynamic<GenericModuleProps>(
  () =>
    import(
      /* webpackChunkName: "RichText" */ "../../modules/RichText/RichText"
    ) as any,
  { suspense: true }
);

export type ModuleBuilderProps = {
  items: GenericModuleProps[];
};

// Sections that need to be loaded before network idle or inview
// It won't load if you don't add it here when for instance a module is position: fixed.
const NON_LAZY_LOAD_SECTIONS: ModuleSchemaName[] = [];
const INITIAL_SECTIONS_TO_LOAD: number = 2;
const INVIEW_LOAD_ONLY_SECTIONS: ModuleSchemaName[] = [];

export const ModuleBuilder = ({ items }: ModuleBuilderProps) => {
  const { sitemapItem } = useContext(PageContext);

  const hasH1 = items.some(({ _type }) => _type.startsWith("hero."));

  return (
    <main>
      {/* insert h1 at the top if there are no hero and no breadcrumbs */}
      {!hasH1 && sitemapItem?.title && (
        <h1 className="sr-only">{sitemapItem.title}</h1>
      )}

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
            >
              {item._type === "module.richtext" && <RichText {...item} />}
              {item._type === "module.breadcrumb" && <Breadcrumb {...item} />}
              {item._type === "module.cardgrid" && <CardGrid {...item} />}
              {item._type === "module.billboard" && <Billboard {...item} />}
              {item._type === "module.textimage" && <TextImage {...item} />}
              {item._type === "module.gallery" && <Gallery {...item} />}
              {item._type === "module.slides" && <Slides {...item} />}
              {item._type === "module.story" && <Story {...item} />}
            </LazyLoadInView>
          </ModuleErrorBoundary>
        </Suspense>
      ))}
    </main>
  );
};

export const ModuleBuilderMemo = React.memo(ModuleBuilder);
