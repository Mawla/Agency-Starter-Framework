import { render } from "./render-field";

test("has field", () => {
  expect(render()).toEqual("");
  expect(render(["foo"])).toEqual("");
  expect(render(undefined, "foo")).toEqual("");
  expect(render(["a", "b", "c"], "c", "foo")).toEqual("foo");
  expect(render(["a", "b", "c"], "a", "foo")).toEqual("foo");
  expect(render(["a", "b", "c"], "d")).toEqual("");
});
