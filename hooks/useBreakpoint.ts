/**
 * Use it like this
 *
 * const { breakpoint, screenWidth } = useBreakpoint();
 *
 *  {screenWidth > BREAKPOINTS.lg && <div>only lg and up</div>}
 */
const useBreakpoints = require("use-breakpoints-width").default;

export const BREAKPOINTS = {
  none: 0,
  xs: 400,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export type BreakpointType = keyof typeof BREAKPOINTS;

export const useBreakpoint = () => {
  const { breakpoint, width } = useBreakpoints({
    breakpoints: BREAKPOINTS,
  });

  return { breakpoint, screenWidth: width };
};
