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
        space: {
          top: theme?.space?.top || "sm",
          bottom: theme?.space?.bottom || "sm",
        },
      }}
      id="breadcrumb"
    >
      <BreadcrumbComponent path={path} />
    </Wrapper>
  );
};

export default React.memo(Breadcrumb);
