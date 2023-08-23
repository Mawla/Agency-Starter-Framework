import { act, render, screen } from "../../jest.utils";
import { demoImage } from "../../stories/content";
import Testimonials from "../testimonials/Testimonials";
import TestimonialCard, { TestimonialCardProps } from "./TestimonialCard";
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
            <TestimonialCard {...props} />
          )}
        />,
      );
    });

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("from")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getAllByAltText("demoimage"));
  });
});
