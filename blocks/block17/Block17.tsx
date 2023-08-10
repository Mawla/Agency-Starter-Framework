import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { textAlignClasses } from "../../components/text/text.options";
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

export type Block17Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
};

export const Block17 = ({ theme, decorations, title }: Block17Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "flex flex-col gap-6 max-w-3xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block17);
