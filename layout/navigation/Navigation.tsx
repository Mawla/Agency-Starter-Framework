import { WidthType } from "../../components/block/width.options";
import { ButtonProps } from "../../components/buttons/Button";
import { BREAKPOINTS, useBreakpoint } from "../../hooks/useBreakpoint";
import { ColorType, ImageType } from "../../types";
import { MobileNav } from "./MobileNav";
import {
  NavigationBreadcrumb,
  NavigationBreadcrumbProps,
} from "./Navigation.Breadcrumb";
import { TopNav } from "./TopNav";
import { TopNavBannerProps } from "./TopNav.Banner";
import { AlignType } from "./navigation.options";
import React, { Suspense, useState } from "react";

export type NavItem = {
  _key?: string;
  button?: ButtonProps & { current?: boolean };
  current?: boolean;
  children?: (ButtonProps & { current?: boolean; _key?: string })[];
};

export type NavigationProps = {
  items?: NavItem[];
  buttons?: (ButtonProps & { _key?: string })[];
  logo?: {
    mobile?: ImageType;
    desktop?: ImageType;
  };
  banner?: TopNavBannerProps;
  theme?: {
    block?: {
      background?: ColorType;
      text?: ColorType;
      border?: ColorType;
      width?: WidthType;
    };
    menu?: {
      align?: AlignType;
    };
    submenu?: {
      background?: ColorType;
    };
    breadcrumb?: NavigationBreadcrumbProps["theme"];
    banner?: TopNavBannerProps["theme"];
  };
};

export const Navigation = ({
  items,
  buttons,
  logo,
  banner,
  theme,
}: NavigationProps) => {
  const { screenWidth } = useBreakpoint();
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);

  const onHamburgerClick = () => {
    setMobileNavIsOpen(true);
  };

  return (
    <div>
      <TopNav
        items={items}
        buttons={buttons}
        onHamburgerClick={onHamburgerClick}
        logo={logo}
        theme={theme}
        banner={banner}
      />
      {screenWidth < BREAKPOINTS.lg && (
        <MobileNav
          items={items}
          buttons={buttons}
          open={mobileNavIsOpen}
          onOpenChange={setMobileNavIsOpen}
          theme={theme}
        />
      )}
      {theme?.breadcrumb?.hidden !== true && (
        <Suspense>
          <NavigationBreadcrumb theme={theme?.breadcrumb} />
        </Suspense>
      )}
    </div>
  );
};
