import { checkBiome } from "./checks/biome.js";
import { checkPackageJson } from "./checks/package-json.js";
import { checkPackageManager } from "./checks/package-manager.js";
import { checkRules } from "./checks/rules.js";
import { checkTypeScript } from "./checks/typescript.js";

import type { CheckResult } from "./types.js";

const checks = [
	checkPackageJson,
	checkPackageManager,
	checkRules,
	checkBiome,
	checkTypeScript,
];

export async function runChecks(cwd: string): Promise<CheckResult[]> {
	return Promise.all(checks.map((check) => check({ cwd })));
}

export type {
	Check,
	CheckContext,
	CheckResult,
	CheckStatus,
} from "./types.js";
