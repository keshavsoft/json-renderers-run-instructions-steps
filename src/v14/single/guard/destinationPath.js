import throwGuardError from "./error.js";

const supportedStaticActions = new Set([
    "unshift",
    "push",
    "unshiftSerialToRows",
    "pushToRows"
]);

const guardDestinationPath = (key, step, context) => {
    const fail = (message) => throwGuardError(key, message, context);

    const destinationPath = step.destinationPath;
    if (!destinationPath || typeof destinationPath !== "object" || Array.isArray(destinationPath)) {
        fail("destinationPath must be an object");
    }

    if (typeof destinationPath.jsonPath !== "string" || destinationPath.jsonPath.trim().length === 0) {
        fail("destinationPath.jsonPath must be a non-empty string");
    }

    if (step.func === null && !supportedStaticActions.has(destinationPath.action)) {
        fail(`unsupported or missing destinationPath.action "${destinationPath.action}"`);
    }
};

export default guardDestinationPath;
