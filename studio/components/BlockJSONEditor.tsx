import { SANITY_API_VERSION } from "../../types.sanity";
import { TerminalIcon, PublishIcon } from "@sanity/icons";
import { useToast, Box, Dialog, Button } from "@sanity/ui";
import React, { ComponentType, useCallback, useState } from "react";
import Editor from "react-simple-code-editor";
import { useClient, useFormValue } from "sanity";

const highlight = (x: any) => x;

export const BlockJSONEditor: ComponentType<any> = (props) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const [open, setOpen] = useState<boolean>(false);

  const toast = useToast();

  const containerName = props.path[0];
  const containerValue = useFormValue([containerName]) as {
    _key: string;
    _type: string;
    [key: string]: any;
  }[];

  const parent = containerValue.find(({ _key }) => _key === props.path[1]._key);
  const [code, setCode] = useState<string>(JSON.stringify(parent, null, 2));

  const document = useFormValue([]) as {
    _id?: string;
    _type: string;
    [key: string]: any;
  };
  const draftId = document._id?.startsWith("drafts.")
    ? document._id
    : `drafts.${document._id}`;

  const onSave = useCallback(async () => {
    if (!code) return;

    try {
      /**
       * need to create a draft if it doesn't exist, otherwise changes would instantly be published
       * (if the state of the document is published)
       */

      await client.createIfNotExists({
        ...document,
        _id: draftId,
      });

      await client
        .patch(draftId)
        .insert("replace", `blocks[_key=="${parent?._key}"]`, [
          JSON.parse(code),
        ])
        .commit({
          autoGenerateArrayKeys: false,
        });
    } catch (err) {
      toast.push({
        status: "error",
        title: `Something went wrong.`,
      });
      console.error(err);
    }
    setOpen(false);
  }, [code, client, document, draftId, parent?._key, toast]);

  return (
    <>
      <Button
        id="add-block"
        fontSize={1}
        icon={TerminalIcon}
        mode="ghost"
        padding={3}
        text="Open JSON editor"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Dialog
          header="Block JSON Editor"
          id="edit-block-json"
          onClose={() => setOpen(false)}
          zOffset={1000}
          width={1000}
        >
          <Box padding={4}>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: "1px solid #ddd",
              }}
            />
          </Box>
          <Button
            id="add-block"
            fontSize={2}
            icon={PublishIcon}
            tone="positive"
            padding={[3, 3, 4]}
            text="Save changes"
            onClick={() => onSave()}
            style={{ position: "sticky", bottom: 10, left: 10 }}
          />
        </Dialog>
      )}
    </>
  );
};
