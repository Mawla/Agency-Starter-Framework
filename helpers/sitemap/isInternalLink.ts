export const isInternalLink = (href: string): boolean =>
  href?.indexOf("/") === 0 || href?.indexOf("#") === 0;
