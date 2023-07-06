import { act, render, screen } from "../../jest.utils";
import { demoImage } from "../../stories/content";
import Testimonials from "./Testimonials";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Testimonials", () => {
  it("renders testimonial", async () => {
    await act(() => {
      render(
        <Testimonials
          items={[
            {
              title: "Hello",
              content: <p>from</p>,
              name: "John",
              jobTitle: "Doe",
              image: demoImage,
            },
          ]}
          RenderElement={(props) => <pre {...props} />}
        />,
      );
    });
    expect(screen.getByText("Hello", { selector: "div" })).toBeInTheDocument();
    expect(screen.getByText("from", { selector: "div" })).toBeInTheDocument();
    expect(screen.getByText("John", { selector: "div" })).toBeInTheDocument();
    expect(screen.getByText("Doe", { selector: "div" })).toBeInTheDocument();
    expect(screen.getAllByAltText("hello"));
  });
});
