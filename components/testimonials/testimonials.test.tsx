import { act, render, screen } from "../../jest.utils";
import { demoImage } from "../../stories/content";
import { TestimonialCardProps } from "../cards/TestimonialCard";
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
          RenderElement={(props: TestimonialCardProps) => (
            <pre data-testid="pre">{JSON.stringify(props, null, 2)}</pre>
          )}
        />,
      );
    });

    expect(screen.getByTestId("pre")).toHaveTextContent("Hello");
    expect(screen.getByTestId("pre")).toHaveTextContent("from");
    expect(screen.getByTestId("pre")).toHaveTextContent("John");
    expect(screen.getByTestId("pre")).toHaveTextContent("Doe");
    expect(screen.getByTestId("pre")).toHaveTextContent("demoimage");
  });
});
