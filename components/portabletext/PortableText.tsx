import { VideoType } from "../../types";
import { ButtonGroupProps } from "../buttons/ButtonGroup";
import { LinkProps } from "../buttons/Link";
import { HighlightProps } from "../highlight/Highlight";
import FigCaption from "../images/FigCaption";
import { IconLoaderProps } from "../images/IconLoader";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { ScriptsType } from "../script/Script";
import { Table } from "../table/Table";
import { TestimonialType } from "../testimonials/Testimonials";
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

const Highlight = lazy<ComponentType<HighlightProps>>(
  () => import(/* webpackChunkName: "Highlight" */ "../highlight/Highlight"),
);

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
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
      value={content as PortableTextBlock[]}
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
          color: ({ value, children }) => {
            return <Highlight theme={value?.color}>{children}</Highlight>;
          },
        },

        /**
         * Example of how to override the default block rendering
         * For instance if you want to use portable text inside an <h1> tag
         * you don't want to paragraphs inside it, so you can do the following:
         *
         * <PortableText content={title as PortableTextBlock[]} block={{
         *    normal: ({ children }: PortableTextComponentProps<any>) => (
         *      <span>{children}</span>
         *    ),
         *  }}/>
         */

        block: { ...block },
        list: {
          bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
          number: ({ children }) => (
            <ol className="list-decimal">{children}</ol>
          ),
          check: ({ children }) => (
            <ul className="list-check list-none relative">{children}</ul>
          ),
        },
        listItem: {
          bullet: ({ children }) => <li>{children}</li>,
          number: ({ children }) => <li>{children}</li>,
          check: ({ children }) => (
            <li className="!pl-0 !relative">
              <IconLoader
                icon="check"
                className="absolute left-0 -translate-x-[calc(100%+.75em)] translate-y-1/3 w-[1em] h-[1em] text-current !mt-0"
              />
              <span>{children}</span>
            </li>
          ),
        },
        types: {
          "image.simple"({ value }) {
            return (
              <figure className="inline-block">
                <ResponsiveImage {...value.image} preserveAspectRatio zoom />

                <FigCaption
                  caption={value.caption}
                  className="mt-2 text-left"
                />
              </figure>
            );
          },
          video({ value }) {
            return (
              <div className="not-prose not-format">
                <figure>
                  <Video {...value.video} />
                  <FigCaption caption={value.caption} className="mt-2" />
                </figure>
              </div>
            );
          },
          buttons({ value }) {
            return (
              <div className="not-prose not-format my-8">
                <ButtonGroup {...value} />
              </div>
            );
          },
          csv({ value }) {
            return <Table {...value} />;
          },
          scriptRef({ value }) {
            return <Scripts {...value} />;
          },
          testimonials({ value }) {
            if (!value?.items?.filter(Boolean).length) return null;

            return value.items.map(
              ({ _key, name, content }: TestimonialType) => (
                <div
                  className="testimonial not-prose not-format"
                  key={_key}
                  data-animate="fade-up"
                >
                  <blockquote className="py-2 px-6 leading-normal relative my-8">
                    <span className="absolute left-0 inset-y-0 w-0.5 bg-current opacity-20" />
                    {content && <PortableText content={content} />}
                    {name && (
                      <figcaption className="block mt-2">{name}</figcaption>
                    )}
                  </blockquote>
                </div>
              ),
            );
          },
        },
      }}
    />
  );
};

export default React.memo(PortableText);
