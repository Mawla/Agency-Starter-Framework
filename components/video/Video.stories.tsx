import { Meta } from '@storybook/react';
import React from 'react';

import Video from './Video';

export default {
  component: Video,
  title: 'Components/Video',
} as Meta;

export const Default = () => (
  <Video provider="static" videoId="/video/video-hero_v3.mp4" />
);

export const AutoPlay = () => (
  <Video provider="static" videoId="/video/video-hero_v3.mp4" autoPlay />
);

export const Loop = () => (
  <Video provider="static" videoId="/video/video-hero_v3.mp4" loop />
);

export const Caption = () => (
  <Video provider="youtube" videoId="bTqVqk7FSmY" caption="This is a video" />
);

export const Youtube = () => <Video provider="youtube" videoId="bTqVqk7FSmY" />;

export const Vimeo = () => <Video provider="vimeo" videoId="76979871" />;

export const Cloudinary = () => (
  <Video provider="cloudinary" videoId="samples/sea-turtle" />
);

export const Mux = () => (
  <Video provider="mux" videoId="SDkcSsvEj1QRgDRRGqZ2a63keqyKyMFTP5AG9xUUyIk" />
);

export const BackgroundVideo = () => (
  <>
    <div className="w-96 h-96 relative mb-4">
      <Video provider="cloudinary" videoId="samples/sea-turtle" frameless autoPlay />
    </div>

    <div className="w-96 h-40 relative mb-4">
      <Video provider="cloudinary" videoId="samples/sea-turtle" frameless autoPlay />
    </div>

    <div className="w-40 h-96 relative mb-4">
      <Video provider="cloudinary" videoId="samples/sea-turtle" frameless autoPlay />
    </div>
  </>
);

export const StaticBackground = () => (
  <div className="w-96 h-96 relative mb-4">
    <Video provider="static" videoId="/video/video-hero_v3.mp4" frameless autoPlay />
  </div>
);

export const CloudinaryBackground = () => (
  <div className="w-96 h-96 relative mb-4">
    <Video provider="cloudinary" videoId="samples/sea-turtle" frameless autoPlay />
  </div>
);

export const YoutubeBackground = () => (
  <div className="w-96 aspect-video relative mb-4">
    <Video provider="youtube" videoId="bTqVqk7FSmY" frameless autoPlay />
  </div>
);

export const VimeoBackground = () => (
  <div className="w-96 aspect-video relative mb-4">
    <Video provider="vimeo" videoId="76979871" frameless autoPlay />
  </div>
);

export const MuxBackground = () => (
  <div className="w-96 aspect-video relative mb-4">
    <Video
      provider="mux"
      videoId="SDkcSsvEj1QRgDRRGqZ2a63keqyKyMFTP5AG9xUUyIk"
      frameless
      autoPlay
    />
  </div>
);
