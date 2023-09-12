import { render, screen, act } from "../../jest.utils";
import { demoImage, demoImage2, demoImage3 } from "../../stories/content";
import ImageCard from "./ImageCard";
import "@testing-library/jest-dom";

describe("Image card", () => {
  it("renders content 4/3", async () => {
    await act(() => {
      render(
        <ImageCard image={demoImage} theme={{ image: { ratio: "4/3" } }} />,
      );
      render(
        <ImageCard image={demoImage2} theme={{ image: { ratio: "1/1" } }} />,
      );
      render(
        <ImageCard image={demoImage3} theme={{ image: { ratio: "1/2" } }} />,
      );
    });
    expect(screen.getAllByAltText("demoimage"));
    expect(screen.getAllByAltText("demoimage2"));
    expect(screen.getAllByAltText("demoimage3"));
  });
});
