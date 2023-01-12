import { Gradient } from "../../components/Gradient/Gradient";
import { Slider } from "../../components/Slider/Slider";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroup } from "../../components/buttons/ButtonGroup";
import { ResponsiveImage } from "../../components/images/ResponsiveImage";
import { SpaceType } from "../../components/module/SpacingOptions";
import { Text } from "../../components/module/Text";
import { Title } from "../../components/module/Title";
import { Wrapper } from "../../components/module/Wrapper";
import { ImageType } from "../../types";
import cx from "classnames";
import React from "react";

export type SlidesProps = {
  theme?: {
    space?: SpaceType;
  };
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  items?: {
    _key?: string;
    image?: ImageType;
    label?: string;
    title?: string;
    text?: string;
  }[];
  buttons?: ButtonProps[];
};

export const Slides = ({
  theme,
  eyebrow,
  title,
  intro,
  items,
  buttons,
}: SlidesProps) => {
  return (
    <Wrapper theme={theme} className="relative overflow-hidden">
      {(title || intro) && (
        <div className="relative z-20 max-w-title flex flex-col gap-8 md:text-center md:mx-auto mb-10 sm:mb-12 md:mb-16 xl:mb-20">
          {title && (
            <Title size="4xl" eyebrow={eyebrow}>
              {title}
            </Title>
          )}

          {intro && (
            <Text
              color="neutral-25"
              align={null}
              className="md:text-center md:[&>*]:mx-auto"
            >
              {intro}
            </Text>
          )}

          {buttons && (
            <div>
              <ButtonGroup items={buttons} />
            </div>
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
            slides={items?.map(({ image, _key, label, title, text }) => (
              <div
                key={_key || image?.src}
                className={cx(
                  "relative",
                  "overflow-hidden rounded-3xl md:rounded-4xl lg:rounded-5xl",
                  "grid grid-cols-1 gap-16 justify-end",
                  "w-[90vw] 2xs:w-[68vw] sm:w-[50vw] md:[w-25vw] lg:w-[80vw] max-w-[1140px] h-full"
                )}
              >
                <div className="z-0 absolute inset-0">
                  {image && (
                    <div className="relative w-full h-full">
                      <ResponsiveImage {...image} fill />
                    </div>
                  )}
                </div>

                {label && (
                  <div className="relative z-20">
                    <Title
                      as="span"
                      color="white"
                      size="3xl"
                      className={cx(
                        "m-5 md:m-10 lg:m-20 px-4 mb-0 md:mb-0 lg:mb-0 lg:px-6 h-[64px] min-w-[64px] lg:h-[120px] lg:min-w-[120px] inline-grid place-content-center",
                        "rounded-xl md:rounded-2xl lg:rounded-3xl",
                        "bg-neutral-base"
                      )}
                    >
                      {label}
                    </Title>
                  </div>
                )}

                {(title || text) && (
                  <div className="relative z-10 self-end">
                    <Gradient from={0} to={1} className="z-10 -top-40" />
                    <div className="flex flex-col gap-2 md:gap-3 lg:gap-5 relative z-20 m-5 md:m-10 lg:m-20 pb-2 md:pb-0 text-white">
                      {title && (
                        <h3 className="text-title-md-sm md:text-title-md-lg lg:text-title-3xl-lg font-bold lg:max-w-[20ch]">
                          {title}
                        </h3>
                      )}
                      {text && (
                        <p className="text-text-xl md:text-title-md-md lg:text-title-md-lg m-0 lg:max-w-[40ch]">
                          {text}
                        </p>
                      )}
                    </div>
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

export default React.memo(Slides);
