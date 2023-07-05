import { Accordion, AccordionProps } from "./Accordion";
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

const DEMO_ITEMS: AccordionProps["items"] = [
  {
    title: "Simplify Navigation",
    content: [
      {
        _key: "1bc91c6df8b3",
        _type: "block",
        children: [
          {
            _key: "9dc1274a39d5",
            _type: "span",
            marks: [],
            text: "We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
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

export const Default = () => <Accordion items={DEMO_ITEMS} />;

export const Colors = () => (
  <Accordion
    items={DEMO_ITEMS}
    theme={{
      title: "white",
      icon: "white",
      background: "black",
      divider: "white",
    }}
  />
);
