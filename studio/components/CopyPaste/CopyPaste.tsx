import { SANITY_API_VERSION } from "../../../types.sanity";
import { getSchemaDefinition, matchSchema } from "./match-schema";
import { CopyIcon, ArchiveIcon } from "@sanity/icons";
import {
  Card,
  Stack,
  Box,
  Button,
  Flex,
  useToast,
  Dialog,
  Text,
} from "@sanity/ui";
import React, { useEffect, useState, useCallback, ComponentType } from "react";
import { useClient, useFormValue, useSchema } from "sanity";

const ACTION_ID = "sanityCopyPaste";
const READ_PASTE_TIMEOUT = 1000;

export const CopyPaste: ComponentType<any> = (props) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const allSchemas = useSchema()._registry;

  const toast = useToast();
  const [isCompatiblePasteData, setIsCompatiblePasteData] = useState(false);
  const [pastedData, setPastedData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const document = useFormValue([]) as {
    _id: string;
    _type: string;
    [key: string]: any;
  };
  const containerName = props.path[0];
  const containerValue = useFormValue([containerName]) as {
    _key: string;
    _type: string;
    [key: string]: any;
  }[];

  const parent = containerValue.find(({ _key }) => _key === props.path[1]._key);

  if (!parent) return null;

  /**
   * Copy to clipboard
   */

  const onCopy = useCallback(() => {
    const schemaFields = allSchemas[parent._type].get()?.fields;
    const schemaDefinition = getSchemaDefinition(schemaFields, null);

    navigator.clipboard.writeText(
      JSON.stringify({
        date: new Date(),
        action: ACTION_ID,
        type: parent._type,
        data: parent,
        schema: schemaDefinition,
      }),
    );

    toast.push({
      status: "success",
      title: `Copied to clipboard`,
    });
  }, [parent]);

  /**
   * Paste from clipboard
   */

  const onPaste = useCallback(async () => {
    // clipboard data not compatible with parent
    if (!isCompatiblePasteData) {
      toast.push({
        status: "error",
        title: "Paste failed",
      });
      const data = await getClipboardObj();
      setPastedData(null);
      console.error("Paste failed", data);
      return;
    }

    const data = await getClipboardObj();
    setPastedData(data);
    setDialogOpen(true);
  }, [isCompatiblePasteData]);

  /**
   * Check if data on clipboard is a match with parent type
   */

  const getClipboardObj = async () => {
    const data = await navigator.clipboard.readText();
    if (!data) return null;

    let obj;
    try {
      obj = JSON.parse(data);
    } catch (err) {
      return null;
    }
    return obj;
  };

  const checkCompatiblePasteData = async () => {
    const obj = await getClipboardObj();

    if (!obj) return false;

    // no sanity copy paste action
    if (obj.action !== ACTION_ID) return false;

    // no type
    if (!Boolean(obj.type)) return false;

    // not the same data type
    if (obj.type !== parent._type) return false;

    const schemaFields = allSchemas[parent._type].get()?.fields;
    const schemaDefinition = getSchemaDefinition(schemaFields, null);

    // check if obj.data partially matches the schema definition
    const errors = matchSchema(obj.schema, schemaDefinition);
    if (errors.length) {
      return false;
    }

    return true;
  };

  /**
   * Read clipboard periodically to enable/disable paste
   */

  useEffect(() => {
    async function readClipboard() {
      if (!window?.document?.hasFocus()) return;
      const isCompatible = await checkCompatiblePasteData();
      setIsCompatiblePasteData(isCompatible);
    }

    let interval = setInterval(readClipboard, READ_PASTE_TIMEOUT);
    return () => clearInterval(interval);
  }, []);

  /**
   * Overwrite data
   */

  const writePastedData = useCallback(() => {
    if (pastedData) handlePaste(pastedData);
    setDialogOpen(false);
  }, [pastedData, document]);

  const handlePaste = React.useCallback(
    async (data: { [key: string]: any }) => {
      console.log(
        containerName,
        {
          ...data.data,
          _key: parent._key,
        },
        parent._key,
        document._id,
      );

      try {
        await client
          .patch(document._id)
          .setIfMissing({ [containerName]: [] })
          .insert("replace", `${containerName}[_key=="${parent._key}"]`, [
            {
              ...data.data,
              _key: parent._key,
            },
          ])
          .commit();
      } catch (err: any) {
        toast.push({
          status: "error",
          title: `Paste failed: ${err.message}`,
        });

        if (err.details?.items?.[0]?.error?.description) {
          toast.push({
            status: "error",
            title: err.details.items[0].error.description,
          });
        }

        console.error(err);
        return;
      }

      toast.push({
        status: "success",
        title: `Paste successful`,
      });
    },
    [parent, document],
  );

  return (
    <Card>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={1} weight="bold">
            Copy and paste block data
          </Text>
          <Text size={1} muted>
            Warning: this will overwrite existing block data and will only work
            between blocks of the same type.
          </Text>
        </Stack>
        <Flex gap={2}>
          <Button
            text="Paste"
            icon={ArchiveIcon}
            mode="ghost"
            disabled={!isCompatiblePasteData}
            onClick={onPaste}
          />

          <Button text="Copy" icon={CopyIcon} mode="ghost" onClick={onCopy} />
        </Flex>

        {pastedData && dialogOpen && (
          <Dialog
            header={`Import ${parent.title} data`}
            id="dialog-paste"
            onClose={() => setPastedData(null)}
            zOffset={1000}
          >
            <Stack>
              <Box padding={4}>
                <Stack space={4}>
                  <Text>
                    Are you sure you want to proceed? This will overwrite
                    existing content.
                  </Text>
                </Stack>
              </Box>

              <Stack padding={4}>
                <Flex gap={2}>
                  <Button
                    text="Import"
                    icon={ArchiveIcon}
                    mode="ghost"
                    onClick={writePastedData}
                  />
                  <Button
                    text="Cancel"
                    mode="ghost"
                    onClick={() => setPastedData(null)}
                  />
                </Flex>
              </Stack>
            </Stack>
          </Dialog>
        )}
      </Stack>
    </Card>
  );
};

export default CopyPaste;
