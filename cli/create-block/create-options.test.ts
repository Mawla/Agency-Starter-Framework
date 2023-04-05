import { createOptions } from "./create-options";

test("create block options", () => {
  const result = createOptions({
    blockName: "Test",
  });

  expect(
    result.includes(`import { pick } from "../../helpers/utils/object"`),
  ).toBeTruthy();
});
