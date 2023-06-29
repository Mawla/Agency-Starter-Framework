export const GRADIENT_OPACITY_OPTIONS = [
  0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
] as const;
export type GradientOpacityType = typeof GRADIENT_OPACITY_OPTIONS[number];
