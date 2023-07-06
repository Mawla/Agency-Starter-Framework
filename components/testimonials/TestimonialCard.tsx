import { TitleProps } from "../../components/block/Title";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { PortableTextProps } from "../portabletext/PortableText";
import { TestimonialsProps } from "./Testimonials";
import React, { ComponentType, lazy } from "react";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/block/Title"),
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

export type TestimonialCardProps = TestimonialsProps["items"][0];

export const TestimonialCard = ({
  title,
  image,
  name,
  jobTitle,
  content,
}: TestimonialCardProps) => {
  return (
    <figure className="p-6 bg-gray-50 rounded text-left">
      {(title || content) && (
        <blockquote className="text-sm text-gray-500">
          {title && (
            <div className="mb-6">
              <Title size={"xl"} as="span" className="text-current">
                {title}
              </Title>
            </div>
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
            {name && <span className="block">{name}</span>}
            {jobTitle && <span className="block text-sm">{jobTitle}</span>}
          </div>
        )}
      </figcaption>
    </figure>
  );
};

export default React.memo(TestimonialCard);
