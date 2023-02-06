import { PageContext } from "../../context/PageContext";
import { BillboardProps } from "../../modules/billboard/Billboard";
import { BreadcrumbProps } from "../../modules/breadcrumb/Breadcrumb";
import { CardGridProps } from "../../modules/cardgrid/CardGrid";
import { GalleryProps } from "../../modules/gallery/Gallery";
import { RichTextProps } from "../../modules/richtext/RichText";
import { SlidesProps } from "../../modules/slides/Slides";
import { StoryProps } from "../../modules/story/Story";
import { TextImageProps } from "../../modules/textimage/TextImage";
import { GenericModuleProps } from "../../types";
import { ModuleSchemaName } from "../../types.sanity";
import { LazyLoadInView } from "./LazyLoadInView";
import ModuleErrorBoundary from "./ModuleErrorBoundary";
import React, { ComponentType, useContext } from "react";
import { Suspense, lazy } from "react";

const Story = lazy<ComponentType<StoryProps>>(
  () => import(/* webpackChunkName: "Story" */ "../../modules/story/Story"),
);

const Slides = lazy<ComponentType<SlidesProps>>(
  () => import(/* webpackChunkName: "Slides" */ "../../modules/slides/Slides"),
);

const Gallery = lazy<ComponentType<GalleryProps>>(
  () =>
    import(/* webpackChunkName: "Gallery" */ "../../modules/gallery/Gallery"),
);

const TextImage = lazy<ComponentType<TextImageProps>>(
  () =>
    import(
      /* webpackChunkName: "TextImage" */ "../../modules/textimage/TextImage"
    ),
);

const Billboard = lazy<ComponentType<BillboardProps>>(
  () =>
    import(
      /* webpackChunkName: "Billboard" */ "../../modules/billboard/Billboard"
    ),
);

const Breadcrumb = lazy<ComponentType<BreadcrumbProps>>(
  () =>
    import(
      /* webpackChunkName: "Breadcrumb" */ "../../modules/breadcrumb/Breadcrumb"
    ),
);

const CardGrid = lazy<ComponentType<CardGridProps>>(
  () =>
    import(
      /* webpackChunkName: "CardGrid" */ "../../modules/cardgrid/CardGrid"
    ),
);

const RichText = lazy<ComponentType<RichTextProps>>(
  () =>
    import(
      /* webpackChunkName: "RichText" */ "../../modules/richtext/RichText"
    ),
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
              {item._type === "module.richtext" && (
                <RichText {...(item as RichTextProps)} />
              )}
              {item._type === "module.breadcrumb" && (
                <Breadcrumb {...(item as BreadcrumbProps)} />
              )}
              {item._type === "module.cardgrid" && (
                <CardGrid {...(item as CardGridProps)} />
              )}
              {item._type === "module.billboard" && (
                <Billboard {...(item as BillboardProps)} />
              )}
              {item._type === "module.textimage" && (
                <TextImage {...(item as TextImageProps)} />
              )}
              {item._type === "module.gallery" && (
                <Gallery {...(item as GalleryProps)} />
              )}
              {item._type === "module.slides" && (
                <Slides {...(item as SlidesProps)} />
              )}
              {item._type === "module.story" && (
                <Story {...(item as StoryProps)} />
              )}
            </LazyLoadInView>
          </ModuleErrorBoundary>
        </Suspense>
      ))}
    </main>
  );
};

export const ModuleBuilderMemo = React.memo(ModuleBuilder);
