import { VideoType } from "../../types";
import { lazy } from "react";
import React from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const ReactVimeo = lazy(
  () => import(/* webpackChunkName: "ReactVimeo" */ "@u-wave/react-vimeo"),
);

export const YoutubePlayer = ({ videoId, loop, autoPlay }: VideoType) => {
  if (!videoId) return null;

  return (
    <ReactVimeo
      video={videoId}
      autoplay={autoPlay}
      loop={loop}
      muted
      responsive
    />
  );
};

export default React.memo(YoutubePlayer);
