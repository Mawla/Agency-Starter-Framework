import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroup } from "../../components/buttons/buttongroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { BleedProps } from "../../components/module/Bleed";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WidthProps } from "../../components/module/Width";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { ImageType } from "../../types";
import React, { ComponentType, lazy } from "react";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const Width = lazy<ComponentType<WidthProps>>(
  () => import(/* webpackChunkName: "Width" */ "../../components/module/Width"),
);

const Bleed = lazy<ComponentType<BleedProps>>(
  () => import(/* webpackChunkName: "Bleed" */ "../../components/module/Bleed"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

export type HeroBasicProps = {
  eyebrow?: string;
  title?: string;
  buttons?: ButtonProps[];
  text?: React.ReactElement;
  image?: ImageType;
};

export const HeroBasic = (data: HeroBasicProps) => {
  if (!data) return null;

  const { eyebrow, title, buttons, text, image }: HeroBasicProps = data;

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
                  maxWidth={1370}
                />
              </div>
            )}
          </Width>
        </Bleed>
      </div>
    </header>
  );
};

export default React.memo(HeroBasic);
