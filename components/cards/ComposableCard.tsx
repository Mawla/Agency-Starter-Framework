import { ColumnType } from "../../blocks/block18/block18.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { bumpHeadingLevel } from "../../helpers/utils/string";
import {
  alignItemsClasses,
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  paddingXClasses,
  paddingTopClasses,
  paddingBottomClasses,
  textClasses,
  ratioClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  HorizontalAlignType,
  HtmlTextNodeType,
  ImageType,
  PaddingType,
  RatioType,
} from "../../types";
import { LinkProps } from "../buttons/Link";
import { DecorationsProps } from "../decorations/Decorations";
import { textAlignClasses } from "../text/text.options";
import { ImageHeightType } from "./composablecard.options";
import cx from "clsx";
import React from "react";
import { ComponentType, lazy } from "react";
import { PortableTextBlock } from "sanity";
import { twMerge } from "tailwind-merge";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

const Decorations = lazy<ComponentType<DecorationsProps>>(
  () =>
    import(
      /* webpackChunkName: "Decorations" */ "../../components/decorations/Decorations"
    ),
);

const Link = lazy<ComponentType<LinkProps>>(
  () => import(/* webpackChunkName: "Link" */ "../../components/buttons/Link"),
);

export type ComposableCardProps = {
  type: "card.composable";
  _key?: string;
  image?: ImageType;
  title?: string;
  subtitle?: string;
  content?: PortableTextProps["content"];
  buttons?: ButtonProps[];
  decorations?: DecorationProps[];
  blockTitleLevel?: HtmlTextNodeType;
  theme?: {
    card?: {
      color?: ColorType;
      align?: HorizontalAlignType;
      background?: ColorType;
      paddingX?: PaddingType;
      paddingTop?: PaddingType;
      paddingBottom?: PaddingType;
      columns?: ColumnType;
    };
    title?: TitleThemeType;
    subtitle?: TitleThemeType;
    content?: TitleThemeType;
    border?: {
      color?: ColorType;
      radius?: BorderRadiusType;
      width?: BorderWidthType;
    };
    image?: {
      ratio?: RatioType;
      height?: ImageHeightType;
      rounded?: BorderRadiusType;
    };
    buttons?: {
      hidden?: boolean;
    };
  };
};

const imageHeightClasses: Record<ImageHeightType, string> = {
  "2xs": "h-6",
  xs: "h-12",
  sm: "h-20",
  md: "h-24",
  lg: "h-[210px]",
  xl: "h-[230px]",
};

export const ComposableCard = ({
  title,
  subtitle,
  content,
  buttons,
  image,
  theme,
  decorations,
  blockTitleLevel = "span",
}: ComposableCardProps) => {
  const cardClickable = buttons?.length === 1 && buttons?.[0]?.href;

  return (
    <div
      className={cx(
        "h-full relative overflow-hidden group",
        theme?.card?.color && textClasses[theme?.card?.color],
        theme?.card?.align && textAlignClasses[theme?.card?.align],
        theme?.border?.color && "border",
        theme?.border?.color && borderClasses[theme?.border?.color],
        theme?.border?.color && borderWidthClasses[theme?.border?.width || 1],
        theme?.border?.radius && borderRadiusClasses[theme?.border?.radius],
        theme?.card?.background && backgroundClasses[theme?.card?.background],
        theme?.card?.paddingTop && paddingTopClasses[theme?.card?.paddingTop],
        theme?.card?.paddingBottom &&
          paddingBottomClasses[theme?.card?.paddingBottom],
        theme?.card?.paddingX && paddingXClasses[theme?.card?.paddingX],
      )}
    >
      {cardClickable && buttons?.[0]?.href && (
        <Link href={buttons?.[0]?.href} target={buttons?.[0]?.target}>
          <span className="absolute inset-0 z-20 opacity-0">
            <span className="sr-only">{buttons?.[0].label}</span>
          </span>
        </Link>
      )}

      <Decorations decorations={decorations} />
      <div
        className={cx(
          "relative z-10 flex flex-col gap-4",
          theme?.card?.align && alignItemsClasses[theme?.card?.align],
        )}
      >
        {image && (
          <div className="block w-full">
            <div
              className={twMerge(
                "relative inline-flex overflow-hidden max-w-full",
                imageHeightClasses[theme?.image?.height || "xs"],
                theme?.image?.ratio && ratioClasses[theme?.image?.ratio],
                theme?.image?.rounded &&
                  borderRadiusClasses[theme?.image?.rounded],
                theme?.image?.height === "xl" && "w-full h-auto",
              )}
              style={{
                aspectRatio:
                  image && !theme?.image?.ratio
                    ? getOriginalImageDimensions(image.src).aspectRatio ||
                      "auto"
                    : undefined,
              }}
            >
              <ResponsiveImage {...image} fill />
            </div>
          </div>
        )}
        {title && (
          <Title
            {...theme?.title}
            as={
              theme?.title?.as ||
              (bumpHeadingLevel(blockTitleLevel) as HtmlTextNodeType)
            }
            className={cx(
              cardClickable && "group-hover:underline underline-offset-4",
            )}
          >
            {title}
          </Title>
        )}
        {subtitle && (
          <Title
            {...theme?.subtitle}
            as={
              theme?.subtitle?.as ||
              (bumpHeadingLevel(
                bumpHeadingLevel(blockTitleLevel),
              ) as HtmlTextNodeType)
            }
          >
            {subtitle}
          </Title>
        )}
        {content && (
          <Title as="div" {...theme?.content} className="format [&_p+ul]:mt-0">
            <PortableText content={content as PortableTextBlock[]} />
          </Title>
        )}
        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className={cx(theme?.buttons?.hidden && "hidden")}>
            <ButtonGroup items={buttons} />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ComposableCard);
