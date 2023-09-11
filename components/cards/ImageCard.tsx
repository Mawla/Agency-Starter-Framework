import { ColumnType } from "../../blocks/block18/block18.options";
import { DecorationsProps } from "../../components/decorations/Decorations";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  paddingBottomClasses,
  paddingTopClasses,
  paddingXClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  ImageType,
  PaddingType,
} from "../../types";
import { DecorationProps } from "../decorations/Decoration";
import { ImageRatioType } from "./imagecard.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

export type ImageCardProps = {
  type?: "card.image";
  _key?: string;
  image?: ImageType;
  decorations?: DecorationProps[];
  theme?: {
    card?: {
      background?: ColorType;
      paddingX?: PaddingType;
      paddingTop?: PaddingType;
      paddingBottom?: PaddingType;
      columns?: ColumnType;
    };
    border?: {
      color?: ColorType;
      radius?: BorderRadiusType;
      width?: BorderWidthType;
    };
    image?: {
      ratio?: ImageRatioType;
      rounded?: BorderRadiusType;
    };
  };
};

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const Decorations = lazy<ComponentType<DecorationsProps>>(
  () =>
    import(
      /* webpackChunkName: "Decorations" */ "../../components/decorations/Decorations"
    ),
);

const ratioClasses: Record<ImageRatioType, string> = {
  "19/27": "aspect-[19/27]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-[1/1]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
};

export const ImageCard = ({ image, theme, decorations }: ImageCardProps) => {
  return (
    <div
      className={cx(
        "h-full relative overflow-hidden group",
        theme?.border?.color && borderClasses[theme?.border?.color],
        theme?.border?.color && borderWidthClasses[theme?.border?.width || 1],
        theme?.border?.radius && borderRadiusClasses[theme?.border?.radius],
        theme?.card?.background && backgroundClasses[theme?.card?.background],
        theme?.card?.paddingTop && paddingTopClasses[theme?.card?.paddingTop],
        theme?.card?.paddingBottom &&
          paddingBottomClasses[theme?.card?.paddingBottom],
        theme?.card?.paddingX && paddingXClasses[theme?.card?.paddingX],
      )}
    >
      {image && (
        <div
          className={cx(
            "relative",
            ratioClasses[theme?.image?.ratio || "16/9"],
          )}
        >
          <ResponsiveImage {...image} fill zoom gallery />
        </div>
      )}
      <Decorations decorations={decorations} />
    </div>
  );
};

export default React.memo(ImageCard);
