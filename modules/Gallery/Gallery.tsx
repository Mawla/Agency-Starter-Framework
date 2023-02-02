import { Slider } from "../../components/Slider/Slider";
import PortableText from "../../components/content/PortableText";
import { ResponsiveImage } from "../../components/images/ResponsiveImage";
import { SpaceType } from "../../components/module/SpacingOptions";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { Wrapper } from "../../components/module/Wrapper";
import { HeadingLevelType, ImageType } from "../../types";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

export type GalleryProps = {
  theme?: {
    module?: {
      space?: SpaceType;
    };
    title?: {
      level?: HeadingLevelType;
    };
  };
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  items?: { _key?: string; image?: ImageType }[];
};

export const Gallery = ({
  theme,
  eyebrow,
  title,
  intro,
  items,
}: GalleryProps) => {
  return (
    <Wrapper
      id={title}
      theme={{
        space: theme?.module?.space,
      }}
      className="relative overflow-hidden"
    >
      {(title || intro) && (
        <div className="relative z-20 max-w-title flex flex-col gap-8 md:text-center md:mx-auto mb-10 sm:mb-12 md:mb-16 xl:mb-20">
          {title && (
            <Title size="4xl" eyebrow={eyebrow} as={theme?.title?.level}>
              {title}
            </Title>
          )}

          {intro && (
            <Text
              color="neutral-900"
              align={null}
              className="md:text-center md:[&>*]:mx-auto"
            >
              <PortableText content={intro as any} />
            </Text>
          )}
        </div>
      )}

      {Boolean(items?.length) && (
        <div className="w-full relative z-20">
          <Slider
            gap={0}
            columns="auto"
            className="z-20"
            slideStyle={{
              width: "auto",
            }}
            slideClassName="pr-4 md:pr-6 lg:pr-8 xl:pr-10 last:pr-0"
            slides={items?.map(({ image, _key }, i) => (
              <div
                key={_key || image?.src}
                className={cx(
                  "h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] w-full overflow-hidden rounded-3xl",
                  {
                    ["aspect-square"]: i % 2 === 0,
                    ["aspect-[13/8]"]: i % 2 === 1,
                    ["-mr-20"]: i === items.length - 1, // this fixes swiper not firing onReachEnd on last slide leaving some white space to the right
                  },
                )}
              >
                {image && (
                  <div className="relative w-full h-full">
                    <ResponsiveImage {...image} fill />
                  </div>
                )}
              </div>
            ))}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Gallery);
