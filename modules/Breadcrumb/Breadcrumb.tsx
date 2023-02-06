import { Breadcrumb as BreadcrumbComponent } from "../../components/Breadcrumb/Breadcrumb";
import { FlatBreadcrumbType } from "../../components/Breadcrumb/breadcrumb.query";
import { BackgroundColorType } from "../../components/module/BackgroundOptions";
import { SpaceType } from "../../components/module/SpacingOptions";
import { WrapperProps } from "../../components/module/Wrapper";
import { ColorType } from "../../types";
import React, { ComponentType, lazy } from "react";

export type BreadcrumbProps = {
  theme?: {
    text?: ColorType;
    background?: BackgroundColorType;
    space?: SpaceType;
  };
  path?: FlatBreadcrumbType;
};

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

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
