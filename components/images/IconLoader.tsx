import { getClient } from "../../helpers/sanity/server";
import { textClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "classnames";
import * as DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

export type IconLoaderProps = {
  icon?: string;
  className?: string;
  color?: ColorType;
  as?: React.ElementType;
  title?: string;
  description?: string;
  style?: React.CSSProperties;
  domain?: string;
  path?: string;
  removeColors?: boolean;
};

export const IconLoader = ({
  icon,
  className,
  color,
  as = "span",
  title,
  description,
  style,
  removeColors = true,
}: IconLoaderProps) => {
  const Element = as;
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    async function getIcon() {
      if (!icon) return;

      const svg = await getClient(false)?.fetch(
        `
        *[_id == 'config_icons'][0] {
          "icon": coalesce(predefined.${icon}, rest[slug.current == "${icon}"][0].icon)
        }.icon`.replace(/\s/g, ""),
      );

      if (!svg) return;
      if (!svg.startsWith("<svg") && !svg.startsWith("<?xml")) return;

      let cleanSVG = DOMPurify?.sanitize?.(svg); //
      cleanSVG = cleanUpAttributes(cleanSVG);
      if (removeColors) {
        cleanSVG = replaceColorsWithCurrentColor(cleanSVG);
      }

      if (cleanSVG) {
        setState("loaded");
        setData(cleanSVG);
        return;
      }

      setState("error");
    }

    getIcon();
  }, [icon]);

  if (!icon) return null;

  if (state === "loading" || state === "error")
    return (
      <Element
        role="img"
        aria-hidden="true"
        aria-label={[title, description].filter(Boolean).join(", ")}
        className={className}
        style={style}
      />
    );

  return (
    <Element
      role="img"
      aria-hidden="true"
      aria-label={[title, description].filter(Boolean).join(", ")}
      className={cx(className, color && textClasses[color])}
      dangerouslySetInnerHTML={{ __html: data }}
      style={style}
    />
  );
};

export default React.memo(IconLoader);

/**
 * Remove width / height / style
 */

const cleanUpAttributes = (str: string) => {
  let parser = new DOMParser();
  let parsedResult = parser.parseFromString(str, "image/svg+xml");

  // remove width and height so we can style with css
  parsedResult.documentElement.removeAttribute("width");
  parsedResult.documentElement.removeAttribute("height");

  // remove style attributes as they might overwrite styles on the site
  parsedResult.documentElement
    .querySelectorAll("style")
    .forEach((style: any) => style.parentNode.removeChild(style));

  return parsedResult.documentElement.outerHTML;
};

/**
 * Replace colours with currentColor so we can style them
 */

const replaceColorsWithCurrentColor = (str: string) => {
  return str.replace(
    /((stroke|fill|color)=")(#?\w+)/g,
    (match, start, attr, color) => {
      if (color === "none") {
        return `${start}none`;
      }
      return `${start}currentColor`;
    },
  );
};
