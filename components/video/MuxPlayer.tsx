import { VideoType } from "../../types";
import { ComponentType, lazy } from "react";
import React from "react";

const MuxPlayerReact = lazy<ComponentType<any>>(
  () =>
    import(/* webpackChunkName: "MuxPlayerReact" */ "@mux/mux-player-react"),
);

export const MuxPlayer = ({
  videoId,
  loop,
  autoPlay,
  frameless,
}: VideoType) => {
  const style = frameless
    ? ({
        "--controls": "none",
        "--media-object-fit": "cover",
        position: "absolute",
        inset: 0,
      } as React.CSSProperties)
    : {};

  return (
    <MuxPlayerReact
      streamType="on-demand"
      playbackId={videoId}
      loop={loop}
      muted
      autoPlay={autoPlay}
      style={style}
    />
  );
};

export default React.memo(MuxPlayer);
