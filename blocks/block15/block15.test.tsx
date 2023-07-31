import { act, render, screen } from "../../jest.utils";
import Block15 from "./Block15";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block15", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block15 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });

  it("renders body1", async () => {
    await act(() => {
      render(<Block15 body1={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("renders body2", async () => {
    await act(() => {
      render(<Block15 body2={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});
