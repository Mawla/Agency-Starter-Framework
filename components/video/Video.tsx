import { VideoType } from "../../types";
import cx from "clsx";
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

const VideoPlayer = lazy<ComponentType<VideoType>>(
  () => import(/* webpackChunkName: "VideoPlayer" */ "./VideoPlayer"),
);

export type VideoProps = {
  className?: string;
  cover?: boolean;
  animate?: boolean;
} & VideoType;

export const Video = (props: VideoProps) => {
  let { provider, className, cover } = props;
  if (!className) className = "aspect-video relative";

  const wrapperRef = useRef<HTMLDivElement>(null);

  const coverClassName = cover
    ? cx(
        `[&_div]:!h-full [&_div]:!static [&_div]:!p-0`,
        `[&_iframe]:!absolute [&_iframe]:!top-1/2 [&_iframe]:!left-1/2`,
        `[&_iframe]:!-translate-x-1/2 [&_iframe]:!-translate-y-1/2 [&_iframe]:!h-full [&_iframe]:!w-[1000vw]`,
        `[&_video]:object-cover [&_video]:!h-full [&_video]:!w-full`,
        `[&_.yt-lite]:h-full`,
      )
    : null;

  return (
    <div
      ref={wrapperRef}
      className={cx("video", coverClassName, className)}
      data-animate={props.animate !== false ? "fade-in" : undefined}
    >
      {provider === "youtube" && <YoutubePlayer {...props} />}
      {provider === "vimeo" && <VimeoPlayer {...props} />}
      {provider === "mux" && <MuxPlayer {...props} />}
      {provider === "url" && <VideoPlayer {...props} />}
      {provider === "sanity" && <VideoPlayer {...props} />}
    </div>
  );
};

export default React.memo(Video);
