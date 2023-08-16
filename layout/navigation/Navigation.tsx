import { ButtonProps } from "../../components/buttons/Button";
import { BREAKPOINTS, useBreakpoint } from "../../hooks/useBreakpoint";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { ColorType, ImageType } from "../../types";
import { MobileNav } from "./MobileNav";
import { TopNav } from "./TopNav";
import { AlignType } from "./navigation.options";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";

export type NavItem = {
  _key?: string;
  button?: ButtonProps & { current?: boolean };
  current?: boolean;
  children?: (ButtonProps & { current?: boolean; _key?: string })[];
};

export type NavigationProps = {
  items: NavItem[];
  buttons: (ButtonProps & { _key?: string })[];
  logo?: { mobile?: ImageType; desktop?: ImageType };
  theme?: {
    block?: {
      background?: ColorType;
      text?: ColorType;
      border?: ColorType;
    };
    menu?: {
      align?: AlignType;
    };
    submenu?: {
      background?: ColorType;
    };
  };
};

export const Navigation = ({
  items,
  buttons,
  logo,
  theme,
}: NavigationProps) => {
  const { screenWidth, breakpoint } = useBreakpoint();
  const scrollDirection = useScrollDirection();
  const scrollPosition = useScrollPosition();
  const showNav = scrollDirection === "up" || scrollPosition !== "middle";

  const navRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState<number>(70);

  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);

  /**
   * Measure nav and create a spacer of equal height
   */

  useEffect(() => {
    if (!navRef.current) return;
    const navHeight = navRef.current.getBoundingClientRect().height;
    setSpacerHeight(navHeight);
  }, [navRef.current, breakpoint]);

  const onHamburgerClick = () => {
    setMobileNavIsOpen(true);
  };

  useEffect(() => {
    function onRouteChange() {
      setMobileNavIsOpen(false);
    }

    router.events.on("routeChangeStart", onRouteChange);
    () => router.events.off("routeChangeStart", onRouteChange);
  }, []);

  return (
    <div>
      <div style={{ height: spacerHeight }} className="invisible" />

      <TopNav
        items={items}
        buttons={buttons}
        onHamburgerClick={onHamburgerClick}
        showNav={showNav}
        ref={navRef}
        navHeight={spacerHeight}
        logo={logo}
        theme={theme}
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
    </div>
  );
};
