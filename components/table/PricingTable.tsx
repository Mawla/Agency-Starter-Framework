import { IconLoaderProps } from "../../components/images/IconLoader";
import { TableProps } from "../../components/table/Table";
import { TitleProps } from "../../components/title/Title";
import MobileScroller from "../slider/MobileScroller";
import { TitleThemeType } from "../title/title.options";
import { ComponentType, lazy } from "react";

const Table = lazy<ComponentType<TableProps>>(
  () => import(/* webpackChunkName: "Table" */ "../../components/table/Table"),
);

const IconLoader = lazy<ComponentType<IconLoaderProps>>(
  () =>
    import(
      /* webpackChunkName: "IconLoader" */ "../../components/images/IconLoader"
    ),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const textTransformers = [
  {
    // regex for only yes or YES character in the string
    regex: /(^|\s)([yY][eE][sS])(\s|$)/gim,
    fn: (key: number, result: RegExpExecArray) => (
      <IconLoader
        icon="yes"
        className="inline-block align-middle w-5 h-5"
        removeColors={false}
      />
    ),
  },
  {
    // regex for only v or V or y or Y character in the string
    regex: /(^|\s)([vV]|[yY])(\s|$)/gim,
    fn: (key: number, result: RegExpExecArray) => (
      <IconLoader
        icon="yes"
        className="inline-block align-middle w-5 h-5"
        removeColors={false}
      />
    ),
  },
  {
    // regex for only x or X or n or N character in the string
    regex: /(^|\s)([xX]|[nN])(\s|$)/gim,
    fn: (key: number, result: RegExpExecArray) => (
      <IconLoader
        icon="no"
        className="inline-block align-middle w-5 h-5"
        removeColors={false}
      />
    ),
  },
  {
    // regex for only no or NO character in the string
    regex: /(^|\s)([nN][oO])(\s|$)/gim,
    fn: (key: number, result: RegExpExecArray) => (
      <IconLoader
        icon="no"
        className="inline-block align-middle w-5 h-5"
        removeColors={false}
      />
    ),
  },
];

export type PricingTableProps = {
  features?: {
    _id?: string;
    title?: string;
    csv?: string;
  }[];
  theme?: {
    title?: TitleThemeType;
  };
};

export const PricingTable = ({ theme, features }: PricingTableProps) => {
  if (!features || !Boolean(features?.filter(Boolean).length)) return null;

  return (
    <div className="grid gap-20">
      {features.map(({ _id, title, csv }) => (
        <div key={_id} className="grid">
          <Title as="h3" {...theme?.title}>
            {title}
          </Title>

          <MobileScroller>
            <div className="[&_table]:text-sm sm:[&_table]:text-base md:[&_table]:text-lg [&_tr]:even:bg-transparent [&_th]:border-b [&_td]:border-b lg:[&_td]:pl-0 [&_th]:pl-0 [&_td:first-of-type]:w-[240px] sm:[&_td:first-of-type]:w-[360px]">
              <Table
                file={csv}
                fileName={title}
                textTransformers={textTransformers}
              />
            </div>
          </MobileScroller>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
