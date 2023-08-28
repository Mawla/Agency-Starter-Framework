import { shouldRenderPortableText } from "./portabletext";

test("check empty portable text", () => {
  expect(shouldRenderPortableText("")).toEqual(false);
  expect(shouldRenderPortableText("   ")).toEqual(false);
  expect(shouldRenderPortableText(null)).toEqual(false);
  expect(shouldRenderPortableText(undefined)).toEqual(false);
  expect(shouldRenderPortableText(false)).toEqual(false);
  expect(shouldRenderPortableText(true)).toEqual(false);

  const emptyBlock = [
    {
      _type: "block",
      style: "normal",
      _key: "ccaa586e642d",
      markDefs: [],
      children: [
        {
          _key: "3aae9d85a310",
          _type: "span",
          marks: [],
          text: "",
        },
      ],
    },
  ];
  expect(shouldRenderPortableText(emptyBlock)).toEqual(false);

  const newLines = [
    {
      _key: "ccaa586e642d",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "",
          _key: "3aae9d85a310",
        },
      ],
      _type: "block",
      style: "normal",
    },
    {
      _type: "block",
      style: "normal",
      _key: "4ba9183e0482",
      markDefs: [],
      children: [
        {
          marks: [],
          text: "",
          _key: "744aa16f4436",
          _type: "span",
        },
      ],
    },
    {
      style: "normal",
      _key: "d426630fa3c6",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "",
          _key: "eaafca5bde63",
        },
      ],
      _type: "block",
    },
  ];
  expect(shouldRenderPortableText(newLines)).toEqual(false);

  const validBlock = [
    {
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "foo",
          _key: "eaafca5bde63",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "d426630fa3c6",
    },
  ];
  expect(shouldRenderPortableText(validBlock)).toEqual(true);
});
