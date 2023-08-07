import { isInternalLink } from "../../helpers/sitemap/isInternalLink";
import { LanguageType } from "../../languages";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  paddingXClasses,
  paddingYClasses,
  textClasses,
  weightClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  FontSizeType,
  FontType,
  FontWeightType,
  PaddingType,
} from "../../types";
import { IconLoaderProps } from "../images/IconLoader";
import { Spinner } from "../loaders/Spinner";
import { Link } from "./Link";
import { ButtonIconPositionType } from "./button.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () => import(/* webpackChunkName: "IconLoader" */ "../images/IconLoader"),
);

export type ButtonProps = {
  ariaLabel?: string;
  as?: "button" | "a" | "div" | "span" | "submit";
  href?: string;
  icon?: string;
  iconPosition?: ButtonIconPositionType;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  stretch?: boolean;
  target?: "_blank";
  disabled?: boolean;
  loading?: boolean;
  download?: boolean;
  hideLabel?: boolean;
  language?: LanguageType;

  theme?: {
    label?: {
      color?: ColorType;
      font?: FontType;
      size?: FontSizeType;
      uppercase?: boolean;
      weight?: FontWeightType;
    };
    background?: {
      color?: ColorType;
      paddingX?: PaddingType;
      paddingY?: PaddingType;
    };
    border?: {
      color?: ColorType;
      radius?: BorderRadiusType;
      width?: BorderWidthType;
    };
  };
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
  ariaLabel,
  as = "a",
  disabled = false,
  download = false,
  hideLabel = false,
  href,
  icon,
  iconPosition = "after",
  label = "",
  loading = false,
  onClick,
  stretch = false,
  target,
  theme,
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
          <IconLoader icon={icon} className="inline-block translate-y-1" />
          {wordAfter && ` ${wordAfter}`}
        </span>
      )
    : null;

  const sharedClasses = cx(
    theme?.background?.color && backgroundClasses[theme?.background?.color],
    theme?.label?.color && textClasses[theme?.label?.color],
    theme?.label?.weight && weightClasses[theme?.label?.weight],
    theme?.border?.color && borderClasses[theme?.border?.color],
    theme?.background?.paddingX && paddingXClasses[theme?.background?.paddingX],
    theme?.background?.paddingY && paddingYClasses[theme?.background?.paddingY],
    theme?.border?.radius && borderRadiusClasses[theme?.border?.radius],
    {
      ["btn"]: true,
      ["cursor-pointer"]: true,
      ["transition-colors duration-200"]: true,
      ["inline-flex items-center justify-center"]: !stretch,
      ["hover:underline focus:underline underline-offset-4 decoration-from-font"]:
        true,
      ["pointer-events-none opacity-75"]: disabled,
      ["uppercase"]: theme?.label?.uppercase,
    },
  );

  // icon only button
  if (!label?.trim().length) {
    return (
      <Element {...props} aria-label={ariaLabel || label} onClick={handleClick}>
        <span className={sharedClasses}>
          {ButtonIcon && <ButtonIcon />}
          {loading && <ButtonLoader />}
        </span>
      </Element>
    );
  }

  // icon + text button
  return (
    <Element {...props} aria-label={ariaLabel || label} onClick={handleClick}>
      <span
        className={cx(sharedClasses, {
          ["w-full flex"]: stretch,
        })}
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
