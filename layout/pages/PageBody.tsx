import { ScriptsType } from "../../components/script/Script";
import { PageContext } from "../../context/PageContext";
import { PageType } from "../../queries/page.query";
import { DialogBuilder } from "../pagebuilder/DialogBuilder";
import { ModuleBuilder } from "../pagebuilder/ModuleBuilder";
import React, { ComponentType, lazy, useContext } from "react";

const Scripts = lazy<ComponentType<ScriptsType>>(
  () =>
    import(/* webpackChunkName: "Script" */ "../../components/script/Script"),
);

export const PageBody = (props: PageType) => {
  const { sitemapItem } = useContext(PageContext);

  return (
    <>
      {Boolean(props?.modules?.length) && (
        <ModuleBuilder items={props.modules} />
      )}

      {Boolean(props?.dialogs?.length) && (
        <DialogBuilder items={props.dialogs} />
      )}

      {props?.scripts?.filter(Boolean).map((script) => (
        <Scripts key={script.title} title={script.title} items={script.items} />
      ))}
    </>
  );
};
