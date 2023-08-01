import { demoImage } from "../../stories/content";
import { Decoration } from "./Decoration";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Decoration,
  title: "Components/Block/Decoration",
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
  </div>
);

export const HTML = () => (
  <div className="border relative p-20">
    <Decoration
      mobile={{
        ...SQUARE,
        right: 20,
        bottom: 20,
        html: `<div style="background: red; width: 50%; height: 50%; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"></div>`,
      }}
    />
  </div>
);
