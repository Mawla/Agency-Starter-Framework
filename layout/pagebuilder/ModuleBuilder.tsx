import { BreadcrumbProps } from "../../modules/breadcrumb/Breadcrumb";
import { GalleryProps } from "../../modules/gallery/Gallery";
import { ImageProps } from "../../modules/image/Image";
import { ResourceFeedProps } from "../../modules/resourcefeed/ResourceFeed";
import { ResourceStripProps } from "../../modules/resourcestrip/ResourceStrip";
import { RichTextProps } from "../../modules/richtext/RichText";
import { SlidesProps } from "../../modules/slides/Slides";
import { StoryProps } from "../../modules/story/Story";
import { TextImageProps } from "../../modules/textimage/TextImage";
import { VideoProps } from "../../modules/video/Video";
import { GenericModuleProps } from "../../types";
import { ModuleSchemaName } from "../../types.sanity";
import { LazyLoadInView } from "./LazyLoadInView";
import ModuleErrorBoundary from "./ModuleErrorBoundary";
import React, { ComponentType } from "react";
import { Suspense, lazy } from "react";

const Image = lazy<ComponentType<ImageProps>>(
  () => import(/* webpackChunkName: "Image" */ "../../modules/image/Image")
);

const Video = lazy<ComponentType<VideoProps>>(
  () => import(/* webpackChunkName: "Video" */ "../../modules/video/Video")
);

const ResourceStrip = lazy<ComponentType<ResourceStripProps>>(
  () =>
    import(
      /* webpackChunkName: "ResourceStrip" */ "../../modules/resourcestrip/ResourceStrip"
    )
);

const ResourceFeed = lazy<ComponentType<ResourceFeedProps>>(
  () =>
    import(
      /* webpackChunkName: "Feed" */ "../../modules/resourcefeed/ResourceFeed"
    )
);

const Story = lazy<ComponentType<StoryProps>>(
  () => import(/* webpackChunkName: "Story" */ "../../modules/story/Story")
);

const Slides = lazy<ComponentType<SlidesProps>>(
  () => import(/* webpackChunkName: "Slides" */ "../../modules/slides/Slides")
);

const Gallery = lazy<ComponentType<GalleryProps>>(
  () =>
    import(/* webpackChunkName: "Gallery" */ "../../modules/gallery/Gallery")
);

const TextImage = lazy<ComponentType<TextImageProps>>(
  () =>
    import(
      /* webpackChunkName: "TextImage" */ "../../modules/textimage/TextImage"
    )
);

const Breadcrumb = lazy<ComponentType<BreadcrumbProps>>(
  () =>
    import(
      /* webpackChunkName: "Breadcrumb" */ "../../modules/breadcrumb/Breadcrumb"
    )
);

const RichText = lazy<ComponentType<RichTextProps>>(
  () =>
    import(/* webpackChunkName: "RichText" */ "../../modules/richtext/RichText")
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
            >
              {item._type === "module.richtext" && (
                <RichText {...(item as RichTextProps)} />
              )}
              {item._type === "module.breadcrumb" && (
                <Breadcrumb {...(item as BreadcrumbProps)} />
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
              {item._type === "module.resourcefeed" && (
                <ResourceFeed {...(item as ResourceFeedProps)} />
              )}
              {item._type === "module.resourcestrip" && (
                <ResourceStrip {...(item as ResourceStripProps)} />
              )}
              {item._type === "module.video" && (
                <Video {...(item as VideoProps)} />
              )}
              {item._type === "module.image" && (
                <Image {...(item as ImageProps)} />
              )}
            </LazyLoadInView>
          </ModuleErrorBoundary>
        </Suspense>
      ))}
    </main>
  );
};

export const ModuleBuilderMemo = React.memo(ModuleBuilder);
