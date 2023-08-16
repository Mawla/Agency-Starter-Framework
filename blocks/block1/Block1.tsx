import Spacing from "../../components/block/Spacing";
import { WrapperProps } from "../../components/block/Wrapper";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { DecorationsProps } from "../../components/decorations/Decorations";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { ScriptsType } from "../../components/script/Script";
import { TextProps } from "../../components/text/Text";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { VideoProps } from "../../components/video/Video";
import {
  ColorType,
  ImageType,
  VerticalAlignType,
  VideoType,
} from "../../types";
import { mediaPositionType } from "./block1.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

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

const Video = lazy<ComponentType<VideoProps>>(
  () => import(/* webpackChunkName: "Video" */ "../../components/video/Video"),
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

const Scripts = lazy<ComponentType<ScriptsType>>(
  () =>
    import(/* webpackChunkName: "Scripts" */ "../../components/script/Script"),
);

export type Block1Props = {
  theme?: {
    block?: {
      background?: ColorType;
      space?: SpaceType;
    };
    layout?: {
      mediaPosition?: mediaPositionType;
      verticalAlign?: VerticalAlignType;
      verticalSpace?: SpaceType;
    };
    image?: {
      fullHeight?: boolean;
    };
    title?: TitleThemeType;
    intro?: TextThemeType;
    body?: TextThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  body?: React.ReactNode;
  image?: ImageType;
  video?: VideoType;
  script?: ScriptsType;
  buttons?: ButtonProps[];
};

export const verticalAlignClasses: Record<VerticalAlignType, string> = {
  top: "lg:items-start",
  middle: "lg:items-center",
  bottom: "lg:items-end",
};

export const Block1 = ({
  theme,
  decorations,
  title,
  intro,
  body,
  image,
  video,
  buttons,
  script,
}: Block1Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div className="gap-8 grid lg:grid-cols-2 xl:gap-16">
        <Spacing
          padding={theme?.layout?.verticalSpace}
          className={cx(
            "order-2 flex pt-0 sm:pt-0 md:pt-0 pb-0 sm:pb-0 md:pb-0",
            theme?.layout?.verticalAlign &&
              verticalAlignClasses[theme.layout.verticalAlign],
          )}
        >
          <div className="flex flex-col gap-8">
            {title && (
              <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
                {title}
              </Title>
            )}

            {intro && (
              <Text
                size={theme?.intro?.size || "lg"}
                color={theme?.intro?.color}
              >
                <PortableText content={intro as any} />
              </Text>
            )}

            {body && (
              <Text size={theme?.body?.size || "lg"} color={theme?.body?.color}>
                <PortableText content={body as any} />
              </Text>
            )}

            {buttons && Boolean(buttons?.filter(Boolean).length) && (
              <ButtonGroup items={buttons} />
            )}
          </div>
        </Spacing>

        {(image || video) && (
          <div
            className={cx(
              "order-1 mb-4 w-full lg:mb-0 lg:flex relative md:h-full max-w-[650px] lg:max-w-full",
              theme?.layout?.verticalAlign &&
                verticalAlignClasses[theme.layout.verticalAlign],
              {
                ["lg:order-3"]: theme?.layout?.mediaPosition !== "left",
                ["lg:order-1"]: theme?.layout?.mediaPosition === "left",
              },
            )}
          >
            {image && (
              <div className="relative h-full w-full">
                <div
                  className={cx(
                    "relative",
                    theme?.layout?.verticalAlign &&
                      verticalAlignClasses[theme.layout.verticalAlign],
                    {
                      ["aspect-video lg:aspect-auto h-full"]:
                        theme?.image?.fullHeight,
                      ["flex h-full [&>div]:!h-auto"]:
                        !theme?.image?.fullHeight,
                    },
                  )}
                >
                  <ResponsiveImage
                    {...image}
                    fill={theme?.image?.fullHeight}
                    className={
                      theme?.image?.fullHeight ? "absolute inset-0" : ""
                    }
                    roundSize={25}
                  />

                  <Decorations decorations={decorations} location="image" />
                </div>
              </div>
            )}
            {video && (
              <div
                className={cx(
                  "w-full h-full flex",
                  theme?.layout?.verticalAlign &&
                    verticalAlignClasses[theme.layout.verticalAlign],
                )}
              >
                <div className="w-full">
                  <div className="relative w-full h-auto aspect-video">
                    <Video {...video} className="w-full" />
                    <Decorations decorations={decorations} location="image" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {script && (
          <div
            className={cx(
              "w-full flex relative order-3",
              "[&>div]:w-full [&>div>div]:w-full",
              theme?.layout?.verticalAlign &&
                verticalAlignClasses[theme.layout.verticalAlign],
              {
                ["lg:order-3"]: theme?.layout?.mediaPosition !== "left",
                ["lg:order-1"]: theme?.layout?.mediaPosition === "left",
              },
            )}
          >
            <Scripts
              key={script.title}
              title={script.title}
              items={script.items}
            />
            <Decorations decorations={decorations} location="image" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block1);
