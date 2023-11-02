import {
  formatColors,
  formatFontFamily,
  formatFontSize,
  formatFontWeight,
} from "../../cli/config/format-theme";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { DecorationProps } from "../../components/decorations/Decoration";
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
      removeWrapper?: boolean;
    };
  };
  decorations?: DecorationProps[];
  _key?: string;
  headHTML?: string;
  bodyHTML?: string;
  baseURL?: string;
  tailwindConfig?: string;
};

export const Block0 = ({
  theme,
  decorations,
  _key,
  headHTML = "",
  bodyHTML = "",
  baseURL,
  tailwindConfig = "",
}: Block0Props) => {
  const [websiteHTML, setWebsiteHTML] = useState<string>("");
  const [srcDoc, setSrcDoc] = useState<string>("");

  // remove <head>
  headHTML = (headHTML || "")?.replace("<head>", "").replace("</head>", "");

  // remove <body>
  bodyHTML = (bodyHTML || "")
    ?.replace("<body", "<div")
    .replace("</body", "</div");

  // replace src="foo" with src="baseURL/foo"
  bodyHTML = bodyHTML
    ?.replace(/(src=")(?!http)(.*?)/g, `$1${baseURL || ""}$2`)
    ?.replace(/(url\(')(?!http)(.*?)/g, `$1${baseURL || ""}$2`);

  // remove script tags from tailwind config field
  tailwindConfig = tailwindConfig
    ?.replace("<script>", "")
    .replace("</script>", "");

  // add tailwind compiler js
  const tailwindCompilerHTML = theme?.code?.removeTailwindCompiler
    ? ""
    : `<script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>`;

  /**
   * Load theme from Sanity
   */

  useEffect(() => {
    async function getTheme() {
      if (theme?.code?.removeWebsiteStyles) return setWebsiteHTML("");

      const websiteTheme = await getClient()?.fetch(`
      *[_id == "config_theme"][0] {
        colors[] { name, value },
        fontFamily[] { name, value },
        fontSize[] { name, size, lineHeight, letterSpacing, fontWeight },
        fontWeight[] { name, value },
      }`);

      const websiteTailwindConfig = `
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
      <script>${websiteTailwindConfig}</script>
      `.replace(/\n/g, ""),
      );
    }

    getTheme();
  }, [theme?.code]);

  useEffect(() => {
    setSrcDoc(
      `<html><head>${headHTML}</head><body>${tailwindCompilerHTML}<script>${tailwindConfig}</script>${websiteHTML}${bodyHTML}<script src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.contentWindow.js'></script></body></html>`,
    );
  }, [websiteHTML]);

  if (!headHTML && !bodyHTML) return null;

  const iframeProps = {
    checkOrigin: false,
    className: "w-full",
    id: _key,
    srcDoc,
  };

  if (theme?.code?.removeWrapper) return <IframeResizer {...iframeProps} />;

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <IframeResizer {...iframeProps} />
    </Wrapper>
  );
};

export default React.memo(Block0);
