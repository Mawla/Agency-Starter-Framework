import { VideoType } from "../../types";
// @ts-ignore
import { YouTubeEmbed } from "@next/third-parties/google";
import getYouTubeID from "get-youtube-id";
import { useEffect, useRef } from "react";
import React from "react";

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
    <div
      ref={wrapperRef}
      className="[&>div>*]:max-w-none [&>div>*:before]:hidden"
    >
      <YouTubeEmbed
        videoid={youtubeId}
        params={`?autoPlay=${autoPlay ? 1 : 0}&loop=${
          loop ? 1 : 0
        }&rel=0&mute=${autoPlay ? 1 : 0}&controls=${
          frameless ? 0 : 1
        }&modestbranding=1&playsinline=1`}
        width="100%"
      />
    </div>
  );
};

export default React.memo(YoutubePlayer);
