import { act, render, screen } from "../../jest.utils";
import Block12 from "./Block12";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block12", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block12 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block12", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block12 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});
