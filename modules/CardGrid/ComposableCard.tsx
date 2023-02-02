import { backgroundClasses, borderClasses } from "../../colors";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroup } from "../../components/buttons/ButtonGroup";
import PortableText from "../../components/content/PortableText";
import { IconLoaderProps } from "../../components/images/IconLoader";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import {
  SizeType as TextSizeType,
  TextProps,
} from "../../components/module/Text";
import {
  SizeType as TitleSizeType,
  TitleProps,
  WeightType,
} from "../../components/module/Title";
import { IconType, ImageType } from "../../types";
import {
  CardAlignType,
  CardBackgroundColorType,
  BorderColorType,
  IconColorType,
  IconSizeType,
  CardEffectType,
  ImageHeightType,
  ImageRatioType,
  ImageRoundedType,
  TextColorType,
  TitleColorType,
  CardSpacingType,
  ComposableCardThemeType,
} from "./ComposableCardOptions";
import cx from "classnames";
import Link from "next/link";
import React, { ComponentType, lazy } from "react";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
    ),
);

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

export type ComposableCardProps = {
  type?: "card.composable";
  cover?: ImageType;
  image?: ImageType;
  icon?: IconType;
  title?: string;
  subtitle?: string;
  text?: React.ReactElement;
  buttons?: ButtonProps[];
  themeName?: ComposableCardThemeType;
  theme?: {
    card?: {
      align?: CardAlignType;
      background?: CardBackgroundColorType;
      shadow?: boolean;
      border?: BorderColorType;
      effect?: CardEffectType;
      spacing?: CardSpacingType;
    };
    image?: {
      ratio?: ImageRatioType;
      height?: ImageHeightType;
      rounded?: ImageRoundedType;
    };
    icon?: {
      size?: IconSizeType;
      color?: IconColorType;
    };
    title?: {
      size?: TitleSizeType;
      color?: TitleColorType;
      weight?: WeightType;
    };
    subtitle?: {
      size?: TitleSizeType;
      color?: TitleColorType;
      weight?: WeightType;
    };
    text?: {
      size?: TextSizeType;
      color?: TextColorType;
    };
    buttons?: {
      hidden?: boolean;
    };
  };
};

const ratioClasses: Record<ImageRatioType, string> = {
  auto: "",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-[1/1]",
  "3/2": "aspect-[3/2]",
};

const iconSizeClasses: Record<IconSizeType, string> = {
  sm: "w-14 h-14",
  lg: "w-20 h-20",
};

const imageHeightClasses: Record<ImageHeightType, string> = {
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

const cardVerticalSpacingClasses: Record<CardSpacingType, string> = {
  md: "py-5 sm:py-6 md:py-8 lg:py-10",
  lg: "py-10 sm:py-12 md:py-16 lg:py-20",
};

export const COMPOSABLE_CARD_THEMES: Record<
  ComposableCardThemeType,
  ComposableCardProps["theme"]
> = {
  department: {
    card: { border: "neutral-200" },
    title: { size: "lg", color: "neutral-500" },
    text: { size: "md", color: "neutral-900" },
    image: { height: "sm", ratio: "1/1", rounded: "full" },
  },

  person: {
    title: { size: "md", color: "brand-500" },
    subtitle: { size: "md", color: "neutral-500", weight: "regular" },
    image: { rounded: "xl", ratio: "3/2", height: "lg" },
    text: { color: "neutral-900", size: "lg" },
  },
};

export const ComposableCard = ({
  title,
  subtitle,
  text,
  image,
  cover,
  icon,
  theme,
  themeName,
  buttons,
}: ComposableCardProps) => {
  const cardClickable = buttons?.length === 1 && buttons?.[0]?.href;

  if (themeName && COMPOSABLE_CARD_THEMES[themeName]) {
    theme = COMPOSABLE_CARD_THEMES[themeName];
  }

  // add white background when there is a shadow
  if (theme?.card?.shadow && !theme?.card?.background)
    theme.card.background = "white";

  // add white background when there is a border and clickable
  if (cardClickable && theme?.card?.border && !theme?.card?.background)
    theme.card.background = "white";

  const hasContent =
    subtitle || title || text || icon || image || Boolean(buttons?.length);

  return (
    <div className="h-full relative group">
      {/* overlay to make the entire card clickable */}
      {cardClickable && (
        <Link
          href={buttons?.[0]?.href || ""}
          className="absolute inset-0 z-10 opacity-0"
        >
          <span className="sr-only">{buttons?.[0].label}</span>
        </Link>
      )}

      <div
        className={cx(
          "flex flex-col relative gap-4 overflow-hidden h-full",
          theme?.card?.background && backgroundClasses[theme?.card?.background],
          theme?.card?.border && borderClasses[theme?.card?.border],
          {
            ["text-left"]: theme?.card?.align === "left",
            ["text-center"]: theme?.card?.align === "center",
            ["text-right"]: theme?.card?.align === "right",
            ["border-2"]: theme?.card?.border,
            ["rounded-2xl md:rounded-3xl"]:
              theme?.card?.background ||
              theme?.card?.border ||
              theme?.card?.shadow,
            ["drop-shadow-[10px_16px_5px_rgba(89,93,106,0.05)] md:drop-shadow-[10px_16px_32px_rgba(89,93,106,0.15)]"]:
              theme?.card?.shadow,
            ["transition-drop-shadow group-hover:drop-shadow-[10px_16px_5px_rgba(89,93,106,0.05)] md:group-hover:drop-shadow-[10px_16px_32px_rgba(89,93,106,0.15)]"]:
              cardClickable,
          },
        )}
      >
        {cover && (
          <div
            className={cx("relative overflow-hidden w-full aspect-video", {
              ["-mb-4"]:
                theme?.card?.background ||
                theme?.card?.border ||
                theme?.card?.shadow,
              ["grayscale group-hover:grayscale-0 transition-all"]:
                theme?.card?.effect === "grayscale",
            })}
          >
            <div
              className={cx("absolute inset-0", {
                ["transition-transform ease-out-cubic group-hover:scale-110 duration-500 origin-center"]:
                  cardClickable,
              })}
            >
              <ResponsiveImage {...cover} fill />
            </div>
          </div>
        )}

        {hasContent && (
          <div
            className={cx("flex gap-4 flex-col z-1 relative", {
              "px-5 sm:px-6 md:px-7 lg:px-8 2xl:px-10":
                theme?.card?.border ||
                theme?.card?.background ||
                theme?.card?.shadow,
              [cardVerticalSpacingClasses[theme?.card?.spacing || "md"]]:
                theme?.card?.border ||
                theme?.card?.background ||
                theme?.card?.shadow,
            })}
          >
            {image && (
              <div
                className={cx("inline", {
                  ["grayscale group-hover:grayscale-0 transition-all"]:
                    theme?.card?.effect === "grayscale",
                })}
              >
                <div
                  className={cx(
                    "relative inline-flex overflow-hidden max-w-full",
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
                      theme?.image?.rounded &&
                      roundedClasses[theme?.image?.rounded]
                    }
                  />
                </div>
              </div>
            )}

            {icon && (
              <div className="mb-4 md:mb-7 lg:mb-9 xl:mb-11">
                <IconLoader
                  icon={icon}
                  color={theme?.icon?.color || "brand-500"}
                  title={["icon", icon, theme?.icon?.color]
                    .filter(Boolean)
                    .join(" ")}
                  className={cx(
                    "inline-block",
                    iconSizeClasses[theme?.icon?.size || "sm"],
                    {
                      ["grayscale group-hover:grayscale-0 transition-all"]:
                        theme?.card?.effect === "grayscale",
                    },
                  )}
                />
              </div>
            )}

            {title && (
              <Title
                as="h3"
                color={theme?.title?.color}
                size={theme?.title?.size}
                weight={theme?.title?.weight}
                className={cx({
                  ["group-hover:underline"]:
                    cardClickable && theme?.card?.effect !== "grayscale",
                  ["opacity-80 brightness-0 group-hover:brightness-100 group-hover:opacity-100 transition-all"]:
                    theme?.card?.effect === "grayscale",
                })}
              >
                {title}
              </Title>
            )}

            {subtitle && (
              <Title
                as="span"
                color={theme?.subtitle?.color}
                size={theme?.subtitle?.size}
                weight={theme?.subtitle?.weight}
                className={cx({
                  ["opacity-80 brightness-0 group-hover:brightness-100 group-hover:opacity-100 transition-all"]:
                    theme?.card?.effect === "grayscale",
                })}
              >
                {subtitle}
              </Title>
            )}

            {text && (
              <Text
                as="div"
                size={theme?.text?.size || "md"}
                color={theme?.text?.color || "neutral-900"}
                align={theme?.card?.align}
                className={cx("underline-links break-words", {
                  ["opacity-75"]: theme?.text?.color === "white",
                })}
              >
                {text &&
                  (typeof text === "string" ? (
                    text
                  ) : (
                    <PortableText content={text as any} />
                  ))}
              </Text>
            )}

            {buttons && (
              <ButtonGroup
                items={buttons}
                stretch={false}
                direction="vertical"
                className={cx("mt-1 lg:mt-5 xl:mt-10", {
                  ["opacity-80 saturate-0 group-hover:saturate-100 group-hover:opacity-100 transition-all"]:
                    theme?.card?.effect === "grayscale",
                  ["hidden"]: theme?.buttons?.hidden,
                })}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ComposableCard);
