import { VideoType } from "../../types";
import getYouTubeID from "get-youtube-id";
import { lazy, useEffect, useRef } from "react";
import React from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const YoutubeLight = lazy(
  () =>
    import(/* webpackChunkName: "YoutubeLight" */ "react-lite-youtube-embed"),
);

export const YoutubePlayer = ({
  videoId,
  loop,
  autoPlay,
  frameless,
}: VideoType) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoId) return;
    if (!wrapperRef.current) return;
    if (!autoPlay) return;

    wrapperRef.current.querySelector("button")?.click();
  }, [videoId, autoPlay]);

  if (!videoId) return null;
  const youtubeId = getYouTubeID(videoId);
  if (!youtubeId) return null;

  return (
    <div ref={wrapperRef}>
      <YoutubeLight
        id={youtubeId}
        title=""
        poster="maxresdefault"
        noCookie={true}
        muted={autoPlay ? true : false}
        params={`?autoPlay=${autoPlay ? 1 : 0}&loop=${
          loop ? 1 : 0
        }&rel=0&mute=${autoPlay ? 1 : 0}&controls=${
          frameless ? 0 : 1
        }&modestbranding=1&playsinline=1`}
      />
    </div>
  );
};

export default React.memo(YoutubePlayer);
