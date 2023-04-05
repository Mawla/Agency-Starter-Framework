import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
} from "../../components/block/background.options";
import { Footer, FooterProps } from "./Footer";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Footer,
  title: "Components/Footer",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const socials: FooterProps["socials"] = [
  {
    label: "Facebook",
    icon: "external-link",
    href: "https://www.facebook.com",
  },
];

const links: FooterProps["links"] = [
  {
    title: "Product",
    items: [
      { label: "Product 1", href: "" },
      { label: "Product 2", href: "" },
      { label: "Pricing", href: "" },
      { label: "Solutions", href: "" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "" },
      { label: "Tutorials", href: "" },
      { label: "Support", href: "" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "" },
      { label: "Press Releases", href: "" },
      { label: "Careers", href: "" },
      { label: "Legal", href: "" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Contact us", href: "" },
      { label: "Log in", href: "" },
    ],
  },
];

const copyright = "© 2021";

export const Default = () => (
  <Footer
    socials={socials}
    links={links}
    copyright={copyright}
    legalLinks={links[0].items}
    legal="Legal text"
  />
);

export const Columns = () => (
  <>
    {[0, 1, 2, 3, 4].map((n) => (
      <Footer
        socials={socials}
        links={links.slice(0, n)}
        copyright={copyright}
      />
    ))}
  </>
);

export const Colors = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <div key={color} className="mb-10">
          <Footer socials={socials} links={links} copyright={copyright} />
        </div>
      ),
    )}
  </>
);
