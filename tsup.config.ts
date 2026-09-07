import { defineTsupCliConfig } from "@ale0aranda/rules/tsup/cli";

export default defineTsupCliConfig({
	entry: ["src/cli.ts"],
	dts: false,
});
