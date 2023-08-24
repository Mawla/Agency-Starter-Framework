import { createReactComponent } from "./create-react-component";

test("create react component with no fields", () => {
  const result = createReactComponent({
    blockName: "Test",
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(
        `<Wrapper theme={{ ...theme?.block }} decorations={decorations}>`.replace(
          /\s/g,
          "",
        ),
      ),
  ).toBeTruthy();
});

test("create react component with title field", () => {
  const result = createReactComponent({
    blockName: "Test",
    fields: ["title"],
  });

  expect(
    result.replace(/\s/g, "").includes(`{title`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create react component with intro field", () => {
  const result = createReactComponent({
    blockName: "Test",
    fields: ["intro"],
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(`{shouldRenderPortableText(intro) &&`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create react component with image field", () => {
  const result = createReactComponent({
    blockName: "Test",
    fields: ["image"],
  });

  expect(
    result.replace(/\s/g, "").includes(`{image &&`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create react component with items", () => {
  const result = createReactComponent({
    blockName: "Test",
    fields: ["items"],
  });

  expect(
    result.replace(/\s/g, "").includes(`{items &&`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create react component with buttons", () => {
  const result = createReactComponent({
    blockName: "Test",
    fields: ["buttons"],
  });

  expect(
    result.replace(/\s/g, "").includes(`{buttons &&`.replace(/\s/g, "")),
  ).toBeTruthy();
});
