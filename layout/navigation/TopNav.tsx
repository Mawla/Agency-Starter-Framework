import { widthClasses } from "../../components/block/width.options";
import { backgroundClasses, borderClasses, textClasses } from "../../theme";
import { NavigationProps } from "./Navigation";
import { TopNavButtons } from "./TopNav.Buttons";
import { TopNavLogo } from "./TopNav.Logo";
import { TopNavMenu } from "./TopNav.Menu";
import cx from "classnames";
import React, { useRef } from "react";

export type TopNavProps = {
  showNav?: boolean;
  onHamburgerClick?: () => void;
} & NavigationProps;

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  (
    { items, buttons, showNav = true, onHamburgerClick, logo, theme },
    navRef,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    return (
      <div ref={wrapperRef} tabIndex={-1}>
        <div
          className={cx(
            "fixed z-50 top-0 left-0 right-0",
            "w-full",
            "transform transition-transform duration-500",
            !showNav &&
              "-translate-y-full ease-[cubic-bezier(0.2,0.07,0.38,1)]",
            theme?.block?.background &&
              backgroundClasses[theme?.block?.background],
            theme?.block?.text && textClasses[theme?.block?.text],
          )}
          ref={navRef}
        >
          <nav
            aria-label="main"
            data-aria-orientation="horizontal"
            dir="ltr"
            role="navigation"
            className={cx(
              "radix-topnav flex gap-6 items-center",
              "py-2 md:py-3 lg:py-4",
              "mx-auto",
              "px-5 sm:px-8 lg:px-8 xl:px-8",
              widthClasses.outer,
              theme?.block?.border && borderClasses[theme?.block?.border],
              theme?.block?.border && "border-b",
            )}
          >
            {logo && (
              <div className="flex items-center flex-0">
                <TopNavLogo logo={logo} />
              </div>
            )}

            <div className="flex-1">
              <TopNavMenu items={items} theme={theme} />
            </div>

            <div className="flex-0">
              <TopNavButtons
                buttons={buttons}
                onHamburgerClick={onHamburgerClick}
                showHamburger={
                  Boolean(items?.length) || !Boolean(buttons?.length)
                }
              />
            </div>
          </nav>
        </div>
      </div>
    );
  },
);
