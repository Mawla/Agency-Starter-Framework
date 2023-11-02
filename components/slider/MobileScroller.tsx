import cx from "clsx";

export type MobileScrollerProps = {
  children?: React.ReactNode;
  className?: string;
};

export const MobileScroller = ({
  children,
  className,
}: MobileScrollerProps) => {
  return (
    <div
      className={cx(
        "-mx-8 sm:-mx-10 lg:mx-0 snap-x overflow-scrolling-touch overflow-x-auto",
        className,
      )}
    >
      <div className="w-8 sm:w-10 lg:hidden" />
      {children}
      <div className="w-8 sm:w-10 lg:hidden" />
    </div>
  );
};

export default MobileScroller;
