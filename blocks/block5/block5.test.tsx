import { act, render, screen } from "../../jest.utils";
import Block5 from "./Block5";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block5", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block5 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block5", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block5 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block5", () => {
  it("renders items", async () => {
    await act(() => {
      render(
        <Block5
          features={[
            {
              title: "Hello",
              _id: "a",
            },
          ]}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "h3" })).toBeInTheDocument();
  });
});
