import { ImageType } from "../../types";
import { config as sanityConfig } from "./config";
import imageUrlBuilder from "@sanity/image-url";

type GetResponsiveImageUrlProps = {
  src: string;
  width: number;
  height: number;
  crop: ImageType["crop"];
  hotspot: ImageType["hotspot"];
  blur?: number;
  quality?: number | null;
  preserveAspectRatio?: boolean;
};

const IMAGE_QUALITY = 85;

const imageBuilder = imageUrlBuilder(sanityConfig);

export function getResponsiveImageUrl({
  src,
  width,
  height,
  crop,
  hotspot,
  blur = 0,
  quality = IMAGE_QUALITY,
  preserveAspectRatio,
}: GetResponsiveImageUrlProps) {
  if (!src) return null;

  const {
    width: originalWidth,
    height: originalHeight,
    aspectRatio,
  } = getOriginalImageDimensions(src);

  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
  let newSrc = imageBuilder.image(src).auto("format");

  if (quality) newSrc = newSrc.quality(IMAGE_QUALITY);
  if (blur) newSrc = newSrc.blur(blur);
  if (width) newSrc = newSrc.width(Math.ceil(width * dpr));
  if (height)
    newSrc = newSrc.height(
      Math.ceil((preserveAspectRatio ? width / aspectRatio : height) * dpr),
    );
  if (hotspot?.x && hotspot?.y)
    newSrc = newSrc
      .crop("focalpoint")
      .focalPoint(hotspot.x, hotspot.y)
      .fit("crop");
  if (
    crop &&
    crop?.left !== null &&
    crop?.top !== null &&
    crop?.right !== null &&
    crop?.bottom !== null
  ) {
    const rect = {
      left: Math.floor(originalWidth * (crop?.left || 0)),
      top: Math.floor(originalHeight * (crop?.top || 0)),
      width:
        originalWidth -
        Math.floor(originalWidth * (crop?.right || 0)) -
        Math.floor(originalWidth * (crop?.left || 0)),
      height:
        originalHeight -
        Math.floor(originalHeight * (crop?.bottom || 0)) -
        Math.floor(originalHeight * (crop?.top || 0)),
    };
    if (rect.width <= 0) rect.width = originalWidth;
    if (rect.height <= 0) rect.height = originalHeight;
    newSrc = newSrc.rect(rect.left, rect.top, rect.width, rect.height);
  }

  try {
    return newSrc.url();
  } catch (error) {
    return null;
  }
}

export function getOriginalImageDimensions(src: string) {
  const nothing = { width: 0, height: 0, aspectRatio: 0 };
  if (!src) return nothing;
  const filename = src?.split("/")?.pop();
  if (!filename) return nothing;
  const pattern = /-(\d+x\d+)/;
  const result = pattern.exec(filename);
  const dimensions = result?.[1] || "0x0";
  const [width, height] = dimensions.split("x").map((v) => parseInt(v, 10));
  const aspectRatio = width / height;
  return {
    width,
    height,
    aspectRatio,
  };
}
