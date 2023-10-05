export type ColumnType = 0 | 1 | 2 | 3 | 4;

export const gridClasses: Record<ColumnType, string> = {
  0: "sm:grid-cols-2 lg:grid-cols-4",
  1: "grid-cols-3",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 sm:[&>div:nth-of-type(3)]:col-span-2 lg:grid-cols-3 lg:[&>div:nth-of-type(3)]:col-span-1",
  4: "sm:grid-cols-2 lg:grid-cols-3",
};
