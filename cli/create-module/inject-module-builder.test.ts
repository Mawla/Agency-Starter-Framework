import { injectModuleBuilder } from "./inject-module-builder";

test("inject module in page builder", () => {
  const result = injectModuleBuilder({
    moduleName: "Test",
  });

  expect(
    result.includes(`import { TestProps } from "../../modules/test/Test";`),
  ).toBeTruthy();

  expect(
    result.replace(/\s/g, "").includes(
      `const Test = lazy<ComponentType<TestProps>>(
      () =>
        import(
          /* webpackChunkName: "Test" */ "../../modules/test/Test"
        ),
    );
    `.replace(/\s/g, ""),
    ),
  ).toBeTruthy();

  expect(
    result.replace(/\s/g, "").includes(
      `{item._type === "module.test" && (
        <Test {...(item as TestProps)} />
      )}`.replace(/\s/g, ""),
    ),
  ).toBeTruthy();
});
