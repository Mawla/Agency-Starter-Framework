import { VideoType } from "../../types";
import { ButtonGroupProps } from "../buttons/ButtonGroup";
import { LinkProps } from "../buttons/Link";
import FigCaption from "../images/FigCaption";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { ScriptsType } from "../script/Script";
import { Table } from "../table/Table";
import {
  PortableTextBlockComponent,
  PortableText as PortableTextReact,
} from "@portabletext/react";
import React, { ComponentType, lazy } from "react";
import { PortableTextBlock } from "sanity";

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImageProps" */ "../images/ResponsiveImage"
    ),
);

const Video = lazy<ComponentType<VideoType>>(
  () => import(/* webpackChunkName: "VideoComponent" */ "../video/Video"),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () => import(/* webpackChunkName: "ButtonGroup" */ "../buttons/ButtonGroup"),
);

const Link = lazy<ComponentType<LinkProps>>(
  () => import(/* webpackChunkName: "Link" */ "../buttons/Link"),
);

const Scripts = lazy<ComponentType<ScriptsType>>(
  () => import(/* webpackChunkName: "Script" */ "../script/Script"),
);

export type PortableTextProps = {
  content: string | PortableTextBlock[] | React.ReactElement;
  block?: Record<string, PortableTextBlockComponent>;
};

export const PortableText = ({ content = [], block }: PortableTextProps) => {
  if (React.isValidElement(content)) return content;
  if (typeof content === "string") return <p>{content}</p>;
  if (!content) return null;
  return (
    <PortableTextReact
      value={content}
      components={{
        marks: {
          link: ({ value, children }) => {
            return (
              <Link
                href={value.href}
                locale={value.language}
                target={value.target}
              >
                {children}
              </Link>
            );
          },
        },

        /**
         * Example of how to override the default block rendering
         * For instance if you want to use portable text inside an <h1> tag
         * you don't want to paragraphs inside it, so you can do the following:
         *
         * <PortableText content={title as any} block={{
         *    normal: ({ children }: PortableTextComponentProps<any>) => (
         *      <span>{children}</span>
         *    ),
         *  }}/>
         */

        block: { ...block },
        list: {
          bullet: ({ children }) => <ul>{children}</ul>,
          number: ({ children }) => <ol>{children}</ol>,
        },
        types: {
          "image.simple"({ value }) {
            const imageJsonLd = {
              "@context": "https://schema.org/",
              "@type": "ImageObject",
              contentUrl: value?.image?.src,
              description: value?.image?.alt || value?.caption,
            };

            return (
              <div className="not-prose my-8 md:my-12 lg:my-16 prose-media">
                <figure>
                  <ResponsiveImage {...value.image} />
                  <FigCaption
                    caption={value.caption}
                    className="mt-2 text-left"
                  />
                </figure>
              </div>
            );
          },
          video({ value }) {
            return (
              <div className="not-prose my-8 md:my-12 lg:my-16 prose-media">
                <figure>
                  <Video {...value.video} />
                  <FigCaption caption={value.caption} className="mt-2" />
                </figure>
              </div>
            );
          },
          buttons({ value }) {
            return (
              <div className="not-prose my-8">
                <ButtonGroup {...value} />
              </div>
            );
          },
          csv({ value }) {
            return <Table {...value} />;
          },
          script({ value }) {
            return <Scripts {...value} />;
          },
        },
      }}
    />
  );
};

export default React.memo(PortableText);
