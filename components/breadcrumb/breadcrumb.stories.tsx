import { DEMO_FLAT_BREADCRUMB } from "../../test/fixtures/breadcrumb";
import { Breadcrumb as BreadcrumbComponent } from "./Breadcrumb";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  title: "Components/Breadcrumb",
} as Meta;

export const Breadcrumb = () => {
  return <BreadcrumbComponent path={DEMO_FLAT_BREADCRUMB} />;
};

export const BreadcrumbLevel1 = () => {
  return <BreadcrumbComponent path={[DEMO_FLAT_BREADCRUMB[0]]} />;
};

BreadcrumbLevel1.story = {
  parameters: {
    nextRouter: {
      asPath: "/page1",
    },
  },
};

export const BreadcrumbLevel2 = () => {
  return <BreadcrumbComponent path={DEMO_FLAT_BREADCRUMB} />;
};

BreadcrumbLevel2.story = {
  parameters: {
    nextRouter: {
      asPath: "/page1/page2",
    },
  },
};
