import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WidthProps } from "../../components/module/Width";
import { WrapperProps } from "../../components/module/Wrapper";
import {
  BackgroundColorType,
  ModuleRadiusType,
} from "../../components/module/background.options";
import { SpaceType } from "../../components/module/spacing.options";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { HeadingLevelType, ImageType } from "../../types";
import { ImageAlignType, TitleSizeType } from "./textimage.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
    ),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

const Width = lazy<ComponentType<WidthProps>>(
  () => import(/* webpackChunkName: "Width" */ "../../components/module/Width"),
);

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

export type TextImageProps = {
  theme?: {
    module?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    };
    image?: {
      align?: ImageAlignType;
    };
    title?: {
      size?: TitleSizeType;
      level?: HeadingLevelType;
    };
    decorations?: {
      roundedTop?: ModuleRadiusType;
      roundedBottom?: ModuleRadiusType;
    };
  };
  title?: string;
  eyebrow?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  buttons?: ButtonProps[];
};

export const TextImage = ({
  theme,
  eyebrow,
  title,
  intro,
  image,
  buttons,
}: TextImageProps) => {
  return (
    <Wrapper
      theme={{
        ...theme?.module,
        rounded: {
          top: theme?.decorations?.roundedTop,
          bottom: theme?.decorations?.roundedBottom,
        },
      }}
    >
      <div
        className={cx({
          ["py-8 sm:py-10 lg:py-16 xl:py-20"]: theme?.module?.background,
        })}
      >
        <Width width="inner" className="relative">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center md:items-start lg:items-center gap-10 lg:gap-16 xl:gap-20 relative z-30">
            <div
              className={cx(
                "order-2 flex flex-col gap-6 md:col-span-7",
                "md:pt-20 lg:pt-0", // add padding top on tablet to replace flowing out from top with flex items center
                {
                  ["-mt-3"]: eyebrow,
                  ["-mt-2"]: !eyebrow,
                },
              )}
            >
              {(title || eyebrow) && (
                <Title
                  size={theme?.title?.size || "3xl"}
                  color="neutral-900"
                  eyebrow={eyebrow}
                  as={theme?.title?.level}
                >
                  {title}
                </Title>
              )}

              {intro && (
                <Text color="neutral-900" size="lg">
                  <PortableText content={intro as any} />
                </Text>
              )}

              {buttons && <ButtonGroup items={buttons} className="mt-2" />}
            </div>

            {image && (
              <div
                className={cx(
                  "md:col-span-5 relative h-full",
                  theme?.image?.align === "right"
                    ? "order-1 md:order-3"
                    : "order-1 md:order-1",
                )}
              >
                <div className="min-w-[160px] md:max-w-none aspect-[540/380] md:aspect-[380/540] relative">
                  <ResponsiveImage
                    {...image}
                    roundSize={25}
                    fill
                    className="rounded-lg md:rounded-3xl lg:rounded-4xl overflow-hidden z-20"
                  />
                </div>
              </div>
            )}
          </div>
        </Width>
      </div>
    </Wrapper>
  );
};

export default React.memo(TextImage);
