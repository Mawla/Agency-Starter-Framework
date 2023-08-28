import { demoImage } from "../../stories/content";
import { Decoration } from "./Decoration";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Decoration,
  title: "components/Decorations",
} as Meta;

const SQUARE = {
  background: "blue",
  opacity: 0.5,
  bottom: 0,
  right: 0,
  width: 50,
  height: 50,
};

export const Base = () => (
  <div className="border relative p-20">
    <Decoration mobile={{ ...SQUARE }} />
  </div>
);

export const Offset = () => (
  <div className="border relative p-20">
    <Decoration
      mobile={{
        ...SQUARE,
        width: "auto",
        height: "auto",
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    />
  </div>
);

export const BreakpointsHidden = () => (
  <div className="flex flex-col gap-10">
    <div className="border relative p-20">
      mobile only
      <Decoration mobile={{ ...SQUARE }} tablet={{ hidden: true }} />
    </div>
    <div className="border relative p-20">
      tablet only
      <Decoration
        mobile={{ ...SQUARE, hidden: true }}
        tablet={{ hidden: false }}
        desktop={{ hidden: true }}
      />
    </div>
    <div className="border relative p-20">
      desktop only
      <Decoration
        mobile={{ ...SQUARE, hidden: true }}
        desktop={{ hidden: false }}
      />
    </div>
  </div>
);

export const Breakpoints = () => (
  <div className="border relative p-20">
    <Decoration
      mobile={{
        ...SQUARE,
        background: "red",
      }}
      tablet={{
        background: "green",
        bottom: "auto",
        top: 0,
      }}
      desktop={{
        background: "yellow",
        right: "auto",
        left: 0,
      }}
    />
  </div>
);

export const Image = () => (
  <div className="flex flex-col gap-10">
    cover image
    <div className="border relative p-20">
      <Decoration
        mobile={{
          width: "100%",
          bottom: 0,
          left: 0,
          image: { ...demoImage },
        }}
      />
    </div>
    small image
    <div className="border relative p-20">
      <Decoration
        mobile={{
          width: 200,
          top: 0,
          left: 0,
          image: { ...demoImage },
        }}
      />
    </div>
    mobile only
    <div className="border relative p-20">
      <Decoration
        mobile={{
          width: 200,
          top: 0,
          left: 0,
          image: { ...demoImage },
        }}
        tablet={{
          hidden: true,
        }}
      />
    </div>
    repeat
    <div className="border relative p-20">
      <Decoration
        mobile={{
          width: "100%",
          height: "100%",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          image: { ...demoImage },
          background: "red",
          repeat: true,
        }}
      />
    </div>
  </div>
);

export const HTML = () => (
  <div className="border relative p-20">
    <Decoration
      mobile={{
        ...SQUARE,
        right: 20,
        bottom: 20,
        width: 100,
        height: 100,
        html: `<div style="background: red; width: 100px; height: 100px; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"></div>`,
      }}
    />
  </div>
);

export const Background = () => (
  <div className="border relative p-20">
    <Decoration
      mobile={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background:
          "linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)",
      }}
    />
  </div>
);

export const Preset = () => (
  <>
    preset applies correctly when box is blue 50x50
    <div className="border relative p-20">
      <Decoration
        mobile={{ ...SQUARE }}
        preset={{
          mobile: {
            background: "red",
            width: 300,
            height: 300,
          },
        }}
      />
    </div>
    preset applies correctly when box is red 50x50
    <div className="border relative p-20">
      <Decoration
        preset={{
          mobile: {
            background: "red",
            width: 50,
            height: 50,
          },
        }}
      />
    </div>
    preset applies correctly when box is red 50x50 on desktop
    <div className="border relative p-20">
      <Decoration
        preset={{
          desktop: {
            background: "red",
            width: 50,
            height: 50,
          },
        }}
      />
    </div>
    preset applies correctly when box is red 50x50 on desktop
    <div className="border relative p-20">
      <Decoration
        mobile={{ ...SQUARE }}
        preset={{
          desktop: {
            background: "red",
            width: 50,
            height: 50,
            left: 0,
            top: 0,
            bottom: "auto",
            right: "auto",
            opacity: 1,
          },
        }}
      />
    </div>
  </>
);

export const Video = () => (
  <div className="border relative aspect-video">
    <Decoration
      mobile={{
        width: "100%",
        bottom: 0,
        left: 0,
        video: {
          provider: "mux",
          videoId: "uNbxnGLKJ00yfbijDO8COxTOyVKT01xpxW",
          frameless: true,
          autoPlay: true,
        },
      }}
    />
  </div>
);
