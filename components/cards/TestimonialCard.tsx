import { DecorationsProps } from "../../components/decorations/Decorations";
import { TitleProps } from "../../components/title/Title";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  justifyClasses,
  paddingXClasses,
  paddingYClasses,
  textClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  HorizontalAlignType,
  PaddingType,
} from "../../types";
import { DecorationProps } from "../decorations/Decoration";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TestimonialType } from "../testimonials/Testimonials";
import { textAlignClasses } from "../text/text.options";
import { TitleThemeType } from "../title/title.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";
import { PortableTextBlock } from "sanity";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../portabletext/PortableText"
    ),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../images/ResponsiveImage"
    ),
);

const Decorations = lazy<ComponentType<DecorationsProps>>(
  () =>
    import(
      /* webpackChunkName: "Decorations" */ "../../components/decorations/Decorations"
    ),
);

export type TestimonialCardProps = {
  type: "card.testimonial";
  decorations?: DecorationProps[];
  theme?: {
    card?: {
      color?: ColorType;
      align?: HorizontalAlignType;
      background?: ColorType;
      paddingX?: PaddingType;
      paddingY?: PaddingType;
    };
    title?: TitleThemeType;
    name?: TitleThemeType;
    content?: TitleThemeType;
    jobTitle?: TitleThemeType;
    border?: {
      color?: ColorType;
      radius?: BorderRadiusType;
      width?: BorderWidthType;
    };
  };
} & TestimonialType;

export const TestimonialCard = ({
  title,
  image,
  name,
  jobTitle,
  content,
  theme,
  decorations,
}: TestimonialCardProps) => {
  return (
    <figure
      className={cx(
        "h-full relative overflow-hidden group",
        theme?.card?.color && textClasses[theme?.card?.color],
        theme?.card?.align && textAlignClasses[theme?.card?.align],
        theme?.border?.color && borderClasses[theme?.border?.color],
        theme?.border?.width && borderWidthClasses[theme?.border?.width],
        theme?.border?.radius && borderRadiusClasses[theme?.border?.radius],
        theme?.card?.background && backgroundClasses[theme?.card?.background],
        theme?.card?.paddingY && paddingYClasses[theme?.card?.paddingY],
        theme?.card?.paddingX && paddingXClasses[theme?.card?.paddingX],
      )}
    >
      <Decorations decorations={decorations} />
      <div className="flex flex-col gap-6 h-full relative z-10">
        {title && (
          <Title {...theme?.title} as="span">
            {title}
          </Title>
        )}

        {content && (
          <blockquote>
            {content && (
              <Title as="div" {...theme?.content}>
                <PortableText content={content as PortableTextBlock[]} />
              </Title>
            )}
          </blockquote>
        )}

        <figcaption
          className={cx(
            "inline-flex items-center space-x-3 text-left",
            theme?.card?.align && justifyClasses[theme?.card?.align],
          )}
        >
          {image && (
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <ResponsiveImage {...image} />
            </div>
          )}

          {(name || jobTitle) && (
            <div className="space-y-0.5 font-medium">
              {name && (
                <Title {...theme?.name} as="span">
                  {name}
                </Title>
              )}
              {jobTitle && (
                <Title {...theme?.jobTitle} as="span">
                  {jobTitle}
                </Title>
              )}
            </div>
          )}
        </figcaption>
      </div>
    </figure>
  );
};

export default React.memo(TestimonialCard);
