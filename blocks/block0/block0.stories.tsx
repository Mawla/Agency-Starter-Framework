import { Block0 } from "./Block0";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block0,
  title: "Blocks/0. Code",
} as Meta;

export const Default = () => (
  <Block0
    bodyHTML={`<p class="bg-black text-white text-9xl">This should show a tailwind styled paragraph</p>`}
  />
);

export const WithoutWebsiteStyles = () => (
  <Block0
    bodyHTML={`<p>This should not include a tailwind config from the site, but be an object.</p><script>document.write(JSON.stringify(tailwind.config))</script>`}
    theme={{
      code: {
        removeWebsiteStyles: true,
      },
    }}
  />
);

export const WithoutTailwindCompiler = () => (
  <Block0
    bodyHTML={`<p>This should render as an unstyled paragraph and be undefined.</p><script>document.write(JSON.stringify(typeof tailwind))</script>`}
    theme={{
      code: {
        removeTailwindCompiler: true,
      },
    }}
  />
);
