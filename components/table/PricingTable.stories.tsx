import { PricingTable } from "./PricingTable";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: PricingTable,
  title: "Components/PricingTable",
} as Meta;

export const File = () => (
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

export const Text = () => (
  <PricingTable
    features={[
      {
        _id: "1",
        title: "title",
        csv: "Usage;Starter;Growth;Business;Enterprise\nEditors and admins;1;2;Custom;Contact us",
      },
    ]}
  />
);

export const TextTransforms = () => (
  <PricingTable
    features={[
      {
        _id: "1",
        title: "title",
        csv: ",,,,\ny,Y,yes,Yes,\nn,N,no,nO,\nx,X,,,",
      },
    ]}
  />
);

export const Tooltips = () => (
  <PricingTable
    features={[
      {
        _id: "1",
        title: "title",
        csv: `,
(i=tooltip),
(i=tooltip (text)),
(i=tooltip (more) (text)),
(i=(tooltip text)),
(i= tooltip),
(i= tooltip (text)),
(i= tooltip (more) (text)),
(i= (tooltip text)),
,
not supported,
(i=(brackets (within brackets))),
(i= (brackets (within brackets))),
(a=tooltip),
(i tooltip),
`,
      },
    ]}
  />
);
