import { access } from "node:fs/promises";
import { join } from "node:path";

import type { Check } from "../types.js";

export const checkPackageJson: Check = async ({ cwd }) => {
	const packageJsonPath = join(cwd, "package.json");

	try {
		await access(packageJsonPath);

		return {
			name: "package.json",
			status: "pass",
			message: "Project manifest detected",
		};
	} catch {
		return {
			name: "package.json",
			status: "fail",
			message: "Project manifest is missing",
		};
	}
};
