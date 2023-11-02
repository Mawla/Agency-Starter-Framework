import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "clsx";

export type HighlightProps = {
  theme?: {
    text?: ColorType;
    background?: ColorType;
  };
  children: React.ReactNode;
};

export const Highlight = ({ theme, children }: HighlightProps) => (
  <span
    className={cx(
      theme?.text && textClasses[theme?.text],
      theme?.background && backgroundClasses[theme?.background],
      {
        ["box-decoration-slice px-1"]: theme?.background,
      },
    )}
  >
    {children}
  </span>
);

export default Highlight;
