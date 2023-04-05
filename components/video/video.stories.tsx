import Video from "./Video";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Video,
  title: "Components/Video",
} as Meta;

const MUX_DEMO_VIDEO_ID = `uNbxnGLKJ00yfbijDO8COxTOyVKT01xpxW`;
const YOUTUBE_DEMO_VIDEO_ID = `https://www.youtube.com/watch?v=aqz-KE-bpKQ`;
const VIMEO_DEMO_VIDEO_ID = `1084537`;
const VIDEO_DEMO_VIDEO_ID = `https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4`;

export const AutoPlay = () => (
  <>
    <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} autoPlay />
    <Video provider="youtube" videoId={YOUTUBE_DEMO_VIDEO_ID} autoPlay />
    <Video provider="vimeo" videoId={VIMEO_DEMO_VIDEO_ID} autoPlay />
    <Video provider="url" videoId={VIDEO_DEMO_VIDEO_ID} autoPlay />
  </>
);

export const Frameless = () => (
  <>
    <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} autoPlay frameless />
    <Video
      provider="youtube"
      videoId={YOUTUBE_DEMO_VIDEO_ID}
      autoPlay
      frameless
    />
    <Video provider="vimeo" videoId={VIMEO_DEMO_VIDEO_ID} autoPlay frameless />
    <Video provider="url" videoId={VIDEO_DEMO_VIDEO_ID} autoPlay frameless />
  </>
);

export const Loop = () => (
  <>
    <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} autoPlay loop />
    <Video provider="youtube" videoId={YOUTUBE_DEMO_VIDEO_ID} autoPlay loop />
    <Video provider="vimeo" videoId={VIMEO_DEMO_VIDEO_ID} autoPlay loop />
    <Video provider="url" videoId={VIDEO_DEMO_VIDEO_ID} autoPlay loop />
  </>
);

export const Cover = () => (
  <>
    <div className="w-96 h-96 relative border overflow-hidden">
      <Video
        provider="mux"
        videoId={MUX_DEMO_VIDEO_ID}
        autoPlay
        frameless
        className="absolute inset-0"
        cover
      />
    </div>
    <div className="w-96 h-96 relative border overflow-hidden">
      <Video
        provider="youtube"
        videoId={YOUTUBE_DEMO_VIDEO_ID}
        autoPlay
        frameless
        className="absolute inset-0"
        cover
      />
    </div>

    <div className="w-96 h-96 relative border overflow-hidden">
      <Video
        provider="vimeo"
        videoId={VIMEO_DEMO_VIDEO_ID}
        autoPlay
        frameless
        className="absolute inset-0"
        cover
      />
    </div>

    <div className="w-96 h-96 relative border overflow-hidden">
      <Video
        provider="url"
        videoId={VIDEO_DEMO_VIDEO_ID}
        autoPlay
        frameless
        className="absolute inset-0"
        cover
      />
    </div>
  </>
);

export const Youtube = () => (
  <Video provider="youtube" videoId={YOUTUBE_DEMO_VIDEO_ID} />
);

export const Vimeo = () => (
  <Video provider="vimeo" videoId={VIMEO_DEMO_VIDEO_ID} />
);

export const URL = () => <Video provider="url" videoId={VIDEO_DEMO_VIDEO_ID} />;

export const Mux = () => <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} />;
