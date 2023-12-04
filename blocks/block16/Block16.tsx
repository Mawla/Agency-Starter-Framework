import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import { ImageType } from "../../types";
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

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

export type Block16Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;

  buttons?: ButtonProps[];
  items?: {
    _key?: string;
    title?: string;
    image?: ImageType;
  }[];
};

export const Block16 = ({
  theme,
  decorations,
  title,
  intro,

  buttons,
  items,
}: Block16Props) => {
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

      {items && Boolean(items?.filter(Boolean).length) && (
        <div
          className={cx("flex flex-wrap items-center gap-6 lg:gap-14", {
            ["mt-10"]: title || shouldRenderPortableText(intro),
            ["justify-center"]:
              theme?.block?.align !== "left" && theme?.block?.align !== "right",
            ["justify-start"]: theme?.block?.align === "left",
            ["justify-end"]: theme?.block?.align === "right",
          })}
        >
          {items?.map(({ _key, image }, i) => (
            <div
              key={_key}
              className="shrink-0 h-8 md:h-10 lg:h-12 relative snap-center"
              style={{
                aspectRatio: image
                  ? getOriginalImageDimensions(image.src).aspectRatio || "auto"
                  : undefined,
              }}
              data-animate="zoom-in"
              data-animate-duration="500"
            >
              {image && <ResponsiveImage {...image} fill preserveAspectRatio />}
            </div>
          ))}
        </div>
      )}

      {buttons && Boolean(buttons?.filter(Boolean).length) && (
        <div
          className={cx(
            "flex flex-col gap-6 max-w-4xl mt-14",
            textAlignClasses[theme?.block?.align || "center"],
          )}
        >
          <div>
            <ButtonGroup items={buttons} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Block16);
