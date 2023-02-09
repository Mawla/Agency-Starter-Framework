import { act, render, screen } from "../../jest.utils";
import Video from "./Video";
import "@testing-library/jest-dom";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

describe("Video", () => {
  it("renders title", async () => {
    await act(() => {
      render(<Video title="Hello" />);
    });
    expect(screen.getByText("Hello", { selector: "h2" })).toBeInTheDocument();
  });

  it("renders intro", async () => {
    await act(() => {
      render(<Video intro={<p>Hello</p>} />);
    });
    expect(screen.getByText("Hello", { selector: "p" })).toBeInTheDocument();
  });

  it("renders video", async () => {
    await act(() => {
      render(
        <Video
          video={{
            caption: "youtube",
            provider: "youtube",
            videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
          }}
        />,
      );
    });
    expect(screen.getByText("youtube")).toBeInTheDocument();
  });
});
