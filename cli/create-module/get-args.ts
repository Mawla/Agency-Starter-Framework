const args = process.argv.slice(2);
const write = args.includes("--write");
const moduleType = args.includes("--hero") ? "hero" : "module";
export { write, moduleType };
