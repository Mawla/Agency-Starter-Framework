import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

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
      <div
        className={cx(
          "flex flex-col max-w-3xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}
      </div>

      {(intro || body) && (
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24 mt-6">
          {intro && (
            <div className="lg:col-span-6">
              <Text
                size={theme?.intro?.size || "xl"}
                color={theme?.intro?.color}
              >
                <PortableText content={intro as any} />
              </Text>
            </div>
          )}
          {body && (
            <div className="lg:col-span-6">
              <Text size={theme?.body?.size || "xl"} color={theme?.body?.color}>
                <PortableText content={body as any} />
              </Text>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Block15);
