import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { ImageType } from "../../types";
import { ImageRatioType } from "./imagecard.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

export type ImageCardProps = {
  type?: "card.image";
  image?: ImageType;
  theme?: {
    image: {
      ratio?: ImageRatioType;
    };
  };
};

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const ratioClasses: Record<ImageRatioType, string> = {
  "19/27": "aspect-[19/27]",
  "1/1": "aspect-[1/1]",
  "4/3": "aspect-[4/3]",
};

export const ImageCard = ({ image, theme }: ImageCardProps) => {
  return (
    <div className="h-full relative group">
      <div
        className={cx(
          "w-full rounded-4xl overflow-hidden",
          ratioClasses[theme?.image?.ratio || "19/27"],
        )}
      >
        {image && <ResponsiveImage {...image} fill />}
      </div>
    </div>
  );
};

export default React.memo(ImageCard);
