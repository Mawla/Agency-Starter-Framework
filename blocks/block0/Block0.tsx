import {
  formatColors,
  formatFontFamily,
  formatFontSize,
  formatFontWeight,
} from "../../cli/config/format-theme";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
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
    code?: {
      removeWebsiteStyles?: boolean;
      removeTailwindCompiler?: boolean;
    };
  };
  _key?: string;
  html?: string;
  baseURL?: string;
};

export const Block0 = ({ theme, _key, html = "", baseURL }: Block0Props) => {
  const [websiteHTML, setWebsiteHTML] = useState<string>("");
  const baseTag = baseURL ? `<base href="${baseURL}" />` : "";

  html = html.replace("<body", "<div").replace("</body", "</div");

  const tailwindCompilerHTML = theme?.code?.removeTailwindCompiler
    ? ""
    : `<script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>`;

  /**
   * Load theme from Sanity
   */

  useEffect(() => {
    async function getTheme() {
      if (theme?.code?.removeWebsiteStyles) return setWebsiteHTML("");

      const websiteTheme = await getClient(false)?.fetch(`
      *[_id == "config_theme"][0] {
        colors[] { name, value },
        fontFamily[] { name, value },
        fontSize[] { name, size, lineHeight, letterSpacing, fontWeight },
        fontWeight[] { name, value },
      }`);

      const tailwindConfig = `
      if (typeof tailwind !== 'undefined') {
        tailwind.config = {
          theme: {
            extend: {
              colors: ${JSON.stringify(formatColors(websiteTheme?.colors))},
              fontFamily: ${JSON.stringify(
                formatFontFamily(websiteTheme?.fontFamily),
              )},
              fontSize: ${JSON.stringify(
                formatFontSize(websiteTheme?.fontSize),
              )},
              fontWeight: ${JSON.stringify(
                formatFontWeight(websiteTheme?.fontWeight),
              )},
            }
          }
        }
      }`;

      setWebsiteHTML(
        `
      <link rel="stylesheet" href="/engine.styles.css" />
      <script>${tailwindConfig}</script>
      `.replace(/\n/g, ""),
      );
    }

    getTheme();
  }, [theme?.code]);

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
        srcDoc={`<html><head>${baseTag}</head><body><script src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.contentWindow.js'></script>${tailwindCompilerHTML}${websiteHTML}${html}</script></body></html>`}
      />
    </Wrapper>
  );
};

export default React.memo(Block0);
