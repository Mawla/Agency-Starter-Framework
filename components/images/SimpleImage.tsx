import { FancyboxProps } from "../../components/lightbox/Fancybox";
import { getResponsiveImageUrl } from "../../helpers/sanity/image-url";
import { ImageType } from "../../types";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { ComponentType, lazy } from "react";

const IMAGE_QUALITY = 85;

const Fancybox = lazy<ComponentType<FancyboxProps>>(
  () =>
    import(
      /* webpackChunkName: "Fancybox" */ "../../components/lightbox/Fancybox"
    ),
);

export type SimpleImageProps = {
  crop?: ImageType["crop"];
  hotspot?: ImageType["hotspot"];
  alt?: string;
  className?: string;
  zoom?: boolean;
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
  zoom,
}) => {
  const originalWidth = (width as number) || 1;
  const originalHeight = (height as number) || 1;
  const aspectRatio = originalWidth / originalHeight;

  return (
    <div className="image relative" data-animate="fade-in">
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
            height: Math.min(originalWidth, width) / aspectRatio,
            crop,
            hotspot,
            quality,
          });

          if (!imageURL) return "";
          return imageURL;
        }}
        quality={IMAGE_QUALITY}
        unoptimized
      />

      {zoom && typeof src === "string" && (
        <Fancybox>
          <a
            href={src}
            data-fancybox
            className="absolute h-full top-0 left-0 cursor-zoom-in"
            style={{
              aspectRatio,
            }}
          >
            <span className="sr-only">zoom</span>
          </a>
        </Fancybox>
      )}
    </div>
  );
};

export default SimpleImage;
