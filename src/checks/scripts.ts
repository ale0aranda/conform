import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Check } from "../types.js";

const requiredScripts = ["check", "test", "build"];

export const checkScripts: Check = async ({ cwd }) => {
	try {
		const content = await readFile(join(cwd, "package.json"), "utf8");
		const packageJson = JSON.parse(content) as {
			scripts?: Record<string, string>;
		};

		const scripts = packageJson.scripts ?? {};
		const missing = requiredScripts.filter((script) => !(script in scripts));

		if (missing.length === 0) {
			return {
				id: "scripts",
				name: "Scripts",
				status: "pass",
				message: "Required development scripts detected",
			};
		}

		return {
			id: "scripts",
			name: "Scripts",
			status: "fail",
			message: `Missing scripts: ${missing.join(", ")}`,
		};
	} catch {
		return {
			id: "scripts",
			name: "Scripts",
			status: "fail",
			message: "Unable to read package.json",
		};
	}
};
