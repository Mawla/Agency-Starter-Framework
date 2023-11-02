import { getClient } from "../../helpers/sanity/server";
import { textClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "clsx";
import * as DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

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
  removeDimensions?: boolean;
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
  removeDimensions = true,
}: IconLoaderProps) => {
  const Element = as;

  const [innerHTML, setInnerHTML] = useState<null | string>(null);

  const {
    data: svg,
    isLoading,
    isError,
  } = useQuery({
    queryKey: icon || "",
    enabled: !!icon,
    queryFn: () =>
      getClient().fetch(
        `*[_id == 'config_icons'][0] {
        "icon": coalesce(predefined.${icon}, rest[slug.current == "${icon}"][0].icon)
      }.icon`,
      ),
  });

  useEffect(() => {
    if (!svg) return;
    if (!svg.startsWith("<svg") && !svg.startsWith("<?xml")) return;

    let cleanSVG = DOMPurify?.sanitize?.(svg); //
    cleanSVG = cleanUpAttributes(cleanSVG, removeDimensions);
    if (removeColors) {
      cleanSVG = replaceColorsWithCurrentColor(cleanSVG);
    }
    setInnerHTML(cleanSVG);
  }, [svg]);

  if (isLoading || isError || !innerHTML)
    return (
      <Element
        role="img"
        aria-hidden="true"
        aria-label={[title, description, icon].filter(Boolean).join(", ")}
        className={className}
        style={style}
      />
    );

  return (
    <Element
      role="img"
      aria-hidden="true"
      aria-label={[title, description, icon].filter(Boolean).join(", ")}
      className={cx(className, color && textClasses[color])}
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      style={style}
    />
  );
};

export default React.memo(IconLoader);

/**
 * Remove width / height / style
 */

const cleanUpAttributes = (str: string, removeDimensions = true) => {
  let parser = new DOMParser();
  let parsedResult = parser.parseFromString(str, "image/svg+xml");

  // remove width and height so we can style with css
  if (removeDimensions) {
    parsedResult.documentElement.removeAttribute("width");
    parsedResult.documentElement.removeAttribute("height");
  }

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
