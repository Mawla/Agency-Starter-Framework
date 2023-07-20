import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import {
  backgroundClasses,
  borderClasses,
  textClasses,
  weightClasses,
} from "../../theme";
import { IconLoaderProps } from "../images/IconLoader";
import { Spinner } from "../loaders/Spinner";
import { Link } from "./Link";
import {
  ButtonAlignType,
  ButtonSizeType,
  ButtonIconPositionType,
  ButtonWeightType,
  ButtonTextColorType,
  BackgroundColorType,
  ButtonBorderColorType,
  buttonSizeClasses,
  buttonAlignClasses,
  buttonSpaceClasses,
  buttonIconOnlySizeClasses,
  buttonIconSizeClasses,
} from "./button.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

export type ButtonProps = {
  align?: ButtonAlignType;
  ariaLabel?: string;
  as?: "button" | "a" | "div" | "span" | "submit";
  compact?: boolean;
  href?: string;
  icon?: string;
  iconPosition?: ButtonIconPositionType;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  plain?: boolean;
  round?: boolean;
  size?: ButtonSizeType;
  stretch?: boolean;
  target?: "_blank";
  theme?: {
    text?: { color?: ButtonTextColorType };
    background?: { color?: BackgroundColorType };
    border?: { color?: ButtonBorderColorType };
  };
  disabled?: boolean;
  loading?: boolean;
  weight?: ButtonWeightType;
  download?: boolean;
  hideLabel?: boolean;
  language?: LanguageType;
};

export const Button = (props: ButtonProps) => {
  if (props.href && isInternalLink(props.href)) {
    return (
      <Link href={props.href} locale={props.language} showExternalIcon={false}>
        <ButtonInner {...props} as="span" />
      </Link>
    );
  }

  return <ButtonInner {...props} />;
};

const ButtonInner = ({
  align = "center",
  ariaLabel,
  as = "a",
  compact = false,
  disabled = false,
  download = false,
  hideLabel = false,
  href,
  icon,
  iconPosition = "after",
  label = "",
  loading = false,
  onClick,
  plain = false,
  round = true,
  size = "md",
  stretch = false,
  target,
  theme,
  weight = "medium",
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
    icon = "externallink";
    iconPosition = "after";
  }

  if (hideLabel) {
    ariaLabel = label;
    props.title = label;
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

  const handleClick = (e: React.MouseEvent) =>
    disabled ? () => {} : onClick ? onClick(e) : () => {};

  const ButtonIcon = icon
    ? ({
        wordBefore,
        wordAfter,
      }: {
        wordBefore?: string;
        wordAfter?: string;
      }) => (
        <span className=" whitespace-nowrap break-all">
          {wordBefore && ` ${wordBefore} `}
          <IconLoader
            icon={icon}
            className={cx(
              "inline-block translate-y-1",
              buttonIconSizeClasses[size],
            )}
          />
          {wordAfter && ` ${wordAfter}`}
        </span>
      )
    : null;

  const sharedClasses = {
    ["cursor-pointer"]: true,
    ["border"]: true,
    ["transition-colors duration-200"]: true,
    ["rounded-full"]: round,
    [backgroundClasses[theme?.background?.color || "white"]]: true,
    [borderClasses[
      theme?.border?.color || theme?.background?.color || "white"
    ]]: true,
    [textClasses[theme?.text?.color || "black"]]: true,
    ["inline-flex items-center justify-center"]: !stretch,
    ["bg-opacity-0 border-opacity-0"]: plain,
    ["hover:bg-opacity-0 focus:bg-opacity-0"]: plain,
    ["hover:underline focus:underline underline-offset-4 decoration-from-font"]:
      true,
    ["pointer-events-none opacity-75"]: disabled,
    [weightClasses[weight]]: true,
  };

  // icon only button
  if (!label?.trim().length) {
    return (
      <Element
        {...props}
        aria-label={ariaLabel || label}
        onClick={handleClick}
        className="btn"
      >
        <span
          className={cx(sharedClasses, {
            [buttonIconOnlySizeClasses[size]]: !compact,
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
    <Element
      {...props}
      aria-label={ariaLabel || label}
      onClick={handleClick}
      className="btn"
    >
      <span
        className={cx(
          sharedClasses,
          buttonSizeClasses[size],
          buttonAlignClasses[align],
          { ["w-full flex"]: stretch },
          { ["rounded-full"]: round },
          { [buttonSpaceClasses[size]]: !compact },
        )}
      >
        <span className="no-underline text-left break-words">
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

export default React.memo(Button);
