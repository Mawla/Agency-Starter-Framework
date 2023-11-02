import { ColumnType } from "../../blocks/block18/block18.options";
import { DecorationsProps } from "../../components/decorations/Decorations";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  paddingBottomClasses,
  paddingTopClasses,
  paddingXClasses,
  ratioClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  ImageType,
  PaddingType,
  RatioType,
} from "../../types";
import { DecorationProps } from "../decorations/Decoration";
import cx from "clsx";
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
      ratio?: RatioType;
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

export const ImageCard = ({ image, theme, decorations }: ImageCardProps) => {
  return (
    <div
      className={cx(
        "h-full relative overflow-hidden group",
        theme?.border?.color && borderClasses[theme?.border?.color],
        theme?.border?.color && "border",
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
          style={{
            aspectRatio:
              theme?.image?.ratio === "auto"
                ? getOriginalImageDimensions(image.src).aspectRatio || "auto"
                : undefined,
          }}
        >
          <ResponsiveImage {...image} fill zoom gallery />
        </div>
      )}
      <Decorations decorations={decorations} />
    </div>
  );
};

export default React.memo(ImageCard);
