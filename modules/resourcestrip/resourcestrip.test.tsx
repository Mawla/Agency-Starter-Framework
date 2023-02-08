import { act, render, screen } from "../../jest.utils";
import ResourceStrip from "./ResourceStrip";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("ResourceStrip", () => {
  it("renders title", async () => {
    await act(() => {
      render(
        <ResourceStrip
          title="Hello"
          items={[{ title: "test", _id: "", href: "/", date: "" }]}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });

  it("renders intro", async () => {
    await act(() => {
      render(
        <ResourceStrip
          intro={<p>Hello</p>}
          items={[{ title: "test", _id: "", href: "/", date: "" }]}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("renders nothing for no items", async () => {
    await act(() => {
      render(<ResourceStrip title="Hello" />);
    });
    expect(screen.queryByText("Hello")).toBeNull();
  });
});
