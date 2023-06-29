import { TextProps } from "../../components/block/Text";
import { TitleProps } from "../../components/block/Title";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { HeadingLevelType } from "../../types";
import { ImageType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
  IntroSizeType,
  AlignType,
} from "./block4.options";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/block/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/block/Text"),
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

const alignClasses: Record<AlignType, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export type Block4Props = {
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
    };

    intro?: {
      color?: IntroColorType;
      size?: IntroSizeType;
    };
  };

  title?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  buttons?: ButtonProps[];
};

export const Block4 = ({
  theme,
  title,
  intro,
  image,
  buttons,
}: Block4Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={`flex flex-col gap-6 max-w-screen-lg relative z-10 ${
          alignClasses[theme?.block?.align || "center"]
        }`}
      >
        {title && (
          <Title
            size={theme?.title?.size || "4xl"}
            as={theme?.title?.level}
            color={theme?.title?.color}
          >
            {title}
          </Title>
        )}

        {intro && (
          <Text
            size={theme?.intro?.size || "xl"}
            color={theme?.intro?.color}
            align={theme?.block?.align || "center"}
          >
            <PortableText content={intro as any} />
          </Text>
        )}

        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-6">
            <ButtonGroup items={buttons} />
          </div>
        )}

        {image && (
          <div className="mt-6">
            <ResponsiveImage {...image} className="inline-block" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block4);
