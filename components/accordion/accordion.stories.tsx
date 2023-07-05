import { Accordion } from "./Accordion";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Accordion,
  title: "Components/Accordion",
} as Meta;

const DemoContent = (
  <>
    <p>
      Ulysses, Ulysses — Soaring through all the galaxies. In search of Earth,
      flying in to the night. Ulysses, Ulysses — Fighting evil and tyranny, with
      all his power, and with all of his might. Ulysses — no-one else can do the
      things you do. Ulysses — like a bolt of thunder from the blue. Ulysses —
      always fighting all the evil forces bringing peace and justice to all.
    </p>
    <p>
      <img
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80"
        alt=""
      />
    </p>
  </>
);

const items = [
  {
    title: "Simplify Navigation",
    content: DemoContent,
  },
  {
    title: "Preview Documents and Emails",
    content: DemoContent,
  },
  {
    title: "Find Documents and Emails Quickly",
    content: DemoContent,
  },
  {
    title: "Discover and Add Sites",
    content: DemoContent,
  },
  {
    title: "Open From SharePoint",
    content: DemoContent,
  },
];

export const Default = () => <Accordion items={items} />;
export const Colors = () => (
  <Accordion
    items={items}
    theme={{
      title: "white",
      icon: "white",
      background: "black",
      divider: "white",
    }}
  />
);
