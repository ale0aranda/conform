import { access } from "node:fs/promises";
import { join } from "node:path";

import type { Check } from "../types.js";

export const checkBiome: Check = async ({ cwd }) => {
	try {
		await access(join(cwd, "biome.json"));

		return {
			name: "Biome",
			status: "pass",
			message: "Biome configuration detected",
		};
	} catch {
		return {
			name: "Biome",
			status: "fail",
			message: "Biome configuration is missing",
		};
	}
};
