import { ImageType } from "../../types";
import { PortableTextProps } from "../portabletext/PortableText";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PortableTextBlock } from "sanity";

export type TestimonialType = {
  title?: string;
  image?: ImageType;
  name?: string;
  jobTitle?: string;
  content?: PortableTextProps["content"];
};

export type TestimonialsProps = {
  items?: TestimonialType[];
  RenderElement?: React.ComponentType<any>;
};

export const Testimonials = ({ items, RenderElement }: TestimonialsProps) => {
  if (!RenderElement) return null;

  return (
    <>
      {items?.filter(Boolean).map((item) => (
        <RenderElement {...item} />
      ))}

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "itemsPage",
                mainEntity: items
                  ?.filter(
                    ({ title, content }) => Boolean(title) && Boolean(content),
                  )
                  .map(({ title, content }) => {
                    return {
                      "@type": "Question",
                      name: title,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: content
                          ? renderToStaticMarkup(
                              <PortableText
                                value={content as PortableTextBlock[]}
                              />,
                            )
                          : "",
                      },
                    };
                  }),
              },
              null,
              2,
            ),
          }}
        />
      </Head>
    </>
  );
};

export default React.memo(Testimonials);
