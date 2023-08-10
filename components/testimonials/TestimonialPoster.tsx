import { TitleProps } from "../../components/title/Title";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TitleThemeType } from "../title/title.options";
import { TestimonialType } from "./Testimonials";
import React, { ComponentType, lazy } from "react";

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
                <PortableText content={content as any} />
              </Title>
            </div>
          )}
        </blockquote>
      )}

      <figcaption className="flex items-center gap-3 justify-center mt-8">
        {image && (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <ResponsiveImage {...image} />
          </div>
        )}

        {(name || jobTitle) && (
          <div className="flex gap-[.25em]">
            {name && (
              <Title as="span" {...theme?.name}>
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
