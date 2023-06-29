import { getResponsiveImageUrl } from "../../helpers/sanity/image-url";
import { ImageType } from "../../types";
import NextImage, { ImageProps as NextImageProps } from "next/image";

const IMAGE_QUALITY = 85;

export type SimpleImageProps = {
  crop?: ImageType["crop"];
  hotspot?: ImageType["hotspot"];
  alt?: string;
  className?: string;
} & NextImageProps;

export const SimpleImage: React.ComponentType<SimpleImageProps> = ({
  alt,
  className,
  crop,
  fill,
  height,
  hotspot,
  priority,
  src,
  width,
}) => {
  const originalWidth = (width as number) || 1;
  const originalHeight = (height as number) || 1;
  const originalRatio = originalWidth / originalHeight;

  return (
    <>
      <NextImage
        src={src}
        className={className}
        alt={alt || ""}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        loader={({ src, width, quality }) => {
          const imageURL = getResponsiveImageUrl({
            src,
            width: Math.min(originalWidth, width),
            height: Math.min(originalWidth, width) / originalRatio,
            crop,
            hotspot,
            quality,
          });

          if (!imageURL) return "";
          return imageURL;
        }}
        quality={IMAGE_QUALITY}
      />
    </>
  );
};

export default SimpleImage;
