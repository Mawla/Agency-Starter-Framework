import { Stack, Text } from "@sanity/ui";
import React from "react";
import { ComponentType } from "react";

export type CharacterCounterProps = {
  value?: any;
  document?: { _type: string; _id: string };
  renderDefault?: (props: any) => any;
  schemaType?: {
    options?: {
      max?: number | string;
    };
  };
};

export const CharacterCounter: ComponentType<any> = (
  props: CharacterCounterProps,
) => {
  const { value, renderDefault, schemaType } = props;

  return (
    <Stack space={2}>
      <Text
        muted
        size={0}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          transform: "translateY(-10px)",
          color:
            schemaType?.options?.max && value?.length > schemaType.options.max
              ? "#b7991e"
              : "",
        }}
      >
        {value?.length || 0}{" "}
        {schemaType?.options?.max ? ` / ${schemaType.options.max}` : null}
      </Text>
      {renderDefault && <div>{renderDefault(props)}</div>}
    </Stack>
  );
};

export default CharacterCounter;
