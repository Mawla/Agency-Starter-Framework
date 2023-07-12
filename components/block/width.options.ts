export const WIDTH_OPTIONS = {
  full: "Full",
  outer: "Outer",
  inner: "Inner",
};
export type WidthType = keyof typeof WIDTH_OPTIONS;

export const widthClasses: Record<WidthType, string> = {
  full: "max-w-full",
  outer: "max-w-[1760px]",
  inner: "max-w-[1370px]",
};
