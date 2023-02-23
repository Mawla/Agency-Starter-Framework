import { createSchema } from "./create-schema";

test("create dialog schema", () => {
  const result = createSchema({
    dialogName: "Test",
    dialogDescription: "Test dialog",
  });

  expect(result.includes(`name: "dialog.test",`)).toBeTruthy();
  expect(result.includes(`description: "Test dialog",`)).toBeTruthy();
});
