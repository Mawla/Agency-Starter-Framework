import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { TitleProps } from "../../components/title/Title";
import {
  TitleFontType,
  TitleWeightType,
} from "../../components/title/title.options";
import { VideoProps } from "../../components/video/Video";
import { HeadingLevelType, VideoType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
  IntroSizeType,
  AlignType,
} from "./block9.options";
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

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

const Video = lazy<ComponentType<VideoProps>>(
  () => import(/* webpackChunkName: "Video" */ "../../components/video/Video"),
);

export type Block9Props = {
  theme?: {
    block?: {
      background?: BackgroundColorType;
      space?: SpaceType;
      align?: AlignType;
    };

    title?: {
      color?: TitleColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
      font?: TitleFontType;
      weight?: TitleWeightType;
    };

    intro?: {
      color?: IntroColorType;
      size?: IntroSizeType;
    };
  };

  title?: string;
  intro?: React.ReactNode;
  video?: VideoType;
  buttons?: ButtonProps[];
};

const alignClasses: Record<AlignType, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export const Block9 = ({
  theme,
  title,
  intro,
  video,
  buttons,
}: Block9Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "max-w-3xl",
          alignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <div className="mb-6">
            <Title
              size={theme?.title?.size || "4xl"}
              as={theme?.title?.level}
              color={theme?.title?.color}
              font={theme?.title?.font}
              weight={theme?.title?.weight}
            >
              {title}
            </Title>
          </div>
        )}

        {intro && (
          <div className="mb-6">
            <Text
              size={theme?.intro?.size || "xl"}
              color={theme?.intro?.color}
              align={theme?.block?.align || "center"}
            >
              <PortableText content={intro as any} />
            </Text>
          </div>
        )}

        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-8 lg:mt-12">
            <ButtonGroup items={buttons} />
          </div>
        )}

        {video && (
          <div className="mt-8 lg:mt-12 overflow-hidden rounded-xs">
            <Video {...video} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block9);
