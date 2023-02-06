import Video from "./Video";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Video,
  title: "Components/Video",
} as Meta;

const MUX_DEMO_VIDEO_ID = `Lr8HuSjgC3pypezIyNU002QxHC500fTpb006jwDqlmDH88`;
const YOUTUBE_DEMO_VIDEO_ID = `https://www.youtube.com/watch?v=aqz-KE-bpKQ`;
const VIMEO_DEMO_VIDEO_ID = `1084537`;

export const AutoPlay = () => (
  <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} autoPlay />
);

export const Loop = () => (
  <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} loop />
);

export const Youtube = () => (
  <Video provider="youtube" videoId={YOUTUBE_DEMO_VIDEO_ID} />
);

export const Vimeo = () => (
  <Video provider="vimeo" videoId={VIMEO_DEMO_VIDEO_ID} />
);

export const Mux = () => <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} />;

export const BackgroundVideo = () => (
  <>
    <Video
      provider="mux"
      videoId={MUX_DEMO_VIDEO_ID}
      frameless
      autoPlay
      className="w-96 h-96 relative mb-4 border"
    />

    <Video
      provider="mux"
      videoId={MUX_DEMO_VIDEO_ID}
      frameless
      autoPlay
      className="w-96 h-40 relative mb-4 border"
    />

    <Video
      provider="mux"
      videoId={MUX_DEMO_VIDEO_ID}
      frameless
      autoPlay
      className="w-40 h-96 relative mb-4 border"
    />
  </>
);

export const YoutubeBackground = () => (
  <div className="w-96 aspect-video relative mb-4">
    <Video
      provider="youtube"
      videoId={YOUTUBE_DEMO_VIDEO_ID}
      frameless
      autoPlay
    />
  </div>
);

export const VimeoBackground = () => (
  <div className="w-96 aspect-video relative mb-4">
    <Video provider="vimeo" videoId={VIMEO_DEMO_VIDEO_ID} frameless autoPlay />
  </div>
);

export const MuxBackground = () => (
  <div className="w-96 aspect-video relative mb-4">
    <Video provider="mux" videoId={MUX_DEMO_VIDEO_ID} frameless autoPlay />
  </div>
);
