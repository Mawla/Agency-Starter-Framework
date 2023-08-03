import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { GradientProps } from "../../components/gradient/Gradient";
import { GradientOpacityType } from "../../components/gradient/GradientOptions";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import {
  textAlignClasses,
  TextThemeType,
} from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { ImageType } from "../../types";
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

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const Gradient = lazy<ComponentType<GradientProps>>(
  () =>
    import(
      /* webpackChunkName: "Gradient" */ "../../components/gradient/Gradient"
    ),
);

export type Block3Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    overlay?: {
      gradientFromOpacity?: GradientOpacityType;
      gradientToOpacity?: GradientOpacityType;
    };
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  buttons?: ButtonProps[];
};

export const Block3 = ({
  theme,
  decorations,
  title,
  intro,
  image,
  buttons,
}: Block3Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <ResponsiveImage {...image} fill className="absolute inset-0" />

          <Gradient
            from={theme?.overlay?.gradientFromOpacity || 0.2}
            to={theme?.overlay?.gradientToOpacity || 0.4}
            className="z-10"
          />
        </div>
      )}

      <div
        className={cx(
          "max-w-screen-sm relative z-10",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <div className="mb-4">
            <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
              {title}
            </Title>
          </div>
        )}

        {intro && (
          <div className="mb-6">
            <Text
              color={theme?.intro?.color}
              size={theme?.intro?.size || "xl"}
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
      </div>
    </Wrapper>
  );
};

export default React.memo(Block3);
