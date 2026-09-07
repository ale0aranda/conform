import pc from "picocolors";

import type { CheckResult } from "./types.js";

const symbols = {
	brand: "✦",
	pass: "✓",
	warn: "!",
	fail: "×",
} as const;

const statusStyle = {
	pass: {
		symbol: symbols.pass,
		color: pc.green,
	},
	warn: {
		symbol: symbols.warn,
		color: pc.yellow,
	},
	fail: {
		symbol: symbols.fail,
		color: pc.red,
	},
} as const;

function pluralize(
	count: number,
	singular: string,
	plural = `${singular}s`,
): string {
	return count === 1 ? singular : plural;
}

function renderHeader(): void {
	console.log();

	console.log(`${pc.magenta(symbols.brand)} ${pc.bold(pc.magenta("conform"))}`);

	console.log(pc.dim("Repository standards"));

	console.log();
}

function renderCheck(result: CheckResult): void {
	const style = statusStyle[result.status];

	console.log(`${style.color(style.symbol)} ${pc.bold(result.name)}`);

	console.log(`  ${pc.dim(result.message)}`);

	console.log();
}

function renderSuccess(passed: number): void {
	console.log(
		pc.green(pc.bold(`${passed} ${pluralize(passed, "check")} passed`)),
	);

	console.log();

	console.log(
		`${pc.magenta(symbols.brand)} ${pc.bold(pc.green("Repository conforms"))}`,
	);

	console.log(`  ${pc.dim("Everything looks good.")}`);

	console.log();
}

function renderWarning(passed: number, warned: number): void {
	console.log(
		`${pc.green(
			`${passed} ${pluralize(passed, "check")} passed`,
		)} ${pc.dim("·")} ${pc.yellow(
			`${warned} ${pluralize(warned, "warning")}`,
		)}`,
	);

	console.log();

	console.log(
		`${pc.yellow(symbols.warn)} ${pc.bold(
			pc.yellow("Repository conforms with warnings"),
		)}`,
	);

	console.log(`  ${pc.dim("Review the warnings above.")}`);

	console.log();
}

function renderFailure(passed: number, warned: number, failed: number): void {
	const summary = [
		pc.green(`${passed} ${pluralize(passed, "check")} passed`),
		warned > 0
			? pc.yellow(`${warned} ${pluralize(warned, "warning")}`)
			: undefined,
		pc.red(`${failed} ${pluralize(failed, "check")} failed`),
	]
		.filter((value): value is string => value !== undefined)
		.join(` ${pc.dim("·")} `);

	console.log(summary);

	console.log();

	console.log(
		`${pc.red(symbols.fail)} ${pc.bold(pc.red("Repository does not conform"))}`,
	);

	console.log(`  ${pc.dim("Fix the failed checks and run conform again.")}`);

	console.log();
}

function renderSummary(results: CheckResult[]): void {
	const passed = results.filter((result) => result.status === "pass").length;

	const warned = results.filter((result) => result.status === "warn").length;

	const failed = results.filter((result) => result.status === "fail").length;

	if (failed > 0) {
		renderFailure(passed, warned, failed);
		return;
	}

	if (warned > 0) {
		renderWarning(passed, warned);
		return;
	}

	renderSuccess(passed);
}

export function reportResults(results: CheckResult[]): void {
	renderHeader();

	for (const result of results) {
		renderCheck(result);
	}

	renderSummary(results);
}
