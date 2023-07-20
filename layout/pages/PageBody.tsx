import { ScriptsType } from "../../components/script/Script";
import { PageType } from "../../queries/page.query";
import { BlockBuilder } from "../pagebuilder/BlockBuilder";
import { DialogBuilder } from "../pagebuilder/DialogBuilder";
import React, { ComponentType, lazy } from "react";

const Scripts = lazy<ComponentType<ScriptsType>>(
  () =>
    import(/* webpackChunkName: "Script" */ "../../components/script/Script"),
);

export const PageBody = (props: PageType) => {
  return (
    <>
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
