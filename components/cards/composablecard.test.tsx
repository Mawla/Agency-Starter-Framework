import { render, screen, act } from "../../jest.utils";
import { demoImage2 } from "../../stories/content";
import { ComposableCard, ComposableCardProps } from "./ComposableCard";
import "@testing-library/jest-dom";

const DEMO_CONTENT: ComposableCardProps = {
  type: "card.composable",
  title: "title",
  subtitle: "subtitle",
  content: <p>text</p>,
  image: demoImage2,
  buttons: [{ label: "button 1" }, { label: "button 2" }],
};

describe("Composable card", () => {
  it("renders content", async () => {
    await act(() => {
      render(<ComposableCard {...DEMO_CONTENT} />);
    });
    expect(screen.getByText("title", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("text", { selector: "p" })).toBeInTheDocument();
    expect(
      screen.getByText("button 1", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("button 2", { selector: "a span" }),
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("demoimage2"));
  });
});
