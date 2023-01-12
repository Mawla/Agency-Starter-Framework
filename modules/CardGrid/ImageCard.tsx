import cx from "classnames";
import React from "react";

import { Lozenge } from "../../components/Decorations/Lozenge";
import { ResponsiveImage } from "../../components/images/ResponsiveImage";
import { ImageType } from "../../types";
import { ImageRatioType } from "./ImageCardOptions";

export type ImageCardProps = {
  type?: "card.image";
  image?: ImageType;
  theme?: {
    image: {
      ratio?: ImageRatioType;
    };
  };
  lozengeVariantIndex?: number;
};

const ratioClasses: Record<ImageRatioType, string> = {
  "19/27": "aspect-[19/27]",
  "1/1": "aspect-[1/1]",
  "4/3": "aspect-[4/3]",
};

export const ImageCard = ({
  image,
  lozengeVariantIndex,
  theme,
}: ImageCardProps) => {
  if (!image) return null;
  return (
    <div className="h-full relative group">
      <div
        className={cx(
          "w-full rounded-4xl overflow-hidden",
          ratioClasses[theme?.image?.ratio || "19/27"]
        )}
      >
        <ResponsiveImage {...image} fill />
      </div>

      {lozengeVariantIndex == 0 && (
        <Lozenge
          color="blue-light"
          rotation={2}
          size="md"
          className="absolute -right-[5%] -bottom-[12.5%] z-10"
        />
      )}
      {lozengeVariantIndex == 1 && (
        <Lozenge
          color="green-light"
          rotation={10}
          size="sm"
          className="absolute -right-[25%] -bottom-[10%] z-10"
        />
      )}
      {lozengeVariantIndex == 2 && (
        <Lozenge
          color="lilac-light"
          rotation={11}
          size="lg"
          className="absolute left-[25%] -top-[0%] z-10 -translate-y-3/4"
        />
      )}
    </div>
  );
};

export default React.memo(ImageCard);
