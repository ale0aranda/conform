import { access } from "node:fs/promises";
import { join } from "node:path";

import type { Check } from "../types.js";

export const checkPackageManager: Check = async ({ cwd }) => {
	try {
		await access(join(cwd, "pnpm-lock.yaml"));

		return {
			name: "pnpm",
			status: "pass",
			message: "pnpm workspace detected",
		};
	} catch {
		return {
			name: "pnpm",
			status: "fail",
			message: "pnpm lockfile is missing",
		};
	}
};
