import throwGuardError from "./error.js";

const supportedFuncs = new Set([
    null,
    "applyTemplate",
    "fromCollection",
    "rowOnColumn",
    "columnOnRow"
]);

const guardFunc = (key, step, context) => {
    const fail = (message) => throwGuardError(key, message, context);

    if (!step || typeof step !== "object" || Array.isArray(step)) {
        fail("expected an instruction object");
    }

    if (!supportedFuncs.has(step.func)) {
        fail(`unsupported or missing func "${step.func}"`);
    }
};

export default guardFunc;
