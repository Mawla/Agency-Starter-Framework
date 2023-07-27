import { act, render, screen } from "../../jest.utils";
import Block14 from "./Block14";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block14", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block14 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block14", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block14 body={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});
