import { PageType } from "../../queries/page.query";
import { BlockBuilder } from "../pagebuilder/BlockBuilder";
import { DialogBuilder } from "../pagebuilder/DialogBuilder";
import React from "react";

export const PageBody = (props: PageType) => {
  return (
    <>
      {Boolean(props?.blocks?.length) && <BlockBuilder items={props.blocks} />}

      {Boolean(props?.dialogs?.length) && (
        <DialogBuilder items={props.dialogs} />
      )}
    </>
  );
};
