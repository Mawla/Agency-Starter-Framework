import { VideoType } from "../../types";
import ReactVimeo from "@u-wave/react-vimeo";
import React from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

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
