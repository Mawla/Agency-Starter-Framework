import { useInView } from "../../hooks/useInView";
import { VideoType } from "../../types";
import React, { ComponentType, lazy, useRef } from "react";

const MuxPlayer = lazy<ComponentType<VideoType>>(
  () => import(/* webpackChunkName: "MuxPlayer" */ "./MuxPlayer"),
);

const YoutubePlayer = lazy<ComponentType<VideoType>>(
  () => import(/* webpackChunkName: "YoutubePlayer" */ "./YoutubePlayer"),
);

const VimeoPlayer = lazy<ComponentType<VideoType>>(
  () => import(/* webpackChunkName: "VimeoPlayer" */ "./VimeoPlayer"),
);

export const Video = (props: VideoType) => {
  const { provider } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const lazyLoaded = useInView({
    elementRef: wrapperRef,
    threshold: 0.01,
    once: true,
  });

  if (!lazyLoaded)
    return (
      <div ref={wrapperRef} className="bg-black bg-opacity-5 aspect-video" />
    );

  return (
    <div ref={wrapperRef}>
      {provider === "youtube" && <YoutubePlayer {...props} />}
      {provider === "vimeo" && <VimeoPlayer {...props} />}
      {provider === "mux" && <MuxPlayer {...props} />}
    </div>
  );
};

export default React.memo(Video);
