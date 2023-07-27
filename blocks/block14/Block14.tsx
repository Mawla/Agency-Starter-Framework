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

export type Block14Props = {
  theme?: {
    block?: Omit<BlockThemeType, "align">;
    title?: TitleThemeType;
    body?: TextThemeType;
  };
  title?: string;
  body?: React.ReactNode;
};

export const Block14 = ({ theme, title, body }: Block14Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div className="flex flex-col gap-6 max-w-3xl">
        {body && (
          <Text size={theme?.body?.size || "xl"} color={theme?.body?.color}>
            <PortableText content={body as any} />
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block14);
