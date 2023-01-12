export function shuffle(arr: any[]) {
  const newArr = [...arr];
  return newArr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
