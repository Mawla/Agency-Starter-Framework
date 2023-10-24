import { SANITY_API_VERSION } from "../../types.sanity";
import { LockIcon, UnlockIcon, CheckmarkIcon, EditIcon } from "@sanity/icons";
import {
  Stack,
  Text,
  Card,
  Flex,
  Dialog,
  Box,
  Spinner,
  Inline,
  Button,
  TextInput,
  Label,
} from "@sanity/ui";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { useClient, useFormValue, set, unset } from "sanity";

export const PagePasswordComponent: ComponentType<any> = (props) => {
  const { value, onChange } = props;
  const document = useFormValue([]) as {
    _id?: string;
    _type: string;
    [key: string]: any;
  };
  const pageId = document?._id?.replace("drafts.", "");

  if (!pageId) return null;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const client = useClient({ apiVersion: SANITY_API_VERSION });

  /**
   * Save the password information
   */

  const onCreate = useCallback(
    async ({ password }: { password: string }) => {
      onChange(set(true));

      // create new password document
      await client.create({
        _type: "password",
        _id: `password.${pageId}`,
        password,
        page: { _ref: pageId, _weak: true },
      });

      // delete unused passwords
      await client.delete({
        query: '*[_type == "password" && !defined(page._ref)]',
      });
    },
    [pageId],
  );

  const onEdit = useCallback(
    async ({ _id, password }: { _id: string; password: string }) => {
      onChange(set(true));
      await client.patch(_id).set({ password }).commit();
    },
    [pageId],
  );

  const onDelete = useCallback(async ({ _id }: { _id: string }) => {
    await client.delete(_id);
    onChange(unset());
  }, []);

  return (
    <>
      {value && (
        <>
          <Card
            tone="caution"
            padding={[3, 2]}
            radius={2}
            shadow={1}
            style={{ cursor: "pointer" }}
            onClick={() => setDialogOpen(true)}
          >
            <Flex align="center">
              <Text weight="semibold" style={{ marginRight: "auto" }}>
                <LockIcon style={{ marginRight: 1 }} /> Password protected page
              </Text>
              <EditIcon fontSize={20} />
            </Flex>
          </Card>
        </>
      )}

      {!value && (
        <Flex>
          <Button
            tone="caution"
            mode="ghost"
            onClick={() => setDialogOpen(true)}
            icon={LockIcon}
            text="Add password"
          />
        </Flex>
      )}

      {dialogOpen && (
        <PasswordDialog
          pageId={pageId}
          close={() => setDialogOpen(false)}
          mode={value ? "edit" : "create"}
          onCreate={onCreate}
          onEdit={onEdit}
          onDelete={onDelete}
          value={value}
        />
      )}
    </>
  );
};

export default PagePasswordComponent;

type PasswordDialogProps = {
  pageId: string;
  close: () => void;
  mode: "edit" | "create";
  onCreate: ({ password }: { password: string }) => void;
  onEdit: ({ _id, password }: { _id: string; password: string }) => void;
  onDelete: ({ _id }: { _id: string }) => void;
  value?: {};
};

const PasswordDialog = ({
  pageId,
  close,
  mode,
  onCreate,
  onEdit,
  onDelete,
  value,
}: PasswordDialogProps) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const [state, setState] = useState<"loading" | "ready">(
    mode === "edit" ? "loading" : "ready",
  );
  const [passwordDoc, setPasswordDoc] = useState<{
    _id: string;
    password: string;
  } | null>(null);

  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "edit") return;

    const query = `*[_type == 'password' && references("${pageId}")][0] { password, _id }`;
    async function getPassword() {
      const result = await client.fetch(query);
      if (!result) {
        onDelete({ _id: pageId });
        return setState("ready");
      }

      setPasswordDoc(result);
      setPassword(result.password);
      setState("ready");
    }
    getPassword();
  }, [mode, pageId]);

  const handleEdit = () => {
    if (!passwordDoc || !password) return close();
    onEdit({ _id: passwordDoc._id, password });
    close();
  };

  const handleCreate = () => {
    if (!password) return close();
    onCreate({ password });
    close();
  };

  const handleDelete = () => {
    if (!passwordDoc) return close();
    onDelete({ _id: passwordDoc._id });
    close();
  };

  return (
    <Dialog
      width={1}
      header={mode === "edit" ? "Change password" : "Create password"}
      id="dialog-password"
      onClose={close}
      zOffset={1000}
    >
      <Box padding={4}>
        {state === "loading" && <Spinner muted />}
        {state === "ready" && (
          <Stack space={4}>
            <Card>
              <Stack space={2}>
                <Label size={1}>Password</Label>
                <TextInput
                  fontSize={3}
                  onChange={(event) => setPassword(event?.currentTarget.value)}
                  padding={3}
                  value={password || passwordDoc?.password}
                />
              </Stack>
            </Card>
          </Stack>
        )}
      </Box>
      <Card padding={4} paddingTop={0}>
        <Inline space={2}>
          <Button
            fontSize={3}
            tone="positive"
            padding={[2, 3]}
            text="Save"
            icon={CheckmarkIcon}
            onClick={mode === "edit" ? handleEdit : handleCreate}
          />
          {mode === "edit" && (
            <Button
              fontSize={3}
              padding={[2, 3]}
              text="Remove password"
              tone="critical"
              icon={UnlockIcon}
              onClick={handleDelete}
            />
          )}
        </Inline>
      </Card>
    </Dialog>
  );
};

export const PagePasswordWrapper: ComponentType<any> = (props) => {
  return <div>{props.children}</div>;
};
