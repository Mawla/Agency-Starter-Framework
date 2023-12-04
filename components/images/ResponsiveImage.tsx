"use client";

import {
  getOriginalImageDimensions,
  getResponsiveImageUrl,
} from "../../helpers/sanity/image-url";
import { roundToNearest } from "../../helpers/utils/number";
import { ratioClasses } from "../../theme";
import { ImageType, RatioType } from "../../types";
import { FancyboxProps } from "../lightbox/Fancybox";
import { ScriptJsonLd } from "../meta/ScriptJsonLd";
import cx from "clsx";
import Head from "next/head";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import React, {
  ComponentType,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const Fancybox = lazy<ComponentType<FancyboxProps>>(
  () =>
    import(
      /* webpackChunkName: "Fancybox" */ "../../components/lightbox/Fancybox"
    ),
);

export type ResponsiveImageProps = {
  crop?: ImageType["crop"];
  hotspot?: ImageType["hotspot"];
  ratio?: RatioType;
  roundSize?: number;
  alt?: string;
  caption?: string;
  preserveAspectRatio?: boolean;
  zoom?: boolean;
  gallery?: boolean;
  animate?: boolean;
} & NextImageProps;

const IMAGE_QUALITY = 85;

export const ResponsiveImage = ({
  src,
  width,
  height,
  crop,
  hotspot,
  alt = "",
  caption,
  className,
  priority,
  ratio,
  roundSize = 0,
  fill = false,
  preserveAspectRatio,
  zoom = false,
  gallery,
  animate,
}: ResponsiveImageProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [responsiveSrc, setResponsiveSrc] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "loaded" | null>(null);

  const [wrapperWidth, setWrapperWidth] = useState<number>(0);

  const originalDimensions = getOriginalImageDimensions(src as string);
  if (!width) width = originalDimensions?.width;
  if (!height) height = originalDimensions?.height;
  const aspectRatio = originalDimensions.aspectRatio;

  const FancyboxElement = gallery ? React.Fragment : Fancybox;
  let fancyboxAttrs = {};
  if (!gallery) fancyboxAttrs = { className: "inline" };

  let placeHolderSrc: string | null = null;

  if (src && typeof src === "string" && src.indexOf("sanity.io") > -1) {
    placeHolderSrc = getResponsiveImageUrl({
      src,
      width: 16,
      height: 16 / (+(width || 0) / +(height || 0)),
      hotspot,
      crop,
      blur: 10,
      preserveAspectRatio,
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
    setWrapperWidth(w);
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
        preserveAspectRatio,
      }),
    );
  }, [
    wrapperWidth,
    width,
    height,
    src,
    crop,
    hotspot,
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
      className={cx("image text-0 h-full w-full", {
        [ratioClasses[ratio || "auto"]]: ratio,
        ["absolute inset-0"]: fill,
        ["relative"]: !fill,
      })}
      ref={wrapperRef}
      data-animate={animate !== false ? "fade-in" : undefined}
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
          quality={IMAGE_QUALITY}
          onLoad={onImageLoad}
          unoptimized
        />
      )}

      {zoom && typeof src === "string" && (
        <FancyboxElement {...fancyboxAttrs}>
          <a
            href={src}
            data-fancybox
            data-caption={caption}
            className={cx("absolute h-full top-0 left-0 cursor-zoom-in", {
              ["w-full"]: fill,
            })}
            style={
              fill
                ? undefined
                : {
                    maxWidth: width,
                    maxHeight: height,
                    aspectRatio,
                  }
            }
          >
            <span className="sr-only">zoom</span>
          </a>
        </FancyboxElement>
      )}

      <ScriptJsonLd data={imageJsonLd} />
    </div>
  );
};

export default React.memo(ResponsiveImage);
