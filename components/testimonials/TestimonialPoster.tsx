import { TitleProps } from "../../components/title/Title";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TitleThemeType } from "../title/title.options";
import { TestimonialType } from "./Testimonials";
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
          <div className="inline-flex gap-[.25em] items-center">
            {image && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-1">
                <ResponsiveImage {...image} />
              </div>
            )}
            {name && (
              <Title as="span" {...theme?.name}>
                {`${name}${jobTitle ? "," : ""}`}
              </Title>
            )}
            {jobTitle && (
              <Title as="span" {...theme?.jobTitle} className="ml-1">
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
