import { PricingTable } from "./PricingTable";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: PricingTable,
  title: "Components/PricingTable",
} as Meta;

export const Default = () => (
  <PricingTable
    features={[
      {
        _id: "1",
        title: "title",
        csv: "/storybook/pricing.csv",
      },
    ]}
  />
);
