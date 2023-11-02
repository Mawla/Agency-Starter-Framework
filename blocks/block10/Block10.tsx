import { AccordionProps } from "../../components/accordion/Accordion";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { FAQProps } from "../../components/faq/FAQ";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import {
  TextThemeType,
  textAlignClasses,
} from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import cx from "clsx";
import React, { ComponentType, lazy } from "react";
import { PortableTextBlock } from "sanity";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

const FAQ = lazy<ComponentType<FAQProps>>(
  () => import(/* webpackChunkName: "FAQ" */ "../../components/faq/FAQ"),
);

export type Block10Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    faq?: AccordionProps["theme"];
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  buttons?: ButtonProps[];
  faq?: FAQProps["items"];
};

export const Block10 = ({
  theme,
  decorations,
  title,
  intro,
  faq,
  buttons,
}: Block10Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "max-w-4xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <div className="mb-6">
            <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
              {title}
            </Title>
          </div>
        )}

        {shouldRenderPortableText(intro) && (
          <div className="mb-6">
            <Text
              size={theme?.intro?.size || "xl"}
              color={theme?.intro?.color}
              weight={theme?.intro?.weight}
              align={theme?.block?.align || "center"}
            >
              <PortableText content={intro as PortableTextBlock[]} />
            </Text>
          </div>
        )}

        {faq && Boolean(faq?.filter(Boolean).length) && (
          <div className="mt-12 lg:mt-16">
            <FAQ items={faq} theme={theme?.faq} />
          </div>
        )}

        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-12 lg:mt-16">
            <ButtonGroup items={buttons} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block10);
