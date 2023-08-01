import { demoImage } from "../../stories/content";
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
    icon: "externallink",
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
    info="info text"
    logo={{
      mobile: { ...demoImage, width: 100 },
      desktop: { ...demoImage, width: 100 },
    }}
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

export const Theme = () => (
  <div className="flex flex-col gap-10">
    <Footer
      socials={socials}
      links={links}
      copyright={copyright}
      theme={{
        block: {
          background: "white",
          text: "black",
        },
      }}
    />
    <Footer
      socials={socials}
      links={links}
      copyright={copyright}
      theme={{
        block: {
          background: "black",
          text: "white",
        },
      }}
    />
  </div>
);
