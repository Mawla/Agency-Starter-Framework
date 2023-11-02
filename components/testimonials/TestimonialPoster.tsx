import { TitleProps } from "../../components/title/Title";
import { alignItemsClasses } from "../../theme";
import { HorizontalAlignType } from "../../types";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TitleThemeType } from "../title/title.options";
import { TestimonialType } from "./Testimonials";
import cx from "clsx";
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

export type TestimonialPosterProps = {
  theme?: {
    title?: TitleThemeType;
    content?: TitleThemeType;
    name?: TitleThemeType;
    jobTitle?: TitleThemeType;
  };
  align?: HorizontalAlignType;
} & TestimonialType;

export const TestimonialPoster = ({
  title,
  image,
  name,
  jobTitle,
  content,
  theme,
  align,
}: TestimonialPosterProps) => {
  let numChars = 0;
  if (name) numChars += name.length;
  if (jobTitle) numChars += jobTitle.length;

  const isLong = numChars > 65;

  return (
    <figure className="flex flex-col">
      {(title || content) && (
        <blockquote>
          {title && (
            <Title
              as="span"
              {...theme?.title}
              size={theme?.name?.size || "xl"}
              weight={theme?.name?.weight || "normal"}
            >
              {title}
            </Title>
          )}
          {content && (
            <div className="mt-6">
              <Title
                as="div"
                {...theme?.content}
                size={theme?.name?.size || "4xl"}
                weight={theme?.name?.weight || "medium"}
              >
                <PortableText content={content as PortableTextBlock[]} />
              </Title>
            </div>
          )}
        </blockquote>
      )}

      <figcaption className="inline-block gap-3 mt-8">
        {(name || jobTitle || image) && (
          <div
            className={cx(
              "inline-flex flex-col gap-[.25em] max-w-xl",
              align && alignItemsClasses[align],
              {
                ["lg:flex-row lg:text-left lg:gap-3"]: !isLong,
              },
            )}
          >
            {image && (
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                <ResponsiveImage {...image} />
              </div>
            )}
            {(name || jobTitle) && (
              <div>
                {name && (
                  <Title
                    as="span"
                    {...theme?.name}
                    size={theme?.name?.size || "lg"}
                    weight={theme?.name?.weight || "medium"}
                    className="shrink-0"
                  >
                    {name}
                  </Title>
                )}
                {jobTitle && (
                  <Title
                    as="span"
                    {...theme?.name}
                    size={theme?.name?.size || "lg"}
                    weight={theme?.name?.weight || "normal"}
                    {...theme?.jobTitle}
                  >
                    {jobTitle}
                  </Title>
                )}
              </div>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default React.memo(TestimonialPoster);
