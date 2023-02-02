import { textClasses } from "../../colors";
import { IconType, ICONS, ColorType } from "../../types";
import cx from "classnames";
import * as DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

type IconLoaderProps = {
  icon?: IconType;
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
  domain = "/",
  path = "icons/",
  removeColors = true,
}: IconLoaderProps) => {
  const Element = as;
  const [isMounted, setIsMounted] = useState(false);

  const {
    isLoading,
    error,
    data,
  }: {
    isLoading?: boolean;
    error?: Error | null;
    data?: string;
  } = useQuery(
    icon || "",
    () => {
      if (!icon) return null;
      return fetch(`${domain}${path}${ICONS[icon]}`).then(async (res) => {
        if (res.status !== 200) return "";

        const html = await res.text();
        if (!html.startsWith("<svg") && !html.startsWith("<?xml")) return "";

        let cleanHTML = DOMPurify?.sanitize?.(html); //
        cleanHTML = cleanUpAttributes(cleanHTML);
        if (removeColors) {
          cleanHTML = replaceColorsWithCurrentColor(cleanHTML);
        }
        return cleanHTML;
      });
    },
    { enabled: icon && Boolean(icon) && Boolean(ICONS[icon]) },
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!icon) return null;
  if (!ICONS[icon]) return null;

  if (error) {
    console.log(`Error loading icon ${icon}: ${error?.message}`);
    return null;
  }

  if (!isMounted) return null;

  if (isLoading || error)
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
