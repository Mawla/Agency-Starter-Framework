import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { DecorationProps } from "../../components/decorations/Decoration";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
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

export type Block15Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    body?: TextThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  body?: React.ReactNode;
};

export const Block15 = ({
  theme,
  decorations,
  title,
  intro,
  body,
}: Block15Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      {title && (
        <div
          className={cx(
            "flex flex-col max-w-4xl",
            textAlignClasses[theme?.block?.align || "center"],
          )}
        >
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        </div>
      )}

      {(intro || body) && (
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 mt-6 md:mt-10 lg:mt-16">
          {shouldRenderPortableText(intro) && (
            <div className="lg:col-span-6">
              <Text
                size={theme?.intro?.size || "xl"}
                color={theme?.intro?.color}
                font={theme?.intro?.font}
                weight={theme?.intro?.weight}
              >
                <PortableText content={intro as PortableTextBlock[]} />
              </Text>
            </div>
          )}
          {shouldRenderPortableText(body) && (
            <div className="lg:col-span-6">
              <Text
                size={theme?.body?.size || "xl"}
                color={theme?.body?.color}
                font={theme?.body?.font}
                weight={theme?.body?.weight}
              >
                <PortableText content={body as PortableTextBlock[]} />
              </Text>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Block15);
