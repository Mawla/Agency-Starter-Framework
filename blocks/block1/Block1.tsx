import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { TitleProps } from "../../components/title/Title";
import {
  TitleFontType,
  TitleWeightType,
} from "../../components/title/title.options";
import { HeadingLevelType } from "../../types";
import { ImageType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
  FeaturesColorType,
  ImagePositionType,
  IntroSizeType,
} from "./block1.options";
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

export type Block1Props = {
  theme?: {
    block?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    };

    image?: {
      position?: ImagePositionType;
    };

    title?: {
      color?: TitleColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
      font?: TitleFontType;
      weight?: TitleWeightType;
    };

    intro?: {
      size?: IntroSizeType;
      color?: IntroColorType;
    };

    features?: {
      size?: IntroSizeType;
      color?: FeaturesColorType;
    };
  };

  title?: string;
  intro?: React.ReactNode;
  features?: React.ReactNode;
  image?: ImageType;
};

export const Block1 = ({
  theme,
  title,
  intro,
  features,
  image,
}: Block1Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div className="gap-8 items-center grid lg:grid-cols-2 xl:gap-16">
        <div className="order-1 lg:pt-8">
          {title && (
            <div className="mb-4">
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
            <div className="mb-8">
              <Text
                size={theme?.intro?.size || "lg"}
                color={theme?.intro?.color}
              >
                <PortableText content={intro as any} />
              </Text>
            </div>
          )}

          {features && (
            <div className="pt-8 my-7 border-t border-gray-200">
              <Text
                size={theme?.intro?.size || "lg"}
                color={theme?.features?.color}
              >
                <PortableText content={features as any} />
              </Text>
            </div>
          )}
        </div>

        {image && (
          <div
            className={cx(
              "order-0 aspect-video mb-4 w-full lg:mb-0 lg:flex relative md:h-full",
              theme?.image?.position === "left" ? "lg:order-0" : "lg:order-2",
            )}
          >
            <ResponsiveImage
              {...image}
              fill
              className="absolute inset-0"
              roundSize={25}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block1);
