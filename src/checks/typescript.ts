import { access } from "node:fs/promises";
import { join } from "node:path";

import type { Check } from "../types.js";

export const checkTypeScript: Check = async ({ cwd }) => {
	try {
		await access(join(cwd, "tsconfig.json"));

		return {
			name: "TypeScript",
			status: "pass",
			message: "TypeScript configuration detected",
		};
	} catch {
		return {
			name: "TypeScript",
			status: "fail",
			message: "TypeScript configuration is missing",
		};
	}
};
