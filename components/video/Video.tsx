import { useDebounce } from "../../hooks/useDebounce";
import { useInView } from "../../hooks/useInView";
import { VideoType } from "../../types";
import { IconLoader } from "../images/IconLoader";
import cx from "classnames";
import Plyr from "plyr";
import PlyrJS, { Options as PlyrOptions } from "plyr";
import React, { useEffect, useRef, useState } from "react";

export const Video = ({
  provider,
  videoId,
  loop,
  autoPlay,
  frameless,
  poster,
}: VideoType) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoDivRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  const debouncedWindowWidth = useDebounce(windowWidth, 500);
  const [responsiveSrc, setResponsiveSrc] = useState<string | null>(
    videoId || null
  );

  const [videoPlaybackState, setVideoPlaybackState] = useState<
    "playing" | "paused" | "ended"
  >(autoPlay ? "playing" : "paused");

  const [allowYoutube, setAllowYoutube] = useState<boolean>(
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
  );

  const [PlyrInstance, setPlyrInstance] = useState<Plyr | null>(null);

  const lazyLoaded = useInView({
    elementRef: wrapperRef,
    threshold: 0.01,
    once: true,
  });

  /**
   * Initiate plyr.js
   */

  useEffect(() => {
    if (!lazyLoaded) return;
    if (!videoId) return;
    if (!videoRef?.current && !videoDivRef?.current) return;

    const options: PlyrOptions = {
      autoplay: autoPlay,
      loop: { active: loop || false },
      muted: true,
    };

    if (frameless) options.controls = [];

    function onVideoEnd() {
      setVideoPlaybackState("ended");
    }

    function onVideoPlay() {
      setVideoPlaybackState("playing");
    }

    function onVideoPause() {
      setVideoPlaybackState("paused");
    }

    const plyr = new PlyrJS(
      (videoRef.current || videoDivRef.current) as any,
      options
    );
    plyr.muted = autoPlay || false; // autoplay won't work on chrome without this, seems a bug that it's not accepting the muted option
    setPlyrInstance(plyr);

    plyr.on("ended", onVideoEnd);
    plyr.on("play", onVideoPlay);
    plyr.on("pause", onVideoPause);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      plyr.pause();

    return () => {
      if (plyr) {
        plyr.off("ended", onVideoEnd);
        plyr.off("play", onVideoPlay);
        plyr.off("pause", onVideoPause);
        plyr.destroy();
      }
    };
  }, [
    videoRef,
    videoDivRef,
    lazyLoaded,
    autoPlay,
    loop,
    frameless,
    provider,
    videoId,
  ]);

  /**
   * Make cloudinary video responsive
   */

  useEffect(() => {
    if (provider !== "cloudinary") return;
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();

    // round to 50 so it has a chance of being cached by the cdn
    // instead of every pixel being fresh
    const newWidth = Math.ceil(rect.width / 50) * 50 || debouncedWindowWidth;
    let newHeight = Math.ceil(rect.height / 50) * 50 || (newWidth / 16) * 9;

    // setting q_100 will cause firefox to be unable to decode the video https://support.cloudinary.com/hc/en-us/community/posts/360043365471-Video-with-100-quality-not-working
    setResponsiveSrc(
      `https://res.cloudinary.com/${
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        process.env.STORYBOOK_CLOUDINARY_CLOUD_NAME
      }/video/upload/q_99/w_${newWidth}/h_${newHeight}/${videoId}.mp4`
    );
  }, [provider, videoId, debouncedWindowWidth]);

  /**
   * Listen to window resizes
   */

  useEffect(() => {
    if (!wrapperRef?.current) return;

    function onResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize, { passive: true });
    () => window.removeEventListener("resize", onResize);
  }, [wrapperRef, videoId]);

  /**
   * Mux streaming video needs hls.js
   */

  useEffect(() => {
    if (provider !== "mux") return;
    if (!lazyLoaded) return;
    if (!videoId) return;

    async function loadHLS() {
      if (!videoRef.current) return;
      if (provider === "mux") {
        const HLSJS = (await import("hls.js")).default;
        const hls = new HLSJS();
        hls.loadSource(`https://stream.mux.com/${videoId}.m3u8`);
        hls.attachMedia(videoRef.current);
      }
    }

    loadHLS();
  }, [lazyLoaded, videoRef, provider, videoId]);

  /**
   * Toggle play / pause
   */

  const onVideoClick = () => {
    if (!frameless) return;
    PlyrInstance?.togglePlay();
  };

  /**
   * Check marketing cookies by waiting for onetrust to load
   */

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production")
      return setAllowYoutube(true);
    if (provider !== "youtube") return;

    function checkMarketingCookies() {
      if ((window as any).OnetrustActiveGroups?.indexOf("C0004") > -1) {
        setAllowYoutube(true);
      }
    }

    let pollAnimationFrame: number;

    function pollOneTrust() {
      if (
        typeof (window as any).OneTrust !== "undefined" &&
        typeof (window as any).OnetrustActiveGroups !== "undefined"
      ) {
        checkMarketingCookies();
        (window as any).OneTrust?.OnConsentChanged(checkMarketingCookies);
        cancelAnimationFrame(pollAnimationFrame);
      } else {
        pollAnimationFrame = requestAnimationFrame(pollOneTrust);
      }
    }

    pollOneTrust();

    return () => cancelAnimationFrame(pollAnimationFrame);
  }, [provider]);

  return (
    <div
      ref={wrapperRef}
      onClick={onVideoClick}
      className={cx(frameless ? "plyr-background-video" : "relative")}
    >
      {!lazyLoaded && (
        <div className="border bg-black bg-opacity-5 border-black border-opacity-5 rounded-sm aspect-video"></div>
      )}

      {lazyLoaded && (
        <>
          {provider === "vimeo" && (
            <div
              data-plyr-provider={provider}
              data-plyr-embed-id={videoId}
              data-poster={poster?.src}
              ref={videoDivRef}
            ></div>
          )}

          {provider === "youtube" && (
            <>
              {allowYoutube ? (
                <div
                  data-plyr-provider={provider}
                  data-plyr-embed-id={videoId}
                  data-poster={poster?.src}
                  ref={videoDivRef}
                />
              ) : (
                <div className="border bg-black bg-opacity-5 border-black border-opacity-5 rounded-sm aspect-video">
                  <div className="flex h-full">
                    <div className="self-center mx-auto text-center p-10">
                      <p className="mb-8">
                        To be able to watch this video please change your cookie
                        settings.
                      </p>
                      {/* <ButtonGroup
                        items={[
                          {
                            label: "Open cookie preferences",
                            as: "button",
                            onClick: () =>
                              (window as any).OneTrust?.ToggleInfoDisplay(),
                          },
                        ]}
                      /> */}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {(provider === "static" ||
            provider === "sanity" ||
            provider === "mux" ||
            provider === "cloudinary") && (
            <video
              playsInline
              ref={videoRef}
              muted={autoPlay}
              data-poster={poster?.src}
            >
              <source
                src={responsiveSrc || ""}
                type={
                  provider === "mux" ? "application/x-mpegURL" : "video/mp4"
                }
              />
            </video>
          )}

          {frameless && (
            <button
              type="button"
              aria-label={videoPlaybackState === "playing" ? "Pause" : "Play"}
              className="text-black opacity-75 absolute right-4 bottom-4 z-10 w-8 h-8 hover:opacity-90 transition-opacity"
            >
              <IconLoader
                icon={videoPlaybackState === "playing" ? "pause" : "play"}
              />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(Video);
