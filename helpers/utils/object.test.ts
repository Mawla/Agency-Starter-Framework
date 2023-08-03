import { removeEmptyValues } from "./object";

test("remove null", () => {
  expect(removeEmptyValues({})).toStrictEqual({});
  expect(removeEmptyValues({ foo: null })).toStrictEqual({});
  expect(removeEmptyValues({ foo: "" })).toStrictEqual({});
  expect(removeEmptyValues({ foo: undefined })).toStrictEqual({});
  expect(removeEmptyValues({ foo: 1 })).toStrictEqual({ foo: 1 });
  expect(removeEmptyValues({ foo: "a" })).toStrictEqual({ foo: "a" });
  expect(removeEmptyValues({ foo: "a", fii: 1 })).toStrictEqual({
    foo: "a",
    fii: 1,
  });
});
