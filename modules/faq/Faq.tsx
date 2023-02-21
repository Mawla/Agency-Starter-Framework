import { Accordion } from "../../components/accordion/Accordion";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WrapperProps } from "../../components/module/Wrapper";
import { BackgroundColorType } from "../../components/module/background.options";
import { SpaceType } from "../../components/module/spacing.options";
import PortableText, {
  PortableTextProps,
} from "../../components/portabletext/PortableText";
import { ColorType, HeadingLevelType } from "../../types";
import { TitleSizeType } from "./faq.options";
import { toHTML } from "@portabletext/to-html";
import Head from "next/head";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

export type FaqProps = {
  theme?: {
    module?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    };
    title?: {
      color?: ColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
    };
    text?: {
      color?: ColorType;
    };
  };
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  items?: {
    _key?: string;
    title?: string;
    content?: PortableTextProps["content"];
  }[];
};

function fixLinkDefs(obj: any) {
  for (let prop in obj) {
    if (prop === "href") obj[prop] = obj[prop].href || obj[prop].internal;
    else if (typeof obj[prop] === "object") fixLinkDefs(obj[prop]);
  }
  return obj;
}

export const Faq = ({ theme, eyebrow, title, intro, items }: FaqProps) => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      ?.filter(({ title, content }) => Boolean(title) && Boolean(content))
      .map(({ title, content }) => {
        return {
          "@type": "Question",
          name: title,
          acceptedAnswer: {
            "@type": "Answer",
            text: toHTML(fixLinkDefs(JSON.parse(JSON.stringify(content)))),
          },
        };
      }),
  };

  return (
    <Wrapper
      theme={{
        ...theme?.module,
      }}
    >
      {title && (
        <div className="mb-4 md:mb-6">
          <Title
            size={theme?.title?.size || "lg"}
            as={theme?.title?.level}
            color={theme?.title?.color}
            eyebrow={eyebrow}
          >
            {title}
          </Title>
        </div>
      )}

      {intro && (
        <div className="mb-10 md:mb-14">
          <Text color={theme?.text?.color}>
            <PortableText content={intro as any} />
          </Text>
        </div>
      )}

      {items && Boolean(items?.length) && (
        <div className="w-full text-left">
          <Accordion items={items} />
        </div>
      )}

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd, null, 2),
          }}
        />
      </Head>
    </Wrapper>
  );
};

export default React.memo(Faq);
