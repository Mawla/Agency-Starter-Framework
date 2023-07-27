import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { BreadcrumbProps } from "../../components/breadcrumb/Breadcrumb";
import { DateDisplayProps } from "../../components/date/DateDisplay";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { SocialShareProps } from "../../components/social/SocialShare";
import { TagProps } from "../../components/tags/Tag";
import { TextProps } from "../../components/text/Text";
import { joinList } from "../../helpers/utils/string";
import { ImageType } from "../../types";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text"),
);

const Tag = lazy<ComponentType<TagProps>>(
  () => import(/* webpackChunkName: "Tag" */ "../../components/tags/Tag"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const Breadcrumb = lazy<ComponentType<BreadcrumbProps>>(
  () =>
    import(
      /* webpackChunkName: "Breadcrumb" */ "../../components/breadcrumb/Breadcrumb"
    ),
);

const DateDisplay = lazy<ComponentType<DateDisplayProps>>(
  () =>
    import(
      /* webpackChunkName: "DateDisplay" */ "../../components/date/DateDisplay"
    ),
);

const SocialShare = lazy<ComponentType<SocialShareProps>>(
  () =>
    import(
      /* webpackChunkName: "SocialShare" */ "../../components/social/SocialShare"
    ),
);

export type Block14Props = {
  theme?: {
    block?: Omit<BlockThemeType, "align">;
  };
  title?: string;
  body?: React.ReactNode;
  tags?: { title?: string; href?: string }[];
  authors?: { name: string; image?: ImageType }[];
  date?: string;
};
export const Block14 = ({
  theme,
  title,
  body,
  tags,
  authors,
  date,
}: Block14Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <main className="py-8 lg:py-16 bg-white">
        <div className="grid grid-cols-12 px-4 mx-auto max-w-full gap-12">
          <aside
            className="hidden relative ml-auto lg:block col-span-1"
            aria-labelledby="sidebar-label"
          >
            <div className="sticky top-6 bg-black/[2%] p-2 rounded-lg border border-black/[8%]">
              <SocialShare title={title} direction="vertical" />
            </div>
          </aside>

          <article className="col-span-12 lg:col-span-11 xl:col-span-8 format format-sm sm:format-base lg:format-lg format-blue">
            <header className="mb-4 lg:mb-6 not-format">
              <nav className="flex" aria-label="Breadcrumb">
                <Breadcrumb wrap />
              </nav>
              <div className="flex items-center my-4 md:my-6">
                <div className="flex gap-1 flex-wrap">
                  {Boolean(tags?.length) &&
                    tags?.map((tag) => (
                      <Tag key={tag.title} label={tag.title} href={tag.href} />
                    ))}
                </div>
              </div>

              {title && (
                <h1 className="mb-4 text-2xl font-extrabold lg:mb-6 lg:text-4xl">
                  {title}
                </h1>
              )}

              <div className="py-4 border-t border-b border-black/10 text-sm">
                <address className="flex not-italic">
                  {authors && Boolean(authors?.length) && (
                    <div className="mr-3 inline-flex">
                      {authors.map(
                        ({ image }) =>
                          image && (
                            <span
                              className={cx(
                                "w-10 aspect-square relative rounded-full overflow-hidden border -mr-1",
                              )}
                              key={image.src}
                            >
                              <ResponsiveImage {...image} fill />
                            </span>
                          ),
                      )}
                    </div>
                  )}

                  <div>
                    {authors && Boolean(authors?.length) && (
                      <span className="block font-semibold">
                        {joinList(authors.map((a) => a.name))}
                      </span>
                    )}
                    {date && <DateDisplay datetime={date} pubdate />}
                  </div>
                </address>
              </div>
            </header>

            {body && <PortableText content={body as any} />}

            <div className="xl:hidden">
              <SocialShare title={title} direction="horizontal" />
            </div>
          </article>
          <aside
            className="hidden xl:block col-span-3"
            aria-labelledby="sidebar-label"
          >
            <h3 id="sidebar-label" className="sr-only">
              Sidebar
            </h3>
            <div className="p-5 mb-6 font-medium text-gray-500 bg-white rounded-lg border border-gray-200 divide-y divide-gray-200 shadow">
              <h4 className="mb-4 text-sm font-bold text-gray-900 uppercase">
                Latest news
              </h4>
              <div className="flex items-center py-4">
                <a href="#" className="shrink-0">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-1.png"
                    className="mr-4 w-12 max-w-full h-12 rounded-lg"
                    alt="Image 1"
                  />
                </a>
                <a href="#">
                  <h5 className="font-semibold leading-tight text-gray-900 hover:underline">
                    side bar article
                  </h5>
                </a>
              </div>
            </div>
            <div className="p-5 mb-6 bg-white rounded-lg border border-gray-200 shadow">
              sidebar widget subscribe
            </div>
          </aside>
        </div>
      </main>
    </Wrapper>
  );
};

export default React.memo(Block14);
