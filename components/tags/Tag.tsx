import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "classnames";

export type TagProps = {
  label?: string;
  theme?: {
    color?: ColorType;
    background?: ColorType;
  };
};

export const Tag = ({ label, theme }: TagProps) => {
  if (!label) return null;

  return (
    <span
      className={cx(
        "text-xs font-semibold px-2 py-0.5 rounded",
        theme?.color ? textClasses[theme?.color] : "text-black/80",
        theme?.background
          ? backgroundClasses[theme?.background]
          : "bg-black/10",
      )}
    >
      {label}
    </span>
  );
};

export default Tag;
