import React, { ComponentType } from "react";
import Editor from "react-simple-code-editor";
import { set } from "sanity";

const highlight = (x: any) => x;

export const CodeEditor: ComponentType<any> = (props) => {
  return (
    <Editor
      value={props.value}
      onValueChange={(code) => props.onChange(set(code))}
      highlight={(code) => highlight(code)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        border: "1px solid #ddd",
        height: 300,
      }}
    />
  );
};
