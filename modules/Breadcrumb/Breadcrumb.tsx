import { Breadcrumb as BreadcrumbComponent } from "../../components/Breadcrumb/Breadcrumb";
import { BackgroundColorType } from "../../components/module/BackgroundOptions";
import { SpaceType } from "../../components/module/SpacingOptions";
import { Wrapper } from "../../components/module/Wrapper";
import { FlatBreadcrumbType } from "../../queries/breadcrumb";
import { ColorType } from "../../types";
import React from "react";

export type BreadcrumbProps = {
  theme?: {
    text?: ColorType;
    background?: BackgroundColorType;
    space?: SpaceType;
  };
  path?: FlatBreadcrumbType;
};

export const Breadcrumb = ({ theme, path }: BreadcrumbProps) => {
  return (
    <Wrapper
      theme={{
        ...theme,
        width: "full",
        space: {
          top: theme?.space?.top || "none",
          bottom: theme?.space?.bottom || "none",
        },
      }}
      id="breadcrumb"
      innerClassName="py-10"
    >
      <BreadcrumbComponent path={path} />
    </Wrapper>
  );
};

export default React.memo(Breadcrumb);
