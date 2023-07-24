import {
  formatColors,
  formatFontFamily,
  formatFontSize,
  formatFontWeight,
} from "../../cli/config/format-theme";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { TitleThemeType } from "../../components/title/title.options";
import { getClient } from "../../helpers/sanity/server";
import IframeResizer from "iframe-resizer-react";
import React, { ComponentType, lazy, useEffect, useState } from "react";

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

export const Block0 = ({ theme, _key, html = "" }: Block0Props) => {
  const [tailwindConfig, setTailwindConfig] = useState<string>("");

  /**
   * Load theme from Sanity
   */

  useEffect(() => {
    async function getTheme() {
      const theme = await getClient(false)?.fetch(`
      *[_id == "config_theme"][0] {
        colors[] { name, value },
        fontFamily[] { name, value },
        fontSize[] { name, size, lineHeight, letterSpacing, fontWeight },
        fontWeight[] { name, value },
      }`);

      const tailwindConfigString = `
      tailwind.config = {
        theme: {
          extend: {
            colors: ${JSON.stringify(formatColors(theme?.colors))},
            fontFamily: ${JSON.stringify(formatFontFamily(theme?.fontFamily))},
            fontSize: ${JSON.stringify(formatFontSize(theme?.fontSize))},
            fontWeight: ${JSON.stringify(formatFontWeight(theme?.fontWeight))},
          }
        }
      }`.replace(/\n|\s/g, "");

      setTailwindConfig(tailwindConfigString);
    }

    getTheme();
  }, []);

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
        srcDoc={`<html><head></head><body><link rel="stylesheet" href="/engine.styles.css" /><script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script><script>${tailwindConfig}</script>${html}</script><script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.contentWindow.js'></script></body></html>`}
      />
    </Wrapper>
  );
};

export default React.memo(Block0);
