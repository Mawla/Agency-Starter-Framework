import { ButtonProps } from "../../components/buttons/Button";
import { NavItem } from "./Navigation";
import { TopNav } from "./TopNav";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TopNav,
  title: "Components/TopNav",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const items: NavItem[] = [
  {
    label: "Product",
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
    label: "Pricing",
    href: "/",
  },
  {
    label: "Solutions",
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
    label: "Resources",
    href: "/",
  },
  {
    label: "Support",
    href: "/",
  },
];

const buttons: ButtonProps[] = [
  {
    label: "Download now",
    href: "/download",
  },
  {
    label: "Sign in",
    href: "/login",
  },
];

export const Default = () => <TopNav items={items} buttons={buttons} />;

export const Landing = () => <TopNav items={[]} buttons={[]} />;

export const NavOutOfView = () => (
  <TopNav items={[]} buttons={[]} showNav={false} />
);
