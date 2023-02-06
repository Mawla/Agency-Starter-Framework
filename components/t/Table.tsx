import { Linkify } from "../buttons/Linkify";
import { Spinner } from "../loaders/Spinner";
import React, { useEffect, useState } from "react";

export type TableProps = {
  file?: string;
  fileName?: string;
};

export type TableType = {
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
    fields: string[];
  };
  data: { [key: string]: string }[];
};

export const Table = ({ file, fileName }: TableProps) => {
  const [data, setData] = useState<TableType | null>(null);
  const [state, setState] =
    useState<"loading" | "complete" | "error">("loading");

  useEffect(() => {
    if (!file) return;
    setState("loading");

    async function load() {
      if (!file) return;
      const Papa = (await import("papaparse")).default;
      Papa.parse(file, {
        download: true,
        header: true,
        error: (err) => {
          console.log(err);
          setState("error");
        },
        complete: function (results) {
          if (results.errors?.length) {
            console.log(results);
            return setState("error");
          }
          setData(results as TableType);
          setState("complete");
        },
      });
    }
    load();
  }, [file]);

  if (state === "loading")
    return (
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5">
          <Spinner />
        </div>
      </div>
    );

  if (state === "error")
    return (
      <div className="">
        Something went wrong. Click here to download{" "}
        <a href={file} download className="underline">
          {fileName}
        </a>
      </div>
    );

  return (
    <div className="overflow-x-auto not-prose">
      <div className="text-sm sm:text-md min-w-[500px]">
        {data && (
          <table className="border border-collapse table-auto w-full">
            {data.meta.fields.length && (
              <thead>
                <tr>
                  {data.meta?.fields?.map((field) => (
                    <th
                      className="align-top border-b p-4 text-left"
                      key={field}
                    >
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            {data.data.length && (
              <tbody>
                {data?.data?.map((row) => (
                  <tr
                    className="even:bg-[rgba(0,0,0,.025)]"
                    key={JSON.stringify(row)}
                  >
                    {Object.keys(row).map((key) => (
                      <td
                        className="align-top border-b p-4 text-left"
                        key={key}
                      >
                        <Linkify>{row[key] as any}</Linkify>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
    </div>
  );
};
