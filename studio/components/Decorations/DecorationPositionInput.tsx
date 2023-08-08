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
          color: props.validation.length > 0 ? "#c33529" : "inherit",
          background: props.validation.length > 0 ? "#fdebea" : "inherit",
          boxShadow:
            props.validation.length > 0 ? "inset 0 0 0 1px #f9b1ab" : "inherit",
        }}
      />
    </Inline>
  );
};

export const DecorationPositionInputWrapper = (props: any) => {
  return (
    <Stack space={2}>
      <Inline space={2} style={{ marginTop: "-1.5em" }}>
        <Flex gap={2}>
          <Inline
            space={1}
            style={{
              flexShrink: 0,
            }}
          >
            {props.children}
          </Inline>
          <Stack space={2}>
            <Text size={1} weight="bold">
              {props.schemaType.title}
            </Text>
            <Text size={1} muted>
              {props.schemaType.description}
            </Text>
          </Stack>
        </Flex>
      </Inline>
      {props.validation.length > 0 && (
        <Text size={1} style={{ color: "#c33529" }}>
          {props.validation[0].message}
        </Text>
      )}
    </Stack>
  );
};
