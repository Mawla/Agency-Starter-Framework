import { VideoType } from "../../types";
import { lazy } from "react";
import React from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const ReactVimeo = lazy(
  () => import(/* webpackChunkName: "ReactVimeo" */ "@u-wave/react-vimeo"),
);

export const VimeoPlayer = ({
  videoId,
  loop,
  autoPlay,
  frameless,
}: VideoType) => {
  if (!videoId) return null;

  return (
    <ReactVimeo
      video={videoId}
      autoplay={autoPlay}
      loop={loop}
      muted
      responsive
      controls={!frameless}
    />
  );
};

export default React.memo(VimeoPlayer);
