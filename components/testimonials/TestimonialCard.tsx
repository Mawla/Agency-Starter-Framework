import { TitleProps } from "../../components/title/Title";
import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TitleColorType } from "../title/title.options";
import { TestimonialType } from "./Testimonials";
import cx from "classnames";
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

export type TestimonialCardProps = {
  theme?: {
    background?: ColorType;
    title?: TitleColorType;
    content?: ColorType;
    name?: ColorType;
    jobTitle?: ColorType;
  };
} & TestimonialType;

export const TestimonialCard = ({
  title,
  image,
  name,
  jobTitle,
  content,
  theme,
}: TestimonialCardProps) => {
  return (
    <figure
      className={cx(
        "p-6 rounded-sm text-left",
        theme?.background && backgroundClasses[theme?.background],
        theme?.content && textClasses[theme?.content],
        {
          ["bg-[rgba(0,0,0,.03)]"]: !theme?.background,
        },
      )}
    >
      {(title || content) && (
        <blockquote className="text-sm">
          {title && (
            <Title
              size={"xl"}
              as="span"
              className="text-current mb-6"
              color={theme?.title}
            >
              {title}
            </Title>
          )}
          {content && (
            <div className="mb-6 text-lg">
              <PortableText content={content as any} />
            </div>
          )}
        </blockquote>
      )}

      <figcaption className="flex items-center space-x-3">
        {image && (
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <ResponsiveImage {...image} />
          </div>
        )}

        {(name || jobTitle) && (
          <div className="space-y-0.5 font-medium">
            {name && (
              <span
                className={cx("block", theme?.name && textClasses[theme?.name])}
              >
                {name}
              </span>
            )}
            {jobTitle && (
              <span
                className={cx(
                  "block text-sm",
                  theme?.jobTitle && textClasses[theme?.jobTitle],
                )}
              >
                {jobTitle}
              </span>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default React.memo(TestimonialCard);
