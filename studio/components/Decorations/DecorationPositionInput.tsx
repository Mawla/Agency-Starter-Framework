import { Flex, Stack, Inline, TextInput, Text } from "@sanity/ui";
import React from "react";
import { set } from "sanity";

export const DecorationPositionInput = (props: any) => {
  return (
    <Inline space={1}>
      <TextInput
        fontSize={1}
        onChange={(event) => {
          props.onChange(set(event.currentTarget.value));
        }}
        value={props.value}
        style={{
          width: 70,
        }}
      />
    </Inline>
  );
};

export const DecorationPositionInputWrapper = (props: any) => {
  return (
    <Inline space={2} style={{ marginTop: "-1.5em" }}>
      <Flex>
        <Inline space={1}>{props.children}</Inline>
      </Flex>
      <Stack space={2}>
        <Text size={1} weight="bold">
          {props.schemaType.title}
        </Text>
        <Text size={1} muted>
          {props.schemaType.description}
        </Text>
      </Stack>
    </Inline>
  );
};
