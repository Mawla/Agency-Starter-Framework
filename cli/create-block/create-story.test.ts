import { createStory } from "./create-story";

test("create story with no fields", () => {
  const result = createStory({
    blockName: "Test",
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(`export const Default = () => <Test />;`.replace(/\s/g, "")),
  ).toBeTruthy();
});

test("create story with eyebrow", () => {
  const result = createStory({
    blockName: "Test",
    fields: ["eyebrow"],
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(
        `export const Default = () => <Test eyebrow="Test" />;`.replace(
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
    result
      .replace(/\s/g, "")
      .includes(
        `export const Default = () => <Test title="Test" />;`.replace(
          /\s/g,
          "",
        ),
      ),
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
      .includes(
        `export const Default = () => <Test intro={<p>Test</p>} />;`.replace(
          /\s/g,
          "",
        ),
      ),
  ).toBeTruthy();
});

test("create story with image", () => {
  const result = createStory({
    blockName: "Test",
    fields: ["image"],
  });

  expect(
    result
      .replace(/\s/g, "")
      .includes(
        `export const Default = () => <Test image={demoImage} />;`.replace(
          /\s/g,
          "",
        ),
      ),
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
      .includes(
        `export const Default = () => <Test buttons={[{ label: 'Test' }]} />;`.replace(
          /\s/g,
          "",
        ),
      ),
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
      .includes(
        `export const Default = () => <Test items={[{ title: 'Test' }]} />;`.replace(
          /\s/g,
          "",
        ),
      ),
  ).toBeTruthy();
});
