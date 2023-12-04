import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { slugify } from "../../helpers/utils/string";
import { ImageType, VideoType } from "../../types";
import {
  backgroundRoundedBottomClasses,
  backgroundRoundedTopClasses,
  BlockRoundedType,
} from "../block/background.options";
import { ResponsiveImageProps } from "../images/ResponsiveImage";
import { VideoProps } from "../video/Video";
import { DecorationLocationType } from "./decoration.options";
import cx from "clsx";
import DOMPurify from "dompurify";
import {
  CSSProperties,
  ComponentType,
  lazy,
  useEffect,
  useId,
  useState,
} from "react";

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../images/ResponsiveImage"
    ),
);

const Video = lazy<ComponentType<VideoProps>>(
  () => import(/* webpackChunkName: "Video" */ "../video/Video"),
);

export type CSSDecorationProps = {
  _key?: string;
  title?: string;
  _type?: "cssdecoration";
  slug?: string;
  theme?: {
    rounded?: BlockRoundedType;
  };
  breakout?: boolean;
  location?: DecorationLocationType;
  image?: ImageType;
  imageRepeat?: boolean;
  video?: VideoType;
  html?: string;
  css?: string;
};

export const CSSDecoration = ({
  _key,
  title,
  breakout,
  imageRepeat,
  theme,
  image,
  video,
  html,
  css,
  slug,
}: CSSDecorationProps) => {
  const uniqueClassName = slugify(`decoration-${useId()}`);

  const [innerHTML, setInnerHTML] = useState<null | string>(null);

  useEffect(() => {
    if (html) setInnerHTML(DOMPurify?.sanitize?.(html));
  }, [html]);

  let styleObj: CSSProperties = {};
  if (image && imageRepeat) {
    styleObj.background = `url(${image?.src})`;
  }

  if (image && !imageRepeat) {
    styleObj.aspectRatio =
      getOriginalImageDimensions(image?.src).aspectRatio || "auto";
  }

  return (
    <div
      className={cx("absolute inset-0 pointer-events-none", {
        ["overflow-hidden"]: breakout !== true,
        [backgroundRoundedTopClasses.md]: theme?.rounded?.top === "md",
        [backgroundRoundedBottomClasses.md]: theme?.rounded?.bottom === "md",
        [backgroundRoundedTopClasses.lg]: theme?.rounded?.top === "lg",
        [backgroundRoundedBottomClasses.lg]: theme?.rounded?.bottom === "lg",
      })}
    >
      <style
        dangerouslySetInnerHTML={
          css
            ? {
                __html: css
                  .trim()
                  .replace(/\.x/g, `.${uniqueClassName}`)
                  .replace(/\n/g, " ")
                  .replace(/ {2,}/g, " "),
              }
            : undefined
        }
      />
      <div
        key={_key}
        aria-hidden="true"
        className={cx("absolute z-10", slug, uniqueClassName)}
        data-key={_key}
        style={{
          ...styleObj,
        }}
      >
        {image && !imageRepeat && (
          <ResponsiveImage {...image} fill roundSize={25} />
        )}
        {video && <Video {...video} />}
        {innerHTML && (
          <div
            className="html"
            dangerouslySetInnerHTML={
              html
                ? {
                    __html: innerHTML,
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default CSSDecoration;
