import { act, render, screen } from "../../jest.utils";
import Faq from "./Faq";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Faq", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Faq title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });

  it("renders intro", async () => {
    await act(() => {
      render(<Faq intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("renders items", async () => {
    await act(() => {
      render(<Faq items={[{ title: "hello", _key: "x" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
