import { SANITY_API_VERSION } from "../../types.sanity";
import { Button } from "@sanity/ui";
import React, { useCallback } from "react";
import { useClient, useFormValue } from "sanity";

export const UnsetObjectButton = (props: any) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const document = useFormValue([]) as {
    _id: string;
    _type: string;
    [key: string]: any;
  };

  const handleClick = useCallback(async () => {
    await client.patch(document._id).unset([props.inputId]).commit();
  }, [document._id]);

  return (
    <div>
      {props.renderDefault(props)}
      {props.value && (
        <Button
          style={{ marginTop: 10 }}
          fontSize={1}
          padding={2}
          text={`Clear ${props.title} value`}
          mode="ghost"
          tone="critical"
          onClick={handleClick}
        />
      )}
    </div>
  );
};
