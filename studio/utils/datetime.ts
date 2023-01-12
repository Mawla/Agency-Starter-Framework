export function getISODateString(): string {
  return new Date()
    .toLocaleDateString()
    .replace(/\//g, '-')
    .split('-')
    .reverse()
    .join('-');
}

export function getTime(): string {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes()}`;
}

export function now(): string {
  return `${getISODateString()} ${getTime()}`;
}
