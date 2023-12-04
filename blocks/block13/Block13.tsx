import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import Link from "../../components/buttons/Link";
import { DecorationProps } from "../../components/decorations/Decoration";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { MobileScrollerProps } from "../../components/slider/MobileScroller";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import { truncate } from "../../helpers/utils/string";
import { ColorType, ImageType } from "../../types";
import cx from "clsx";
import React, { ComponentType, lazy } from "react";
import { PortableTextBlock } from "sanity";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const MobileScroller = lazy<ComponentType<MobileScrollerProps>>(
  () =>
    import(
      /* webpackChunkName: "MobileScroller" */ "../../components/slider/MobileScroller"
    ),
);

export type Block13Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    card?: {
      title?: ColorType;
      text?: ColorType;
    };
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  items?: {
    _id: string;
    title: string;
    date: string;
    image?: ImageType;
    href: string;
    intro?: string;
  }[];
};

export const Block13 = ({
  theme,
  decorations,
  title,
  intro,
  items,
}: Block13Props) => {
  if (!items?.length) return null;

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "flex flex-col gap-6 max-w-4xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}

        {shouldRenderPortableText(intro) && (
          <Text
            size={theme?.intro?.size || "xl"}
            color={theme?.intro?.color}
            weight={theme?.intro?.weight}
            align={theme?.block?.align || "center"}
          >
            <PortableText content={intro as PortableTextBlock[]} />
          </Text>
        )}
      </div>

      <div
        className={cx(
          "flex flex-col gap-6 mt-6 md:mt-8 lg:mt-10",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {Boolean(items?.length) && (
          <MobileScroller className="flex lg:grid lg:grid-cols-4 gap-10">
            {items?.map(({ _id, title, image, href, intro }) => (
              <div
                key={_id}
                className="card w-[300px] max-w-[75%] md:max-w-none shrink-0 lg:w-auto snap-center"
              >
                <div className="text-left relative group h-full flex flex-col">
                  <Link href={href} className="absolute inset-0 z-10">
                    <span className="sr-only">{title}</span>
                  </Link>

                  {image && (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <ResponsiveImage
                        {...image}
                        fill
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-6">
                    {title && (
                      <Title
                        as="h3"
                        size="2xl"
                        className="group-hover:underline"
                        color={theme?.card?.title}
                        weight="semibold"
                      >
                        {title}
                      </Title>
                    )}

                    {shouldRenderPortableText(intro) && (
                      <Text size="md" color={theme?.card?.text}>
                        {truncate(intro, 150)}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </MobileScroller>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block13);
