import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { DecorationsProps } from "../../components/decorations/Decorations";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import {
  textAlignClasses,
  TextThemeType,
} from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { VideoProps } from "../../components/video/Video";
import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import { borderRadiusClasses } from "../../theme";
import { BorderRadiusType, ImageType, VideoType } from "../../types";
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

const Decorations = lazy<ComponentType<DecorationsProps>>(
  () =>
    import(
      /* webpackChunkName: "Decorations" */ "../../components/decorations/Decorations"
    ),
);

const Video = lazy<ComponentType<VideoProps>>(
  () => import(/* webpackChunkName: "Video" */ "../../components/video/Video"),
);

export type Block4Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    subtitle?: TitleThemeType;
    intro?: TextThemeType;
    body?: TextThemeType;
    image?: {
      rounded?: BorderRadiusType;
    };
  };
  decorations?: DecorationProps[];
  title?: string;
  subtitle?: string;
  intro?: React.ReactNode;
  body?: React.ReactNode;
  image?: ImageType;
  video?: VideoType;
  buttons?: ButtonProps[];
};

export const Block4 = ({
  theme,
  decorations,
  title,
  subtitle,
  intro,
  body,
  image,
  video,
  buttons,
}: Block4Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div className="flex flex-col gap-6">
        <div
          className={cx(
            "flex flex-col gap-6 max-w-4xl relative z-10 w-full",
            textAlignClasses[theme?.block?.align || "center"],
          )}
        >
          {title && (
            <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
              {title}
            </Title>
          )}
          {subtitle && (
            <Title
              {...theme?.subtitle}
              size={theme?.subtitle?.size || "2xl"}
              as={theme?.subtitle?.as || "h3"}
            >
              {subtitle}
            </Title>
          )}
          {shouldRenderPortableText(intro) && (
            <Text
              size={theme?.intro?.size || "xl"}
              color={theme?.intro?.color}
              weight={theme?.intro?.weight}
              font={theme?.intro?.font}
              align={theme?.block?.align || "center"}
            >
              <PortableText content={intro as PortableTextBlock[]} />
            </Text>
          )}

          {shouldRenderPortableText(body) && (
            <Text
              size={theme?.body?.size || "xl"}
              color={theme?.body?.color}
              weight={theme?.body?.weight}
              font={theme?.body?.font}
              align={theme?.block?.align || "center"}
            >
              <PortableText content={body as PortableTextBlock[]} />
            </Text>
          )}
          {buttons && Boolean(buttons?.filter(Boolean).length) && (
            <div className="mt-6">
              <ButtonGroup
                items={buttons}
                align={theme?.block?.align || "center"}
                direction="horizontal"
              />
            </div>
          )}
        </div>

        <div
          className={`flex flex-col gap-6 w-full max-w-screen-lg relative z-10 ${
            textAlignClasses[theme?.block?.align || "center"]
          }`}
        >
          {image && (
            <div
              className="mt-6 relative"
              style={{
                aspectRatio:
                  getOriginalImageDimensions(image?.src).aspectRatio || "auto",
              }}
            >
              <ResponsiveImage
                {...image}
                preserveAspectRatio
                zoom
                className={cx(
                  "inline-block",
                  theme?.image?.rounded &&
                    borderRadiusClasses[theme?.image?.rounded],
                )}
              />
              <Decorations decorations={decorations} location="image" />
            </div>
          )}

          {video && (
            <div className="relative">
              <Video
                {...video}
                className={cx(
                  theme?.image?.rounded && "overflow-hidden",
                  theme?.image?.rounded &&
                    borderRadiusClasses[theme?.image?.rounded],
                )}
              />
              <Decorations decorations={decorations} location="image" />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(Block4);
