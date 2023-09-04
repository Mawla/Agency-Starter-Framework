import { TitleProps } from "../../components/title/Title";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TitleThemeType } from "../title/title.options";
import { TestimonialType } from "./Testimonials";
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

export type TestimonialPosterProps = {
  theme?: {
    title?: TitleThemeType;
    content?: TitleThemeType;
    name?: TitleThemeType;
    jobTitle?: TitleThemeType;
  };
} & TestimonialType;

export const TestimonialPoster = ({
  title,
  image,
  name,
  jobTitle,
  content,
  theme,
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
            <Title as="span" {...theme?.title}>
              {title}
            </Title>
          )}
          {content && (
            <div className="mt-6">
              <Title as="div" {...theme?.content}>
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
              "inline-flex flex-col gap-[.25em] items-center max-w-xl",
              {
                ["lg:flex-row"]: !isLong,
              },
            )}
          >
            {image && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 shrink-0">
                <ResponsiveImage {...image} />
              </div>
            )}
            {name && (
              <Title as="span" {...theme?.name} className="shrink-0">
                {`${name}${jobTitle ? "," : ""}`}
              </Title>
            )}
            {jobTitle && (
              <Title as="span" {...theme?.jobTitle}>
                {jobTitle}
              </Title>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default React.memo(TestimonialPoster);
