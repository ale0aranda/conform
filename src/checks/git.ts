import { access } from "node:fs/promises";
import { join } from "node:path";

import type { Check } from "../types.js";

export const checkGit: Check = async ({ cwd }) => {
	try {
		await access(join(cwd, ".git"));

		return {
			id: "git",
			name: "Git",
			status: "pass",
			message: "Git repository detected",
		};
	} catch {
		return {
			id: "git",
			name: "Git",
			status: "fail",
			message: "Git repository is missing",
		};
	}
};
