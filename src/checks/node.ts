import type { Check } from "../types.js";

const MIN_NODE_VERSION = [22, 13, 0] as const;

function parseVersion(version: string): [number, number, number] {
	const [major = 0, minor = 0, patch = 0] = version
		.replace(/^v/, "")
		.split(".")
		.map(Number);

	return [major, minor, patch];
}

function isSupportedVersion(version: string): boolean {
	const current = parseVersion(version);

	for (let i = 0; i < MIN_NODE_VERSION.length; i++) {
		if (current[i] > MIN_NODE_VERSION[i]) {
			return true;
		}

		if (current[i] < MIN_NODE_VERSION[i]) {
			return false;
		}
	}

	return true;
}

export const checkNode: Check = () => {
	const version = process.versions.node;

	if (isSupportedVersion(version)) {
		return {
			id: "node",
			name: "Node.js",
			status: "pass",
			message: `Node.js ${version} detected`,
		};
	}

	return {
		id: "node",
		name: "Node.js",
		status: "fail",
		message: `Node.js >= ${MIN_NODE_VERSION.join(".")} is required`,
	};
};
