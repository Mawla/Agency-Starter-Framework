export const NEXT_LOADING_STRATEGIES = {
  beforeInteractive: "Before Interactive",
  afterInteractive: "After Interactive",
  lazyOnload: "Lazy Onload",
};
export type NextLoadingStrategyType = keyof typeof NEXT_LOADING_STRATEGIES;
