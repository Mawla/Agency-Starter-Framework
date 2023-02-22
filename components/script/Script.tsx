import NextScript from "next/script";

export type ScriptProps = {
  title?: string;
  script?: string;
};

export const Script = ({ title, script }: ScriptProps) => {
  if (!script) return null;

  if (!script.includes("<script")) {
    return (
      <NextScript id={title} strategy="lazyOnload">
        {script}
      </NextScript>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: script }} />;
};

export default Script;
