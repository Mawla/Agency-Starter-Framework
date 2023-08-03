import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { BREAKPOINTS, useBreakpoint } from "../../hooks/useBreakpoint";
import { ImageType } from "../../types";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import {
  backgroundRoundedBottomClasses,
  backgroundRoundedTopClasses,
  BlockRoundedType,
} from "./background.options";
import { DecorationPositionType } from "./decoration.options";
import cx from "classnames";
import DOMPurify from "dompurify";
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
  position?: DecorationPositionType;
  rounded?: boolean;
  mobile?: DecorationType;
  tablet?: DecorationType;
  desktop?: DecorationType;
};

const addUnit = (value: string) => {
  if (!value) return undefined;
  if (!isNaN(+value)) return `${value}px`;
  return value;
};

const pickOnlyCSSProperties = (obj: Record<string, unknown>): CSSProperties => {
  if (!obj) return {};
  return {
    top: addUnit(obj.top as string),
    right: addUnit(obj.right as string),
    bottom: addUnit(obj.bottom as string),
    left: addUnit(obj.left as string),
    width: addUnit(obj.width as string),
    height: addUnit(obj.height as string),
    background: obj.background,
    opacity: obj.opacity,
  } as CSSProperties;
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

  styleObj = pickOnlyCSSProperties(mobile);

  // tablet view
  if (screenWidth > BREAKPOINTS.sm && tablet) {
    styleObj = pickOnlyCSSProperties({
      ...styleObj,
      ...tablet,
    });
    hidden = Boolean(tablet.hidden);
    image = tablet.image;
    html = tablet.html;
  }

  // desktop view
  if (screenWidth > BREAKPOINTS.lg && desktop) {
    styleObj = pickOnlyCSSProperties({
      ...styleObj,
      ...desktop,
    });
    hidden = Boolean(desktop.hidden);
    image = desktop.image;
    html = desktop.html;
  }

  // use image dimensions to set decoration size
  if (image && !styleObj.width && !styleObj.height) {
    const { width, height } = getOriginalImageDimensions(image?.src);
    styleObj.width = width;
    styleObj.height = height;
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
        className="absolute"
        data-key={_key}
        style={{
          ...styleObj,
          aspectRatio: image
            ? getOriginalImageDimensions(image?.src).aspectRatio || "auto"
            : "unset",
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
