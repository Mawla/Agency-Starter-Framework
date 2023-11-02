import { render, fireEvent, screen, act } from "../../jest.utils";
import { DEMO_FLAT_BREADCRUMB } from "../../test/fixtures/breadcrumb";
import { Breadcrumb } from "./Breadcrumb";
import "@testing-library/jest-dom";
import singletonRouter from "next/router";

// https://github.com/scottrippey/next-router-mock/issues/58
jest.mock("next/dist/client/router", () => require("next-router-mock"));

jest.mock("next/dist/shared/lib/router-context.shared-runtime", () => {
  const { createContext } = require("react");
  const router = require("next-router-mock").default;
  const RouterContext = createContext(router);
  return { RouterContext };
});

describe("Breadcrumb", () => {
  it("renders", async () => {
    await act(() => {
      render(<Breadcrumb path={DEMO_FLAT_BREADCRUMB} />);
    });
    expect(screen.getByText(DEMO_FLAT_BREADCRUMB[0].title)).toBeInTheDocument();
    expect(screen.getByText(DEMO_FLAT_BREADCRUMB[1].title)).toBeInTheDocument();
    expect(screen.getByText(DEMO_FLAT_BREADCRUMB[2].title)).toBeInTheDocument();
  });

  it("allows navigation of nested routes", async () => {
    await act(() => {
      render(<Breadcrumb path={DEMO_FLAT_BREADCRUMB} />);
    });

    fireEvent.click(screen.getByText(DEMO_FLAT_BREADCRUMB[2].title));
    expect(singletonRouter).toMatchObject({
      asPath: DEMO_FLAT_BREADCRUMB[2].path,
    });
  });
});
