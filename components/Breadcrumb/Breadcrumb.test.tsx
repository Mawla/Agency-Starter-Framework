import "@testing-library/jest-dom";
import singletonRouter from "next/router";

import { render, fireEvent, screen } from "../../jest.utils";
import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { Breadcrumb } from "./Breadcrumb";

// https://github.com/scottrippey/next-router-mock/issues/58
jest.mock("next/dist/client/router", () => require("next-router-mock"));

jest.mock("next/dist/shared/lib/router-context", () => {
  const { createContext } = require("react");
  const router = require("next-router-mock").default;
  const RouterContext = createContext(router);
  return { RouterContext };
});

describe("Breadcrumb", () => {
  it("renders", () => {
    render(<Breadcrumb path={DEMO_SITEMAP} />);
    expect(screen.getByText("content page")).toBeInTheDocument();
    expect(screen.getByText("content page 2")).toBeInTheDocument();
  });

  it("allows navigation of nested routes", () => {
    render(<Breadcrumb path={DEMO_SITEMAP} />);

    fireEvent.click(screen.getByText("content page 2"));
    expect(singletonRouter).toMatchObject({ asPath: "/page1/page2" });
  });
});
