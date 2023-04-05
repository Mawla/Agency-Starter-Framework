import { VideoType } from "../../types";
import React from "react";

const getVideoTypeForURL = (url: string) => {
  const ext = url.split(".").pop();
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg") return "video/ogg";
  return "video/mp4";
};

export const VideoPlayer = ({
  videoId,
  loop,
  autoPlay,
  frameless,
}: VideoType) => {
  if (!videoId) return null;

  return (
    <video
      autoPlay={autoPlay}
      loop={loop}
      muted
      controls={!frameless}
      className="w-full"
    >
      <source src={videoId} type={getVideoTypeForURL(videoId)} />
    </video>
  );
};

export default React.memo(VideoPlayer);
