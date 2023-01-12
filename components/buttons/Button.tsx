import cx from "classnames";
import React from "react";

import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import { IconType } from "../../types";
import { IconLoader } from "../images/IconLoader";
import { Spinner } from "../loaders/Spinner";
import { SizeType, IconPositionType, VariantType } from "./ButtonOptions";
import { Link } from "./Link";

export type ButtonProps = {
  ariaLabel?: string;
  as?: "button" | "a" | "div" | "span" | "submit";
  compact?: boolean;
  disabled?: boolean;
  download?: boolean;
  hideLabel?: boolean;
  href?: string;
  icon?: IconType;
  iconPosition?: IconPositionType;
  label?: string;
  language?: LanguageType;
  loading?: boolean;
  size?: SizeType;
  stretch?: boolean;
  target?: "_blank";
  variant?: VariantType;
  alt?: boolean;
};

const variantClasses: Record<VariantType, string> = {
  primary: "pyxis-btn-primary",
  secondary: "pyxis-btn-secondary",
  tertiary: "pyxis-btn-tertiary",
  brand: "pyxis-btn-brand",
  ghost: "pyxis-btn-ghost",
  white: "pyxis-btn-white",
};

const sizeClasses: Record<SizeType, string> = {
  sm: "pyxis-btn-small",
  md: "pyxis-btn-medium",
  lg: "pyxis-btn-large",
  xl: "pyxis-btn-huge",
};

const iconSizeClasses: Record<SizeType, string> = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-4 h-4",
  xl: "w-4 h-4",
};

const iconOnlySizeClasses: Record<SizeType, string> = {
  sm: "w-10 h-10 md:w-10 md:h-10",
  md: "w-10 h-10 md:w-11 md:h-11",
  lg: "w-10 h-10 md:w-11 md:h-11",
  xl: "w-10 h-10 md:w-11 md:h-11",
};

export const Button = (props: ButtonProps) => {
  if (props.href && isInternalLink(props.href)) {
    return (
      <Link href={props.href} locale={props.language}>
        <ButtonInner {...props} as="span" />
      </Link>
    );
  }

  return <ButtonInner {...props} />;
};

export const ButtonMemo = React.memo(Button);

const ButtonInner = ({
  as = "a",
  label = "",
  href,
  target,
  variant = "primary",
  size = "lg",
  icon,
  iconPosition = "after",
  compact = false,
  ariaLabel,
  disabled = false,
  loading = false,
  download = false,
  hideLabel = false,
  stretch = false,
  alt = false,
}: ButtonProps) => {
  const Element = as === "submit" ? "button" : as;
  const props: {
    type?: "button" | "reset" | "submit" | undefined;
    href?: string | undefined;
    target?: string | undefined;
    download?: boolean | null;
    title?: string | undefined;
    disabled?: boolean;
  } = {};

  if (target === "_blank") {
    icon = "external-link";
    iconPosition = "after";
  }

  if (hideLabel) {
    ariaLabel = props.title = label;
    label = "";
  }

  label = label || "";
  iconPosition = iconPosition || "after";

  // prevent orphan icon by adding first / last word to icon
  const labelWords = label?.split(" ");

  if (as === "button") {
    props.type = "button";
  }

  if (as === "submit") {
    props.type = "button";
  }

  if (as === "a") {
    props.href = href;
    props.target = target;
  }

  if (download) {
    props.download = true;
    if (props.href && props.href?.indexOf(".sanity.io") > -1)
      props.href = `${props.href}?dl`;
  }

  if (disabled) {
    props.disabled = true;
  }

  const ButtonIcon = icon
    ? ({
        wordBefore,
        wordAfter,
      }: {
        wordBefore?: string;
        wordAfter?: string;
      }) => (
        <span className="whitespace-nowrap break-all">
          {wordBefore && ` ${wordBefore}`}
          <span
            className={cx("inline text-current", iconSizeClasses[size], {
              ["mr-2"]: wordAfter,
              ["ml-2"]: wordBefore,
            })}
          >
            <IconLoader
              icon={icon}
              className={cx(
                "inline-block translate-y-1",
                iconSizeClasses[size]
              )}
            />
          </span>
          {wordAfter && `${wordAfter} `}
        </span>
      )
    : null;

  const sharedClasses = {
    ["pyxis-btn"]: true,
    [sizeClasses[size]]: true,
    [variantClasses[variant]]: true,
    ["pyxis-btn-alt"]: alt,
    ["inline-flex items-center justify-center"]: !stretch,
  };

  // icon only button
  if (!label?.trim().length) {
    return (
      <Element {...props} aria-label={ariaLabel || label}>
        <span
          className={cx(sharedClasses, {
            [iconOnlySizeClasses[size]]: !compact,
          })}
        >
          {ButtonIcon && <ButtonIcon />}
          {loading && <ButtonLoader />}
        </span>
      </Element>
    );
  }

  // icon + text button
  return (
    <Element {...props} aria-label={ariaLabel || label}>
      <span
        className={cx(sharedClasses, sizeClasses[size], {
          ["w-full flex"]: stretch,
        })}
      >
        <span className="text-left break-words">
          {ButtonIcon ? (
            <>
              {ButtonIcon && iconPosition === "before" && (
                <ButtonIcon wordAfter={labelWords[0]} />
              )}
              {iconPosition === "before"
                ? labelWords.slice(1).join(" ")
                : labelWords.slice(0, -1).join(" ")}
              {ButtonIcon && iconPosition === "after" && (
                <ButtonIcon wordBefore={labelWords[labelWords.length - 1]} />
              )}
              {loading && <ButtonLoader />}
            </>
          ) : (
            <span className="flex">
              {label}
              {loading && <ButtonLoader />}
            </span>
          )}
        </span>
      </span>
    </Element>
  );
};

const ButtonLoader = () => (
  <span className="h-5 w-5 inline-flex self-center align-middle ml-2 -mb-1">
    <Spinner />
  </span>
);
