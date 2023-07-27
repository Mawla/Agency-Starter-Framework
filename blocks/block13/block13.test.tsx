import { act, render, screen } from "../../jest.utils";
import Block13 from "./Block13";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block13", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block13 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block13", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block13 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});
