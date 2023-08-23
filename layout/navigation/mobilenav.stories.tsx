import { ButtonProps } from "../../components/buttons/Button";
import { MobileNav } from "./MobileNav";
import { NavItem } from "./Navigation";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: MobileNav,
  title: "Components/MobileNav",
} as Meta;

const items: NavItem[] = [
  {
    button: { label: "Product" },
    children: [
      {
        label: "Product 1",
        href: "/",
      },
      {
        label: "Product 2",
        href: "/",
      },
    ],
  },
  {
    button: { label: "Solutions", href: "/" },
  },
  {
    button: { label: "Pricing" },
    children: [
      {
        label: "Business cases",
        href: "/",
        current: true,
      },
      {
        label: "Industries",
        href: "/",
      },
    ],
  },
  {
    button: { label: "Resources", href: "/" },
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
  <MobileNav items={items} buttons={buttons} open={true} />
);
