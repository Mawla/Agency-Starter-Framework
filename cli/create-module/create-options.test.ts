import { createOptions } from "./create-options";

test("create module options", () => {
  const result = createOptions({
    moduleName: "Test",
  });

  expect(
    result.includes(`import { pick } from "../../helpers/utils/object"`),
  ).toBeTruthy();
});
