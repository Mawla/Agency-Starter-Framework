import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { removeEmptyValues } from "../../helpers/utils/object";
import { BREAKPOINTS, useBreakpoint } from "../../hooks/useBreakpoint";
import { ImageType } from "../../types";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import {
  backgroundRoundedBottomClasses,
  backgroundRoundedTopClasses,
  BlockRoundedType,
} from "./background.options";
import { DecorationLocationType } from "./decoration.options";
import cx from "classnames";
import DOMPurify from "dompurify";
import { createCSSTransformBuilder } from "easy-css-transform-builder";
import { ComponentType, CSSProperties, lazy } from "react";

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../images/ResponsiveImage"
    ),
);

export type DecorationType = {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  rotate?: number | string;
  scale?: number | string;
  background?: string;
  opacity?: number;
  hidden?: boolean;
  image?: ImageType;
  html?: string;
};

export type DecorationProps = {
  _key?: string;
  breakout?: boolean;
  theme?: {
    rounded?: BlockRoundedType;
  };
  location?: DecorationLocationType;
  rounded?: boolean;
  mobile?: DecorationType;
  tablet?: DecorationType;
  desktop?: DecorationType;
};

const addUnit = (value: string, unit = "px") => {
  if (!value) return undefined;
  if (!isNaN(+value)) return `${value}${unit}`;
  return value;
};

const pickOnlyCSSProperties = (obj: Record<string, unknown>): CSSProperties => {
  if (!obj) return {};
  const newObj = {
    top: addUnit(obj.top as string),
    right: addUnit(obj.right as string),
    bottom: addUnit(obj.bottom as string),
    left: addUnit(obj.left as string),
    width: addUnit(obj.width as string),
    height: addUnit(obj.height as string),
    background: obj.background,
    opacity: obj.opacity,
  } as CSSProperties;

  // css transforms
  if (obj.translateX || obj.translateY || obj.rotate || obj.scale) {
    const transformStyleBuilder = createCSSTransformBuilder({
      angle: "deg",
      length: "px",
    });

    const transformObj: Record<string, string> = {};
    if (obj.translateX)
      transformObj.translateX = addUnit(obj.translateX as string) || "";
    if (obj.translateY)
      transformObj.translateY = addUnit(obj.translateY as string) || "";
    if (obj.rotate)
      transformObj.rotate = addUnit(obj.rotate as string, "deg") || "";
    if (obj.scale) transformObj.scale = (obj.scale as string) || "";

    newObj.transform = transformStyleBuilder(transformObj);
  }

  return newObj;
};

export const Decoration = ({
  _key,
  breakout,
  theme,
  mobile = {},
  tablet,
  desktop,
}: DecorationProps) => {
  const { screenWidth } = useBreakpoint();

  let styleObj: CSSProperties = {};
  let hidden = Boolean(mobile?.hidden);
  let image = mobile?.image;
  let html = mobile?.html;

  mobile = removeEmptyValues(mobile);
  if (tablet) tablet = removeEmptyValues(tablet);
  if (desktop) desktop = removeEmptyValues(desktop);

  styleObj = pickOnlyCSSProperties(mobile);

  // tablet view
  if (screenWidth > BREAKPOINTS.sm && tablet) {
    styleObj = pickOnlyCSSProperties({
      ...styleObj,
      ...tablet,
    });
    hidden = Boolean(tablet.hidden);
    image = tablet.image || image;
    html = tablet.html;
  }

  // desktop view
  if (screenWidth > BREAKPOINTS.lg && desktop) {
    styleObj = pickOnlyCSSProperties({
      ...styleObj,
      ...desktop,
    });
    hidden = Boolean(desktop.hidden);
    image = desktop.image || image;
    html = desktop.html;
  }

  if (hidden) return null;
  if (html) html = DOMPurify?.sanitize?.(html);

  return (
    <i
      className={cx("absolute inset-0", {
        ["overflow-hidden"]: breakout !== true,
        [backgroundRoundedTopClasses.md]: theme?.rounded?.top === "md",
        [backgroundRoundedBottomClasses.md]: theme?.rounded?.bottom === "md",
        [backgroundRoundedTopClasses.lg]: theme?.rounded?.top === "lg",
        [backgroundRoundedBottomClasses.lg]: theme?.rounded?.bottom === "lg",
      })}
    >
      <i
        aria-hidden="true"
        className="absolute"
        data-key={_key}
        style={{
          ...styleObj,
          aspectRatio: image
            ? getOriginalImageDimensions(image?.src).aspectRatio || "auto"
            : undefined,
        }}
        dangerouslySetInnerHTML={
          html
            ? {
                __html: html,
              }
            : undefined
        }
      >
        {image && <ResponsiveImage {...image} fill preserveAspectRatio />}
      </i>
    </i>
  );
};

export default Decoration;
