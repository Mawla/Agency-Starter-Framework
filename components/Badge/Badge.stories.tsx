import { Meta } from "@storybook/react";
import React from "react";

import { Badge, VARIANT_OPTIONS, VariantType } from "./Badge";

export default {
  component: Badge,
  title: "Components/Badge",
} as Meta;

export const Default = () => <Badge label="badge" />;

export const Variants = () => (
  <>
    {(Object.keys(VARIANT_OPTIONS) as any).map((variant: VariantType) => (
      <div key={variant} className="mb-10">
        <Badge variant={variant} label={variant} />
        <Badge variant={variant} label={variant + ", alt"} alt />
      </div>
    ))}
  </>
);
