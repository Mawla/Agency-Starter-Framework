// test-utils.js
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: Wrapper });

export * from "@testing-library/react";
export { customRender as render };

// jest.mock('swiper/css', jest.fn());
// jest.mock('swiper/css/navigation', jest.fn());

export {};
