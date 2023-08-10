import { TextProps } from "../../components/text/Text";
import { TitleProps } from "../../components/title/Title";
import { textClasses } from "../../theme";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TextThemeType } from "../text/text.options";
import { TitleThemeType } from "../title/title.options";
import { TestimonialType } from "./Testimonials";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text"),
);

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
    content?: TextThemeType;
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
            <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
              {title}
            </Title>
          )}
          {content && (
            <div className="mt-6">
              <Text
                size={theme?.content?.size || "xl"}
                color={theme?.content?.color}
                align="center"
              >
                <PortableText content={content as any} />
              </Text>
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
          <div>
            {name && (
              <span>
                {name}
                {jobTitle && <span>, </span>}
              </span>
            )}
            {jobTitle && <span>{jobTitle}</span>}
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default React.memo(TestimonialPoster);
