type Block = {
  _type: "block" | string;
  children: { _type: string; text: string }[];
};

export const blocksToText = (blocks: Block[]): string => {
  if (!blocks || !Boolean(blocks?.length) || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return `[${block._type}]`;
      }
      return block.children.map((child) => child.text).join("\n");
    })
    .join("\n");
};
