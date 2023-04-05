import { injectBuilder } from "./inject-builder";

test("inject block in page builder", () => {
  const result = injectBuilder({
    blockName: "Test",
  });

  expect(
    result.includes(`import { TestProps } from "../../blocks/test/Test";`),
  ).toBeTruthy();

  expect(
    result.replace(/\s/g, "").includes(
      `const Test = lazy<ComponentType<TestProps>>(
      () =>
        import(
          /* webpackChunkName: "Test" */ "../../blocks/test/Test"
        ),
    );
    `.replace(/\s/g, ""),
    ),
  ).toBeTruthy();

  expect(
    result.replace(/\s/g, "").includes(
      `{item._type === "block.test" && (
        <Test {...(item as TestProps)} />
      )}`.replace(/\s/g, ""),
    ),
  ).toBeTruthy();
});
