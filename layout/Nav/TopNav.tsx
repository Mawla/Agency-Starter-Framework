import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { PageContext } from "../../context/PageContext";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { NavProps } from "./Nav";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "classnames";
import React, { useContext, useRef } from "react";

export type TopNavProps = {
  showNav?: boolean;
  onHamburgerClick?: () => void;
  navHeight?: number;
} & NavProps;

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  ({ items, buttons, showNav = true, onHamburgerClick, navHeight }, navRef) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { language } = useContext(PageContext);

    return (
      <div ref={wrapperRef} tabIndex={-1}>
        <div
          className={cx(
            "fixed z-50 top-0 left-0 right-0",
            "w-full",
            "transform transition-transform duration-500",
            "bg-white/90 backdrop-blur-[25px]",
            {
              ["-translate-y-full ease-in-out-cubic"]: !showNav,
            }
          )}
          ref={navRef}
        >
          <RadixNavigationMenu.Root
            className={cx(
              "radix-topnav flex gap-6 items-center",
              "py-2 md:py-3 lg:py-4 xl:py-5",
              "max-w-outer mx-auto",
              "px-5 sm:px-8 lg:px-8 xl:px-8"
            )}
            role="navigation"
          >
            {/* logo */}
            <div className="flex-1">
              <Link
                href={`/${language}`}
                className="inline-block translate-y-2"
                aria-label="Homepage"
              >
                <Logo />
              </Link>
            </div>

            <div className="flex-1">
              {/* main menu */}
              {Boolean(items?.length) && (
                <RadixNavigationMenu.List className="hidden lg:flex justify-center">
                  {items?.map(
                    ({ label, href, children, current, language }) => {
                      const Element = Boolean(children?.length)
                        ? RadixNavigationMenu.Trigger
                        : "div";

                      return (
                        <RadixNavigationMenu.Item
                          key={label}
                          className="relative group"
                        >
                          <Element
                            className={cx(
                              "flex items-center gap-2",
                              "text-md text-neutral-base rounded-full font-bold",
                              "py-[10px] px-4",
                              "whitespace-nowrap",
                              "hover:bg-neutral-95 group-hover:bg-neutral-95 group-focus-within:bg-neutral-95",
                              {
                                ["bg-action-light text-action-base"]:
                                  current ||
                                  Boolean(
                                    children?.filter(({ current }) =>
                                      Boolean(current)
                                    ).length
                                  ),
                              }
                            )}
                          >
                            {href && (
                              <Link
                                href={href}
                                locale={language}
                                className="font-bold text-md hover:underline underline-offset-4"
                              >
                                {label}
                              </Link>
                            )}

                            {children && (
                              <IconLoader
                                icon="chevron"
                                className={cx(
                                  "w-3 h-3 text-inherit text-neutral-50",
                                  "hover:text-neutral-25 transition-colors duration-75",
                                  "group-hover:rotate-180 group-focus-within:rotate-180",
                                  "group-hover:text-action-base group-focus-within:text-action-base"
                                )}
                              />
                            )}
                          </Element>

                          {Boolean(children?.length) && (
                            <noscript>
                              <ul>
                                {children?.map(({ label, href, language }) => (
                                  <li key={label}>
                                    {href && (
                                      <Link href={href} locale={language}>
                                        {label}
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </noscript>
                          )}
                          {Boolean(children?.length) && (
                            <RadixNavigationMenu.Content
                              className={cx(
                                "w-[200px]",
                                "absolute bottom-0 left-1/2",
                                "translate-y-full -translate-x-1/2"
                              )}
                            >
                              <RadixNavigationMenu.List
                                className={cx(
                                  "translate-y-2 p-3",
                                  "shadow-[0_16px_32px_-4px_rgba(89,93,106,0.15)]",
                                  "bg-white border-2 border-neutral-85 rounded-md"
                                )}
                              >
                                {children?.map(
                                  ({ label, current, href, language }) => (
                                    <RadixNavigationMenu.Item key={label}>
                                      {href && (
                                        <Link
                                          href={href}
                                          locale={language}
                                          className={cx(
                                            "bg-white hover:bg-neutral-95 flex transition-colors",
                                            "text-neutral-base",
                                            "text-md",
                                            "p-3 rounded-xs",
                                            {
                                              ["font-bold bg-action-light hover:bg-action-light text-action-base"]:
                                                current,
                                            }
                                          )}
                                        >
                                          {label}
                                        </Link>
                                      )}
                                    </RadixNavigationMenu.Item>
                                  )
                                )}
                              </RadixNavigationMenu.List>
                            </RadixNavigationMenu.Content>
                          )}
                        </RadixNavigationMenu.Item>
                      );
                    }
                  )}
                </RadixNavigationMenu.List>
              )}
            </div>

            {/* buttons */}
            <div className="flex-1">
              <RadixNavigationMenu.List className="flex gap-2 xl:gap-4 items-center justify-end">
                {/* language */}
                <LanguageSwitch align="right" />

                {/* buttons */}
                {Boolean(buttons?.length) &&
                  buttons?.map((button) => (
                    <RadixNavigationMenu.Item
                      key={button.label}
                      className="hidden md:block"
                    >
                      {button.href && (
                        <Link
                          href={button.href}
                          locale={button.language}
                          className={cx(
                            "bg-action-base",
                            "hover:underline underline-offset-4",
                            "flex items-center gap-2",
                            "text-white rounded-full text-md font-bold",
                            "py-[10px] pl-4 pr-3",
                            "whitespace-nowrap"
                          )}
                        >
                          <span>{button.label}</span>
                          <IconLoader
                            icon={button.icon}
                            className="inline text-current transform -translate-y-px w-4 h-4"
                          />
                        </Link>
                      )}
                    </RadixNavigationMenu.Item>
                  ))}

                {/* hamburger */}
                <RadixNavigationMenu.Item
                  className={cx("lg:hidden ml-2 sm:-mr-3", {
                    ["hidden"]:
                      !Boolean(items?.length) && !Boolean(buttons?.length),
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
                      <span className="absolute -inset-2 bg-white opacity-0" />
                    </span>
                  </button>
                </RadixNavigationMenu.Item>
              </RadixNavigationMenu.List>
            </div>
          </RadixNavigationMenu.Root>
        </div>
      </div>
    );
  }
);
