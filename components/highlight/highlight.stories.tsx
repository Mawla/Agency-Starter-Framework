import Highlight from "./Highlight";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Highlight,
  title: "Components/Highlight",
} as Meta;

export const Default = () => (
  <p>
    Hello hello{" "}
    <Highlight theme={{ text: "white", background: "black" }}>Hello</Highlight>{" "}
    Hello hello
  </p>
);
