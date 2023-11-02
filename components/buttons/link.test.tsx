import { render, fireEvent, screen } from "../../jest.utils";
import { Link } from "./Link";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";

// https://github.com/scottrippey/next-router-mock/issues/58
jest.mock("next/dist/client/router", () => require("next-router-mock"));

jest.mock("next/dist/shared/lib/router-context.shared-runtime", () => {
  const { createContext } = require("react");
  const router = require("next-router-mock").default;
  const RouterContext = createContext(router);
  return { RouterContext };
});

describe("Link", () => {
  it("routes internal links", () => {
    mockRouter.setCurrentUrl("/foo");

    render(<Link href={"/foo/bar"}>FooBar</Link>);

    fireEvent.click(screen.getByText("FooBar"));
    expect(singletonRouter).toMatchObject({ asPath: "/foo/bar" });
  });

  it("routes external links", () => {
    mockRouter.setCurrentUrl("/foo");

    render(<Link href={"https://gist.github.com/"}>Foo</Link>);
    fireEvent.click(screen.getByText("Foo"));

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://gist.github.com/",
    );
  });
});
