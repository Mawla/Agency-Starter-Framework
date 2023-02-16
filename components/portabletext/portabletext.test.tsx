import { act, render, screen } from "../../jest.utils";
import { PortableText } from "./PortableText";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe.skip("Portable text", () => {
  it("works with strings", async () => {
    await act(() => {
      render(<PortableText content="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("works with react elements", async () => {
    await act(() => {
      render(<PortableText content={<div>Hello</div>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("works with portable text", async () => {
    await act(() => {
      render(
        <PortableText
          content={[
            {
              _key: "e2438f9ce96b",
              _type: "block",
              children: [
                {
                  _key: "32383943f4e10",
                  _type: "span",
                  marks: [],
                  text: "Hello",
                },
              ],
              markDefs: [],
              style: "normal",
            },
          ]}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "span" })).toBeInTheDocument();
  });
});
