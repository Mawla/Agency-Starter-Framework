import { AnswersType } from "..";
import { render } from "../../utils/render-field";

type Props = {
  schemaName: string;
  pascalName: string;
  fields: AnswersType["fields"];
};

export const getQuerySnippet = ({ schemaName, pascalName, fields }: Props) => {
  return (
    `
    ${render(
      fields,
      "image",
      'import { imageQuery } from "../../components/images/image.query";',
    )}
    ${render(
      fields,
      "buttons",
      'import { buttonQuery } from "../../components/buttons/button.query";',
    )}
    ${render(
      fields,
      "intro",
      'import { richTextQuery } from "../../components/portabletext/portabletext.query";',
    )}
    import { LanguageType } from "../../languages";
    import groq from "groq";
    
    export const get${pascalName}Query = (language: LanguageType) => groq\`
    _type == "${schemaName}" => {
      _key,
      _type,
      ${render(fields, "title", "title,")}
      ${render(fields, "intro", "intro[] ${richTextQuery},")}
      ${render(fields, "image", '"image": ${imageQuery},')}
      ${render(fields, "buttons", "buttons[] ${buttonQuery},")}
      ${render(fields, "items", "items[] { _key, title },")}
    }\`;
  `
      // remove empty lines
      .replace(/^\s*$(?:\r\n?|\n)/gm, "")
  );
};
