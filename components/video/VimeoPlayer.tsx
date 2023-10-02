import { VideoType } from "../../types";
import Vimeo from "@u-wave/react-vimeo";
import React from "react";

export const VimeoPlayer = ({
  videoId,
  loop,
  autoPlay,
  frameless,
}: VideoType) => {
  if (!videoId) return null;

  // hack to get around typescript error
  // Its type 'typeof Vimeo' is not a valid JSX element type.
  // Property 'children' is missing in type 'ReactElement<any, string | JSXElementConstructor<any>>' but required in type 'ReactPortal'.
  const ReactVimeo = Vimeo as any;

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
