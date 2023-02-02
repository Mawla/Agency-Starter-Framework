import {
  getOriginalImageDimensions,
  getResponsiveImageUrl,
} from "../../helpers/sanity/image-url";
import { roundToNearest } from "../../helpers/utils/number";
import { useDebounce } from "../../hooks/useDebounce";
import { ImageType, RatioType } from "../../types";
import { ScriptJsonLd } from "../meta/ScriptJsonLd";
import cx from "classnames";
import Head from "next/head";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

export type ResponsiveImageProps = {
  crop?: ImageType["crop"];
  hotspot?: ImageType["hotspot"];
  preventResize?: boolean;
  ratio?: RatioType;
  roundSize?: number;
  alt?: string;
} & NextImageProps;

const IMAGE_QUALITY = 85;

const ratioClasses: Record<RatioType, string> = {
  auto: "aspect-auto",
  "1/1": "aspect-[1/1]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-[16/9]",
  "19/27": "aspect-[19/27]",
  "2/1": "aspect-[2/1]",
  "13/8": "aspect-[13/8]",
  "4/3": "aspect-[4/3]",
  "21/9": "aspect-[21/9]",
};

export const ResponsiveImage = ({
  src,
  width,
  height,
  crop,
  hotspot,
  alt = "",
  className,
  preventResize = false,
  priority,
  ratio,
  roundSize = 0,
  fill = false,
}: ResponsiveImageProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const [responsiveSrc, setResponsiveSrc] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "loaded" | null>(null);

  const [wrapperWidth, setWrapperWidth] = useState<number>(0);
  const [wrapperHeight, setWrapperHeight] = useState<number>(0);
  const debouncedWrapperWidth = useDebounce(wrapperWidth, 500);
  const debouncedWrapperHeight = useDebounce(wrapperHeight, 500);

  const originalDimensions = getOriginalImageDimensions(src as string);
  if (!width) width = originalDimensions?.width;
  if (!height) height = originalDimensions?.height;
  const aspectRatio = originalDimensions?.aspectRatio;

  let placeHolderSrc: string | null = null;

  // if (ratio) {
  //   height = (+width / +ratio.split(':')[0]) * +ratio.split(':')[1];
  // }

  if (src && typeof src === "string" && src.indexOf("sanity.io") > -1) {
    placeHolderSrc = getResponsiveImageUrl({
      src,
      width: 16,
      height: 16 / (+(width || 0) / +(height || 0)),
      hotspot,
      crop,
      blur: 10,
    });
  }

  useEffect(() => {
    if (state === null) setState("loading");
  }, [state]);

  const onResize = useCallback(() => {
    if (!src) return;
    if (!wrapperRef?.current) return;
    if (!placeHolderSrc) return;
    if (typeof src !== "string") return;

    const rect = wrapperRef.current.getBoundingClientRect();

    const w = roundToNearest(roundSize, rect.width);
    const h = roundToNearest(roundSize, rect.height);

    setWrapperWidth(w);
    setWrapperHeight(h);
  }, [src, placeHolderSrc, roundSize]);

  /**
   * Listen to window resizes
   */

  useEffect(() => {
    if (!src) return;
    if (!wrapperRef?.current) return;
    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(wrapperRef.current);
    () => resizeObserver.disconnect();
  }, [wrapperRef, src, onResize]);

  /**
   * when the debounced window width changes
   * generate new source for sanity images
   */

  useEffect(() => {
    if (!src) return;
    if (!placeHolderSrc) return;
    if (typeof src !== "string") return;
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    const newWidth = roundToNearest(roundSize, rect.width);
    let newHeight = roundToNearest(roundSize, rect.height);
    let quality: number | null = IMAGE_QUALITY;

    if (preventResize === true) {
      // Do we need to factor in crops as well? https://github.com/sanity-io/hydrogen-sanity-demo/blob/main/src/components/SanityImage.client.jsx#L100
      newHeight = rect.width / (+(width || 0) / +(height || 0));
      quality = null;
    }

    // for layouts where height depends on the image, use image ratio
    if (newHeight === 0)
      newHeight = newWidth / (+(width || 0) / +(height || 0));

    setResponsiveSrc(
      getResponsiveImageUrl({
        src,
        width: newWidth,
        height: newHeight,
        hotspot,
        crop,
        quality,
      }),
    );
  }, [
    wrapperWidth,
    debouncedWrapperHeight,
    width,
    height,
    src,
    crop,
    hotspot,
    preventResize,
    placeHolderSrc,
    roundSize,
  ]);

  const onImageLoad = useCallback(() => {
    setState("loaded");
  }, []);

  const imageJsonLd = {
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    contentUrl: src,
    description: alt,
  };

  if (!src) return null;

  return (
    // disable margin underneath next image until classes can be applied to next image directly
    // https://github.com/vercel/next.js/discussions/22861
    <div
      className={cx("text-0 h-full w-full", {
        [ratioClasses[ratio || "auto"]]: ratio,
      })}
      ref={wrapperRef}
    >
      {priority && responsiveSrc && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={`${responsiveSrc}&q=${IMAGE_QUALITY}`}
          />
        </Head>
      )}

      {(state === "loading" || state === "loaded") && (
        <NextImage
          src={responsiveSrc || placeHolderSrc || src}
          className={className}
          alt={alt || ""}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          priority={priority}
          loader={({ src, width, quality = 100 }) => {
            return `${src}&q=${quality}`;
          }}
          quality={IMAGE_QUALITY}
          onLoadingComplete={onImageLoad}
        />
      )}
      <ScriptJsonLd data={imageJsonLd} />
    </div>
  );
};

export default React.memo(ResponsiveImage);
