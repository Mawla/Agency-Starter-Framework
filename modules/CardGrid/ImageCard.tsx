import { ResponsiveImage } from "../../components/images/ResponsiveImage";
import { ImageType } from "../../types";
import { ImageRatioType } from "./ImageCardOptions";
import cx from "classnames";
import React from "react";

export type ImageCardProps = {
  type?: "card.image";
  image?: ImageType;
  theme?: {
    image: {
      ratio?: ImageRatioType;
    };
  };
};

const ratioClasses: Record<ImageRatioType, string> = {
  "19/27": "aspect-[19/27]",
  "1/1": "aspect-[1/1]",
  "4/3": "aspect-[4/3]",
};

export const ImageCard = ({ image, theme }: ImageCardProps) => {
  if (!image) return null;
  return (
    <div className="h-full relative group">
      <div
        className={cx(
          "w-full rounded-4xl overflow-hidden",
          ratioClasses[theme?.image?.ratio || "19/27"],
        )}
      >
        <ResponsiveImage {...image} fill />
      </div>
    </div>
  );
};

export default React.memo(ImageCard);
