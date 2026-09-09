import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Check } from "../types.js";

export const checkRules: Check = async ({ cwd }) => {
	try {
		const content = await readFile(join(cwd, "package.json"), "utf8");
		const packageJson = JSON.parse(content) as {
			dependencies?: Record<string, string>;
			devDependencies?: Record<string, string>;
			peerDependencies?: Record<string, string>;
		};

		const dependencies = {
			...packageJson.dependencies,
			...packageJson.devDependencies,
			...packageJson.peerDependencies,
		};

		if ("@ale0aranda/rules" in dependencies) {
			return {
				id: "rules",
				name: "@ale0aranda/rules",
				status: "pass",
				message: "Shared development standards installed",
			};
		}

		return {
			id: "rules",
			name: "@ale0aranda/rules",
			status: "fail",
			message: "Shared development standards are not installed",
		};
	} catch {
		return {
			id: "rules",
			name: "@ale0aranda/rules",
			status: "fail",
			message: "Unable to read package.json",
		};
	}
};
