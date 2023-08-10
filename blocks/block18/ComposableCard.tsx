import { DecorationProps } from "../../components/block/Decoration";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
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

const Decoration = lazy<ComponentType<DecorationProps>>(
  () =>
    import(
      /* webpackChunkName: "Decoration" */ "../../components/block/Decoration"
    ),
);

export type ComposableCardProps = {
  _key?: string;
  image?: ImageType;
  title?: string;
  content?: PortableTextProps["content"];
  buttons?: ButtonProps[];
  decorations?: DecorationProps[];
  theme?: {
    card?: {
      color?: ColorType;
      align?: HorizontalAlignType;
    };
    title?: TitleThemeType;
    content?: TitleThemeType;
    background?: {
      color?: ColorType;
      paddingX?: PaddingType;
      paddingY?: PaddingType;
    };
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
        theme?.background?.color && backgroundClasses[theme?.background?.color],
        theme?.background?.paddingY &&
          paddingYClasses[theme?.background?.paddingY],
        theme?.background?.paddingX &&
          paddingXClasses[theme?.background?.paddingX],
      )}
    >
      {decorations?.filter(Boolean).map((decoration) => (
        <Decoration
          {...decoration}
          key={decoration._key}
          _key={decoration._key}
        />
      ))}

      <div
        className={cx("relative z-10 flex flex-col", {
          ["items-center"]: theme?.card?.align === "center",
          ["items-start"]: theme?.card?.align === "left",
          ["items-end"]: theme?.card?.align === "right",
        })}
      >
        {image && (
          <div className="inline">
            <div
              className={cx(
                "mb-4 relative inline-flex overflow-hidden max-w-full",
                imageHeightClasses[theme?.image?.height || "sm"],
                ratioClasses[theme?.image?.ratio || "16/9"],
              )}
              style={{
                aspectRatio:
                  theme?.image?.ratio === "auto" || !theme?.image?.height
                    ? `${image?.width} / ${image?.height}`
                    : undefined,
              }}
            >
              <ResponsiveImage
                fill
                {...image}
                className={
                  theme?.image?.rounded && roundedClasses[theme?.image?.rounded]
                }
              />
            </div>
          </div>
        )}
        {title && (
          <Title as="span" {...theme?.title} className="mb-4">
            {title}
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
