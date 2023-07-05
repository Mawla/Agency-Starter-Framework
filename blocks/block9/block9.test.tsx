import { act, render, screen } from "../../jest.utils";
import Block9 from "./Block9";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block9", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block9 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block9", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block9 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block9", () => {
  it("renders buttons", async () => {
    await act(() => {
      render(<Block9 buttons={[{ label: "hello" }]} />);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
