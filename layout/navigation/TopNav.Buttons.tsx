import Button from "../../components/buttons/Button";
import IconLoader from "../../components/images/IconLoader";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavigationProps } from "./Navigation";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "clsx";
import { Suspense } from "react";

export type TopNavButtonsProps = {
  buttons: NavigationProps["buttons"];
  theme?: NavigationProps["theme"];
  onHamburgerClick?: () => void;
  showHamburger?: boolean;
};

export const TopNavButtons = ({
  buttons,
  theme,
  onHamburgerClick,
  showHamburger,
}: TopNavButtonsProps) => {
  return (
    <Suspense>
      <RadixNavigationMenu.Root>
        <RadixNavigationMenu.List className="flex gap-2 xl:gap-4 items-center justify-end">
          <LanguageSwitch
            align="right"
            position="below"
            theme={{
              background: theme?.submenu?.background || "white",
            }}
          />

          {/* buttons */}
          {Boolean(buttons?.length) &&
            buttons?.map((button) => (
              <RadixNavigationMenu.Item
                key={button._key}
                className="hidden md:block"
              >
                <Button {...button} />
              </RadixNavigationMenu.Item>
            ))}

          {/* hamburger */}
          <RadixNavigationMenu.Item
            className={cx("lg:hidden ml-2 sm:-mr-3", {
              ["hidden"]: !showHamburger,
            })}
          >
            <button
              type="button"
              aria-label="Open navigation"
              onClick={onHamburgerClick}
              className="flex"
            >
              <span className="w-6 h-6 block relative">
                <IconLoader icon="menu" />

                <span className="absolute -inset-2 opacity-0" />
              </span>
            </button>
          </RadixNavigationMenu.Item>
        </RadixNavigationMenu.List>
      </RadixNavigationMenu.Root>
    </Suspense>
  );
};
