import cx from "classnames";

export const VARIANT_OPTIONS = {
  brand: "Brand",
  action: "Action",
  success: "Success",
  alert: "Alert",
  neutral: "Neutral",
  ghost: "Ghost",
  white: "white",
  "neutral-gradient": "Neutral gradient",
  "brand-gradient": "Brand gradient",
};

export type VariantType = keyof typeof VARIANT_OPTIONS;

const variantClasses: Record<VariantType, string> = {
  brand: "pyxis-badge-brand",
  action: "pyxis-badge-action",
  success: "pyxis-badge-success",
  alert: "pyxis-badge-alert",
  neutral: "pyxis-badge-neutral",
  ghost: "pyxis-badge-ghost",
  white: "pyxis-badge-white",
  "neutral-gradient": "pyxis-badge-neutral-gradient",
  "brand-gradient": "pyxis-badge-brand-gradient",
};

type BadgeProps = {
  label?: string;
  className?: string;
  variant?: VariantType;
  alt?: boolean;
};

export const Badge = ({ variant, label, alt, className }: BadgeProps) => (
  <span
    className={cx(
      "pyxis-badge",
      variant && variantClasses[variant],
      {
        ["pyxis-badge-alt"]: alt,
      },
      className
    )}
  >
    {label}
  </span>
);
