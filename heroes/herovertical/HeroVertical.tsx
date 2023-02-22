import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { BleedProps } from "../../components/module/Bleed";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WidthProps } from "../../components/module/Width";
import { WrapperProps } from "../../components/module/Wrapper";
import { BackgroundColorType } from "../../components/module/background.options";
import { SpaceType } from "../../components/module/spacing.options";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { ColorType, HeadingLevelType } from "../../types";
import { ImageType } from "../../types";
import { TitleSizeType } from "./herovertical.options";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
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
      /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
    ),
);

const Bleed = lazy<ComponentType<BleedProps>>(
  () =>
    import(
      /* webpackChunkName: "BleedProps" */ "../../components/module/Bleed"
    ),
);

const Width = lazy<ComponentType<WidthProps>>(
  () =>
    import(
      /* webpackChunkName: "WidthProps" */ "../../components/module/Width"
    ),
);

export type HeroVerticalProps = {
  theme?: {
    module?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    };
    title?: {
      color?: ColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
    };
    text?: {
      color?: ColorType;
    };
  };
  eyebrow?: string;
  title?: string;
  text?: PortableTextProps["content"];
  image?: ImageType;
};

export const HeroVertical = ({
  theme,
  eyebrow,
  title,
  text,
  image,
}: HeroVerticalProps) => {
  return (
    <header className="relative z-0 overflow-hidden text-neutral-500">
      <div className="relative flex flex-row items-center z-30 pt-10 md:pt-15 lg:pt-20">
        <Bleed bleed="md">
          <Width width="inner">
            <div className="relative flex flex-col tablet:max-w-[75%] lg:max-w-[790px] gap-4 text-center mx-auto">
              {(title || eyebrow) && (
                <Title as="h1" size="6xl" color="neutral-800" eyebrow={eyebrow}>
                  {title}
                </Title>
              )}

              {text && (
                <Text
                  size="2xl"
                  className="mt-2"
                  color="neutral-900"
                  align="center"
                >
                  <PortableText content={text as any} />
                </Text>
              )}

              {buttons && (
                <ButtonGroup
                  className="mt-4 md:mt-6 lg:mt-8 mx-auto"
                  items={buttons}
                  align="center"
                />
              )}
            </div>

            {image && (
              <div className="relative block mx-auto overflow-hidden rounded-lg mt-10 aspect-video">
                <ResponsiveImage
                  {...image}
                  priority
                  loading="eager"
                  roundSize={50}
                  width={1374}
                  height={774}
                  fill
                />
              </div>
            )}
          </Width>
        </Bleed>
      </div>
    </header>
  );
};

export default React.memo(HeroVertical);
