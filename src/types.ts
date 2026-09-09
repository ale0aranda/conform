export type CheckStatus = "pass" | "fail" | "warn";

export interface CheckResult {
	id: string;
	name: string;
	status: CheckStatus;
	message: string;
}

export interface CheckContext {
	cwd: string;
}

export type Check = (
	context: CheckContext,
) => CheckResult | Promise<CheckResult>;
