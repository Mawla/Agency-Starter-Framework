import { ScriptsType } from "../../components/script/Script";
import { PageContext } from "../../context/PageContext";
import { PageType } from "../../queries/page.query";
import { BlockBuilder } from "../pagebuilder/BlockBuilder";
import { DialogBuilder } from "../pagebuilder/DialogBuilder";
import React, { ComponentType, lazy, useContext } from "react";

const Scripts = lazy<ComponentType<ScriptsType>>(
  () =>
    import(/* webpackChunkName: "Script" */ "../../components/script/Script"),
);

export const PageBody = (props: PageType) => {
  const { sitemapItem } = useContext(PageContext);

  return (
    <>
      <div className="w-10 aspect-square bg-red" />
      <div className="w-10 aspect-square bg-yellow-200" />
      <div className="font-thin">font thin</div>
      <div className="font-light">font light</div>
      <div className="font-extra-bold">font bold</div>
      <div className="text-xl">text xl</div>
      <div className="text-5xl">text 5xl</div>
      <div className="text-6xl">text 6xl</div>

      {Boolean(props?.blocks?.length) && <BlockBuilder items={props.blocks} />}

      {Boolean(props?.dialogs?.length) && (
        <DialogBuilder items={props.dialogs} />
      )}

      {props?.scripts?.filter(Boolean).map((script) => (
        <Scripts key={script.title} title={script.title} items={script.items} />
      ))}
    </>
  );
};
