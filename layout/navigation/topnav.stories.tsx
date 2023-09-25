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
    button: { label: "Product" },
    children: [
      {
        label: "Product 1",
        href: "/foo",
      },
      {
        label: "Product 2",
        href: "/foo",
      },
    ],
  },
  {
    button: {
      label: "Pricing",
      href: "/",
    },
  },
  {
    button: {
      label: "Solutions",
    },
    children: [
      {
        label: "Business cases",
        href: "/foo",
        current: true,
      },
      {
        label: "Industries",
        href: "/foo",
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
    href: "/login",
  },
];

export const Default = () => <TopNav items={items} buttons={buttons} />;

export const Landing = () => <TopNav items={[]} buttons={[]} />;

export const NavOutOfView = () => <TopNav items={[]} buttons={[]} />;
