import { render, fireEvent, screen } from "../../jest.utils";
import { Button } from "./Button";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe.skip("Button", () => {
  it("fires onClick", () => {
    mockRouter.setCurrentUrl("/");

    render(
      <Button
        // onClick={() => mockRouter.setCurrentUrl("/foo")}
        label={"Foo"}
      />,
    );

    fireEvent.click(screen.getByText("Foo"));
    expect(singletonRouter).toMatchObject({ asPath: "/foo" });
  });

  it("does not fire onClick when disabled", () => {
    mockRouter.setCurrentUrl("/");

    render(
      <Button
        disabled
        // onClick={() => mockRouter.setCurrentUrl("/foo")}
        label={"Foo"}
      />,
    );

    fireEvent.click(screen.getByText("Foo"));
    expect(singletonRouter).toMatchObject({ asPath: "/" });
  });
});
