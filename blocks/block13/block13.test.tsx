import { act, render, screen } from "../../jest.utils";
import { demoImage } from "../../stories/content";
import Block13 from "./Block13";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Block13", () => {
  it("renders title", async () => {
    await act(() => {
      render(
        <Block13
          title="Hello"
          intro={<p>Hello</p>}
          items={[
            {
              title: "Hello",
              _id: "x",
              date: "",
              image: demoImage,
              href: "/",
              intro: "",
            },
          ]}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("it doesn't render title with no items", async () => {
    const { container } = render(<Block13 title="Hello" items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
