import { AccordionItemType, AccordionProps } from "../accordion/Accordion";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import React, { ComponentType, lazy } from "react";
import * as ReactDOMServer from "react-dom/server";
import { PortableTextBlock } from "sanity";

export type FAQProps = {
  items: AccordionItemType[];
  theme?: AccordionProps["theme"];
};

const Accordion = lazy<ComponentType<AccordionProps>>(
  () => import(/* webpackChunkName: "Accordion" */ "../accordion/Accordion"),
);

export const FAQ = ({ items, theme }: FAQProps) => {
  return (
    <>
      <Accordion items={items} theme={theme} />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: items
                  .filter(
                    ({ title, content }) => Boolean(title) && Boolean(content),
                  )
                  .map(({ title, content }) => {
                    return {
                      "@type": "Question",
                      name: title,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: content
                          ? ReactDOMServer.renderToStaticMarkup(
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

export default React.memo(FAQ);
