import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { TitleThemeType } from "../../components/title/title.options";
import IframeResizer from "iframe-resizer-react";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

export type Block0Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
  };
  _key?: string;
  html?: string;
};

export const Block0 = ({ theme, _key, html }: Block0Props) => {
  if (!html) return null;
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <IframeResizer
        checkOrigin={false}
        className="w-full"
        id={_key}
        srcDoc={`<html><head></head><body>${html}</body><script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.contentWindow.js'></script></html>`}
      />
    </Wrapper>
  );
};

export default React.memo(Block0);
