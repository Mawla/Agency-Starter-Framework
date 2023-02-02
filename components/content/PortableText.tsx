import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { VideoType } from "../../types";
import { Table } from "../Table/Table";
import { ButtonGroup } from "../buttons/ButtonGroup";
import { Link } from "../buttons/Link";
import FigCaption from "../images/FigCaption";
import { SCRIPTS, ScriptType } from "./PortableTextOptions";
import { PortableText as PortableTextReact } from "@portabletext/react";
import Script from "next/script";
import React, { ComponentType, lazy } from "react";

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
    ),
);

const Video = lazy<ComponentType<VideoType>>(
  () =>
    import(
      /* webpackChunkName: "VideoComponent" */ "../../components/video/Video"
    ),
);

export type PortableTextProps = {
  content: any[];
};

export const PortableText = ({ content = [] }) => {
  if (React.isValidElement(content)) return content;
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
                  <FigCaption caption={value.caption} />
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
          scripts({ value }) {
            if (!value.scriptId || !SCRIPTS[value.scriptId as ScriptType])
              return null;
            return <Script {...SCRIPTS[value?.scriptId as ScriptType]} />;
          },
        },
      }}
    />
  );
};

export default React.memo(PortableText);
