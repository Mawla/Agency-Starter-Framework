import { ButtonProps } from "../../components/buttons/Button";
import { demoImage, demoImage2 } from "../../stories/content";
import { Navigation, NavItem } from "./Navigation";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Navigation,
  title: "Components/Navigation",
} as Meta;

const items: NavItem[] = [
  {
    button: { label: "Product" },
    children: [
      {
        label: "Product 1",
        href: "",
      },
      {
        label: "Product 2",
        href: "",
      },
    ],
  },
  {
    button: { label: "Pricing", href: "/" },
  },
  {
    button: { label: "Solutions" },
    children: [
      {
        label: "Business cases",
        href: "",
        current: true,
      },
      {
        label: "Industries",
        href: "",
      },
    ],
  },
  {
    button: {
      label: "Resources",
      href: "/",
    },
  },
  {
    button: {
      label: "Support",
      href: "/",
    },
  },
];

const buttons: ButtonProps[] = [
  {
    label: "Download now",
    href: "/download",
  },
  {
    label: "Sign in",
    href: "/",
  },
];

export const Default = () => (
  <Navigation
    items={items}
    buttons={buttons}
    logo={{
      mobile: { ...demoImage, width: 100 },
      desktop: { ...demoImage, width: 100 },
    }}
  />
);

export const ScrollBehavior = () => (
  <div>
    <Navigation items={items} buttons={buttons} />
    <div style={{ height: "50vh" }} className="bg-gray-100" />
    <div style={{ height: "50vh" }} className="bg-white" />
    <div style={{ height: "50vh" }} className="bg-gray-500" />
    <div style={{ height: "50vh" }} className="bg-white" />
    <div style={{ height: "50vh" }} className="bg-gray-500" />
    <div style={{ height: "50vh" }} className="bg-white" />
    <div style={{ height: "50vh" }} className="bg-gray-500" />
    <div style={{ height: "50vh" }} className="bg-white" />
    <div style={{ height: "50vh" }} className="bg-gray-100" />
  </div>
);

export const Theme = () => (
  <div className="flex flex-col gap-10">
    <Navigation
      items={items}
      buttons={buttons}
      logo={{
        mobile: { ...demoImage, width: 100 },
        desktop: { ...demoImage, width: 100 },
      }}
      theme={{
        block: {
          background: "black",
          text: "white",
          border: "white",
        },
        menu: {
          align: "right",
        },
        submenu: {
          background: "black",
        },
      }}
    />
  </div>
);
