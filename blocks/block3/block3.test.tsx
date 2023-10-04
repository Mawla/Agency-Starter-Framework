import { act, render, screen } from "../../jest.utils";
import Block3 from "./Block3";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block3", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Block3 title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });
});

describe("Block3", () => {
  it("renders intro", async () => {
    await act(() => {
      render(<Block3 intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });
});

describe("Block3", () => {
  it("renders items", async () => {
    await act(() => {
      render(
        <Block3
          plans={[
            {
              title: "Hello",
              description: "description",
              _id: "a",
              price: { amount: "100", unit: "pm" },
              buttons: [{ label: "buy now" }],
            },
          ]}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "h3" })).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByText("100", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("pm", { selector: "p" })).toBeInTheDocument();
    expect(
      screen.getByText("buy now", { selector: "span" }),
    ).toBeInTheDocument();
  });
});
