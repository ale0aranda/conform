import { checkBiome } from "./checks/biome.js";
import { checkGit } from "./checks/git.js";
import { checkNode } from "./checks/node.js";
import { checkPackageJson } from "./checks/package-json.js";
import { checkPackageManager } from "./checks/package-manager.js";
import { checkRules } from "./checks/rules.js";
import { checkScripts } from "./checks/scripts.js";
import { checkTypeScript } from "./checks/typescript.js";

import type { CheckResult } from "./types.js";

const checks = [
	checkPackageJson,
	checkPackageManager,
	checkRules,
	checkBiome,
	checkTypeScript,
	checkNode,
	checkGit,
	checkScripts,
];

export async function runChecks(cwd: string): Promise<CheckResult[]> {
	const context = { cwd };

	return Promise.all(checks.map((check) => check(context)));
}

export type {
	Check,
	CheckContext,
	CheckResult,
	CheckStatus,
} from "./types.js";
