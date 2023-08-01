import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { BREAKPOINTS, useBreakpoint } from "../../hooks/useBreakpoint";
import { ImageType } from "../../types";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
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
  mobile?: DecorationType;
  tablet?: DecorationType;
  desktop?: DecorationType;
};

const pickOnlyCSSProperties = (obj: Record<string, unknown>): CSSProperties => {
  return {
    top: obj.top,
    right: obj.right,
    bottom: obj.bottom,
    left: obj.left,
    width: obj.width,
    height: obj.height,
    background: obj.background,
    opacity: obj.opacity,
  } as CSSProperties;
};

export const Decoration = ({
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

  if (hidden) return null;

  if (html) html = DOMPurify?.sanitize?.(html);

  return (
    <i className="absolute inset-0 overflow-hidden">
      <i
        className="absolute"
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
