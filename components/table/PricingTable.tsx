import { IconLoaderProps } from "../../components/images/IconLoader";
import { TableProps } from "../../components/table/Table";
import { TitleProps } from "../../components/title/Title";
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
};

export const PricingTable = ({ features }: PricingTableProps) => {
  if (!features || !Boolean(features?.filter(Boolean).length)) return null;

  return (
    <div className="grid gap-20">
      {features.map(({ _id, title, csv }) => (
        <div key={_id} className="grid gap-6">
          <Title as="h3">{title}</Title>

          <div className="w-full overflow-x-scroll overflow-scrolling-touch [&_table]:text-lg [&_tr]:even:bg-transparent [&_td]:border-b [&_td]:pl-0 [&_th]:pl-0">
            <Table
              file={csv}
              fileName={title}
              textTransformers={textTransformers}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
