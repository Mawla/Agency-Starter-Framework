import { VideoType } from "../../types";
import getYouTubeID from "get-youtube-id";
import { lazy } from "react";
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
  poster,
}: VideoType) => {
  if (!videoId) return null;
  const youtubeId = getYouTubeID(videoId);
  if (!youtubeId) return null;

  return (
    <YoutubeLight
      id={youtubeId}
      title=""
      poster="maxresdefault"
      noCookie={true}
      muted
      params={`?autoPlay=${autoPlay ? 1 : 0}&loop=${loop ? 1 : 0}&rel=0&mute=1`}
    />
  );
};

export default React.memo(YoutubePlayer);
