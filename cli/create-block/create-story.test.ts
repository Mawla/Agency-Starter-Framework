import { createStory } from "./create-story";

test("create story with no fields", () => {
  const result = createStory({
    blockName: "Test",
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(
        `export const Default = () => <Test {...DEMO_CONTENT}/>;`.replace(
          /\s/g,
          "",
        ),
      ),
  ).toBeTruthy();
});

test("create story with title", () => {
  const result = createStory({
    blockName: "Test",
    fields: ["title"],
  });

  expect(
    result.replace(/\s/g, "").includes(`title: 'title',`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create story with intro", () => {
  const result = createStory({
    blockName: "Test",
    fields: ["intro"],
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(`intro: <p>intro</p>,`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create story with image", () => {
  const result = createStory({
    blockName: "Test",
    fields: ["image"],
  });

  expect(
    result.replace(/\s/g, "").includes(`image: demoImage,`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create story with buttons", () => {
  const result = createStory({
    blockName: "Test",
    fields: ["buttons"],
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(`buttons: [{ label: 'Button' }],`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create story with items", () => {
  const result = createStory({
    blockName: "Test",
    fields: ["items"],
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(`items: [{ title: 'Item' }],`.replace(/\s/g, "")),
  ).toBeTruthy();
});
