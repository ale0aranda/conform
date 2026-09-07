import { resolve } from "node:path";

import { runChecks } from "./index.js";
import { reportResults } from "./reporter.js";

const cwd = resolve(process.argv[2] ?? process.cwd());

const results = await runChecks(cwd);

reportResults(results);

if (results.some((result) => result.status === "fail")) {
	process.exitCode = 1;
}
