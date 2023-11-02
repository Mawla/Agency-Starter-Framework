import { widthClasses } from "../../components/block/width.options";
import { backgroundClasses, borderClasses, textClasses } from "../../theme";
import { NavigationProps } from "./Navigation";
import { TopNavBanner } from "./TopNav.Banner";
import { TopNavButtons } from "./TopNav.Buttons";
import { TopNavLogo } from "./TopNav.Logo";
import { TopNavMenu } from "./TopNav.Menu";
import cx from "clsx";
import React, { useRef } from "react";

export type TopNavProps = {
  onHamburgerClick?: () => void;
} & NavigationProps;

export const TopNav = ({
  items,
  buttons,
  onHamburgerClick,
  logo,
  banner,
  theme,
}: TopNavProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} tabIndex={-1}>
      <div
        className={cx(
          "w-full relative z-50",
          theme?.block?.background &&
            backgroundClasses[theme?.block?.background],
          theme?.block?.text && textClasses[theme?.block?.text],
        )}
      >
        <TopNavBanner
          theme={{
            ...theme?.banner,
            width: theme?.block?.width,
          }}
          {...banner}
        />

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
            widthClasses[theme?.block?.width || "inner"],
            theme?.block?.border && borderClasses[theme?.block?.border],
            theme?.block?.border && "border-b",
          )}
        >
          {logo && (
            <div className="flex items-center flex-0 shrink-0">
              <TopNavLogo logo={logo} />
            </div>
          )}

          <div className="flex-1">
            <TopNavMenu items={items} theme={theme} />
          </div>

          <div
            className={cx("flex-0", {
              ["lg:hidden"]: !Boolean(buttons?.length),
            })}
          >
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
};
