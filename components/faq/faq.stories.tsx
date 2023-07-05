import { FAQ, FAQProps } from "./FAQ";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: FAQ,
  title: "Components/FAQ",
} as Meta;

const DEMO_ITEMS: FAQProps["items"] = [
  {
    title: "What is the best thing about Switzerland?",
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
    title:
      "Did you hear about the mathematician who's afraid of negative numbers?",
    content: <p>He'll stop at nothing to avoid them!</p>,
  },
  {
    title: "Hear about the new restaurant called Karma?",
    content: <p>There's no menu: You get what you deserve.</p>,
  },
  {
    title: "Did you hear about the actor who fell through the floorboards?",
    content: <p>He was just going through a stage.</p>,
  },
  {
    title: "Did you hear about the claustrophobic astronaut?",
    content: <p>He just needed a little space.</p>,
  },
];

export const Default = () => <FAQ items={DEMO_ITEMS} />;

export const Colors = () => (
  <FAQ
    items={DEMO_ITEMS}
    theme={{
      title: "white",
      icon: "white",
      background: "black",
      divider: "white",
    }}
  />
);
