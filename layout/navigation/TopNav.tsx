import { widthClasses } from "../../components/block/width.options";
import { Link } from "../../components/buttons/Link";
import { IconLoaderProps } from "../../components/images/IconLoader";
import { SimpleImageProps } from "../../components/images/SimpleImage";
import { PageContext } from "../../context/PageContext";
import { backgroundClasses, borderClasses, textClasses } from "../../theme";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavigationProps } from "./Navigation";
import { AlignType } from "./navigation.options";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import cx from "classnames";
import React, { ComponentType, lazy, useContext, useRef } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

const SimpleImage = lazy<ComponentType<SimpleImageProps>>(
  () =>
    import(
      /* webpackChunkName: "SimpleImage" */ "../../components/images/SimpleImage"
    ),
);

export type TopNavProps = {
  showNav?: boolean;
  onHamburgerClick?: () => void;
  navHeight?: number;
} & NavigationProps;

const alignClasses: Record<AlignType, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  (
    { items, buttons, showNav = true, onHamburgerClick, logo, theme },
    navRef,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { language } = useContext(PageContext);

    return (
      <div ref={wrapperRef} tabIndex={-1}>
        <div
          className={cx(
            "fixed z-50 top-0 left-0 right-0",
            "w-full",
            "transform transition-transform duration-500",
            // "bg-opacity-90 backdrop-blur-[25px]",
            {
              ["-translate-y-full ease-[cubic-bezier(0.2,0.07,0.38,1)]"]:
                !showNav,
            },
            theme?.block?.background &&
              backgroundClasses[theme?.block?.background],
            theme?.block?.text && textClasses[theme?.block?.text],
          )}
          ref={navRef}
        >
          <RadixNavigationMenu.Root
            className={cx(
              "radix-topnav flex gap-6 items-center",
              "py-2 md:py-3 lg:py-4",
              "mx-auto",
              "px-5 sm:px-8 lg:px-8 xl:px-8",

              widthClasses.outer,
              theme?.block?.border && borderClasses[theme?.block?.border],
              {
                ["border-b"]: theme?.block?.border,
              },
            )}
            role="navigation"
          >
            {/* logo */}
            {logo && (
              <div className="flex items-center flex-0">
                <Link href={`/${language}`} className="inline-block relative">
                  <span className="sr-only">Home</span>
                  {logo?.mobile && (
                    <div className="sm:hidden relative">
                      <SimpleImage {...logo?.mobile} />
                    </div>
                  )}
                  {logo?.desktop && (
                    <div className="hidden sm:block relative">
                      <SimpleImage {...logo?.desktop} />
                    </div>
                  )}
                </Link>
              </div>
            )}

            <div className="flex-1">
              {/* main menu */}
              {Boolean(items?.length) && (
                <RadixNavigationMenu.List
                  className={cx(
                    "hidden lg:flex gap-px",
                    alignClasses[theme?.menu?.align || "center"],
                  )}
                >
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
                              "text-md rounded-xs",
                              "py-[6px] px-3",
                              "whitespace-nowrap",
                              "hover:underline group-hover:underline group-focus-within:underline underline-offset-4",
                              theme?.menu?.text &&
                                textClasses[theme?.menu?.text],
                              {
                                ["underline"]:
                                  current ||
                                  Boolean(
                                    children?.filter(({ current }) =>
                                      Boolean(current),
                                    ).length,
                                  ),
                              },
                            )}
                          >
                            {href ? (
                              <Link href={href} locale={language}>
                                {label}
                              </Link>
                            ) : (
                              <span className="">{label}</span>
                            )}

                            {Boolean(children?.length) && (
                              <IconLoader
                                icon="chevrondown"
                                className={cx(
                                  "w-4 h-4",
                                  "ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-150",
                                  "group-hover:rotate-180 group-focus-within:rotate-180",
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

                          {/* submenu */}
                          {Boolean(children?.length) && (
                            <RadixNavigationMenu.Content
                              className={cx(
                                "w-[200px]",
                                "absolute bottom-0 left-1/2",
                                "translate-y-full -translate-x-1/2",
                              )}
                            >
                              <RadixNavigationMenu.List
                                className={cx(
                                  "translate-y-2 p-1 shadow-[0_16px_32px_-4px_rgba(89,93,106,0.15)] rounded-md",
                                  theme?.submenu?.background
                                    ? backgroundClasses[
                                        theme?.submenu?.background
                                      ]
                                    : "bg-white border border-black/10",
                                  theme?.submenu?.text &&
                                    textClasses[theme?.submenu?.text],
                                )}
                              >
                                {children?.map(
                                  ({ label, current, href, language }) => (
                                    <RadixNavigationMenu.Item key={label}>
                                      <span className="block p-3">
                                        {href ? (
                                          <Link
                                            href={href}
                                            locale={language}
                                            className={cx(
                                              "flex transition-colors hover:underline",
                                              {
                                                ["font-bold"]: current,
                                              },
                                            )}
                                          >
                                            {label}
                                          </Link>
                                        ) : (
                                          label
                                        )}
                                      </span>
                                    </RadixNavigationMenu.Item>
                                  ),
                                )}
                              </RadixNavigationMenu.List>
                            </RadixNavigationMenu.Content>
                          )}
                        </RadixNavigationMenu.Item>
                      );
                    },
                  )}
                </RadixNavigationMenu.List>
              )}
            </div>

            {/* buttons */}
            <div className="flex-0">
              <RadixNavigationMenu.List className="flex gap-2 xl:gap-4 items-center justify-end">
                <LanguageSwitch
                  align="right"
                  position="below"
                  theme={{
                    background: theme?.submenu?.background || "white",
                    text: theme?.submenu?.text,
                  }}
                />

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
                            "hover:underline underline-offset-4",
                            "flex items-center gap-2",
                            "text-md",
                            "whitespace-nowrap font-medium",
                            theme?.buttons?.background &&
                              backgroundClasses[theme?.buttons?.background],
                            theme?.buttons?.text &&
                              textClasses[theme?.buttons?.text],
                            {
                              ["py-[10px] pl-4 pr-3 rounded-full"]:
                                theme?.buttons?.background,
                            },
                          )}
                        >
                          <span>{button.label}</span>
                          <IconLoader
                            icon={button.theme?.icon?.name}
                            className="inline transform -translate-y-px w-4 h-4"
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
                      <span className="absolute -inset-2 opacity-0" />
                    </span>
                  </button>
                </RadixNavigationMenu.Item>
              </RadixNavigationMenu.List>
            </div>
          </RadixNavigationMenu.Root>
        </div>
      </div>
    );
  },
);
