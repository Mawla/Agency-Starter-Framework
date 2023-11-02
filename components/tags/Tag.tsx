import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "clsx";

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
    "text-xs font-semibold px-2 py-0.5 relative rounded",
    theme?.color && textClasses[theme?.color],
    theme?.background && backgroundClasses[theme?.background],
  );

  if (href) {
    return (
      <a href={href} className={cx(classes, "hover:underline")}>
        <InnerTag label={label} />
      </a>
    );
  }

  return (
    <span className={classes}>
      <InnerTag label={label} />
    </span>
  );
};

const InnerTag = ({
  label,
  background,
}: {
  label?: string;
  background?: ColorType;
}) => {
  if (background) return <>label</>;

  return (
    <>
      <span className="absolute inset-0 bg-current opacity-10 rounded" />

      {label && <span className="relative">{label}</span>}
    </>
  );
};

export default Tag;
