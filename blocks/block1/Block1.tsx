import { WrapperProps } from "../../components/block/Wrapper";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { DecorationsProps } from "../../components/decorations/Decorations";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { ImageThemeType } from "../../components/images/image.options";
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
    };
    image?: ImageThemeType;
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
      <div
        className={cx(
          "gap-8 grid lg:grid-cols-2 xl:gap-16",
          theme?.layout?.verticalAlign &&
            verticalAlignClasses[theme.layout.verticalAlign],
        )}
      >
        <div className="order-2 flex flex-col gap-8">
          {title && (
            <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
              {title}
            </Title>
          )}

          {intro && (
            <Text size={theme?.intro?.size || "lg"} color={theme?.intro?.color}>
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

        {(image || video) && (
          <div
            className={cx(
              "order-1 mb-4 w-full lg:mb-0 lg:flex relative md:h-full max-w-[650px] lg:max-w-full",
              {
                ["aspect-video"]: theme?.image?.preserveAspectRatio !== true,
                ["lg:order-3"]: theme?.layout?.mediaPosition !== "left",
                ["lg:order-1"]: theme?.layout?.mediaPosition === "left",
              },
            )}
          >
            {image && (
              <div className="relative h-full lg:h-auto w-full">
                <div
                  className={cx("relative", {
                    ["h-full"]: theme?.image?.preserveAspectRatio !== true,
                  })}
                >
                  <ResponsiveImage
                    {...image}
                    {...theme?.image}
                    fill={theme?.image?.preserveAspectRatio !== true}
                    className={
                      theme?.image?.preserveAspectRatio !== true
                        ? "absolute inset-0"
                        : ""
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
            className={cx("w-full flex relative order-3", {
              ["lg:order-3"]: theme?.layout?.mediaPosition !== "left",
              ["lg:order-1"]: theme?.layout?.mediaPosition === "left",
            })}
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
