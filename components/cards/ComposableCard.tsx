import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  paddingXClasses,
  paddingYClasses,
  textAlignClasses,
  textClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  HorizontalAlignType,
  ImageType,
  PaddingType,
} from "../../types";
import { DecorationsProps } from "../decorations/Decorations";
import {
  ImageHeightType,
  ImageRatioType,
  ImageRoundedType,
} from "./composablecard.options";
import cx from "classnames";
import { ComponentType, lazy } from "react";

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

export type ComposableCardProps = {
  _key?: string;
  image?: ImageType;
  title?: string;
  subtitle?: string;
  content?: PortableTextProps["content"];
  buttons?: ButtonProps[];
  decorations?: DecorationProps[];
  theme?: {
    card?: {
      color?: ColorType;
      align?: HorizontalAlignType;
      background?: ColorType;
      paddingX?: PaddingType;
      paddingY?: PaddingType;
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
      ratio?: ImageRatioType;
      height?: ImageHeightType;
      rounded?: ImageRoundedType;
    };
  };
};

const imageHeightClasses: Record<ImageHeightType, string> = {
  xs: "h-12",
  sm: "h-20",
  md: "h-24",
  lg: "h-[210px]",
  xl: "h-[230px]",
};

const roundedClasses: Record<ImageRoundedType, string> = {
  none: "",
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
};

const ratioClasses: Record<ImageRatioType, string> = {
  auto: "",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-[1/1]",
  "3/2": "aspect-[3/2]",
};

export const ComposableCard = ({
  title,
  subtitle,
  content,
  buttons,
  image,
  theme,
  decorations,
}: ComposableCardProps) => {
  return (
    <div
      className={cx(
        "h-full relative overflow-hidden",
        theme?.card?.color && textClasses[theme?.card?.color],
        theme?.card?.align && textAlignClasses[theme?.card?.align],
        theme?.border?.color && borderClasses[theme?.border?.color],
        theme?.border?.width && borderWidthClasses[theme?.border?.width],
        theme?.border?.radius && borderRadiusClasses[theme?.border?.radius],
        theme?.card?.background && backgroundClasses[theme?.card?.background],
        theme?.card?.paddingY && paddingYClasses[theme?.card?.paddingY],
        theme?.card?.paddingX && paddingXClasses[theme?.card?.paddingX],
      )}
    >
      <Decorations decorations={decorations} />
      <div
        className={cx("relative z-10 flex flex-col", {
          ["items-center"]: theme?.card?.align === "center",
          ["items-start"]: theme?.card?.align === "left",
          ["items-end"]: theme?.card?.align === "right",
        })}
      >
        {image && (
          <div className="block">
            <div
              className={cx(
                "mb-4 relative inline-flex overflow-hidden max-w-full",
                imageHeightClasses[theme?.image?.height || "xs"],
                theme?.image?.ratio && ratioClasses[theme?.image?.ratio],
                theme?.image?.rounded && roundedClasses[theme?.image?.rounded],
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
            as={theme?.title?.as || "span"}
            className="mb-4"
          >
            {title}
          </Title>
        )}
        {subtitle && (
          <Title
            {...theme?.subtitle}
            as={theme?.subtitle?.as || "span"}
            className="mb-4"
          >
            {subtitle}
          </Title>
        )}
        {content && (
          <Title as="div" {...theme?.content}>
            <PortableText content={content as any} />
          </Title>
        )}
        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-6">
            <ButtonGroup items={buttons} />
          </div>
        )}
      </div>
    </div>
  );
};
