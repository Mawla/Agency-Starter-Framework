import { ScriptsProps } from "../../components/script/Script";
import { PageContext } from "../../context/PageContext";
import { PageType } from "../../queries/page.query";
import { DialogBuilder } from "../modulebuilder/DialogBuilder";
import { HeroBuilder } from "../modulebuilder/HeroBuilder";
import { ModuleBuilder } from "../modulebuilder/ModuleBuilder";
import React, { ComponentType, lazy, useContext } from "react";

const Scripts = lazy<ComponentType<ScriptsProps>>(
  () =>
    import(/* webpackChunkName: "Script" */ "../../components/script/Script"),
);

export const PageBody = (props: PageType) => {
  const { sitemapItem } = useContext(PageContext);

  return (
    <>
      {props.hero ? (
        <HeroBuilder hero={props.hero} />
      ) : (
        <h1 className="sr-only">{sitemapItem?.title}</h1>
      )}

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
