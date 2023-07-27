import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "classnames";

export type TagProps = {
  label?: string;
  href?: string;
  theme?: {
    color?: ColorType;
    background?: ColorType;
  };
};

export const Tag = ({ label, theme, href }: TagProps) => {
  if (!label) return null;

  const classes = cx(
    "text-xs font-semibold px-2 py-0.5 rounded",
    theme?.color ? textClasses[theme?.color] : "text-black/80",
    theme?.background ? backgroundClasses[theme?.background] : "bg-black/10",
  );

  if (href) {
    return (
      <a href={href} className={cx(classes, "hover:underline")}>
        {label}
      </a>
    );
  }

  return <span className={classes}>{label}</span>;
};

export default Tag;
