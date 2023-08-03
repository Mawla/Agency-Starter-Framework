import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import {
  textAlignClasses,
  TextThemeType,
} from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { ImageType } from "../../types";
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

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

export type Block4Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  buttons?: ButtonProps[];
};

export const Block4 = ({
  theme,
  decorations,
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
      decorations={decorations}
    >
      <div
        className={`flex flex-col gap-6 max-w-screen-lg relative z-10 ${
          textAlignClasses[theme?.block?.align || "center"]
        }`}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
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
          <div
            className="mt-6"
            style={{
              aspectRatio:
                getOriginalImageDimensions(image?.src).aspectRatio || "auto",
            }}
          >
            <ResponsiveImage
              {...image}
              preserveAspectRatio
              className="inline-block"
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block4);
