import runSingle from "./single/index.js";
import runMulti from "./multi/index.js";

const stepHandlers = {
    single: runSingle,
    multi: runMulti
};

/**
 * Pure orchestrator: inspects `{ type, key }` and delegates to `single/` or `multi/`.
 */
const executeStep = (stepRef, state, showLog = false) => {
    if (!stepRef || typeof stepRef !== "object") {
        throw new Error(`Invalid instruction descriptor: expected { type, key }, got ${String(stepRef)}`);
    }

    const { type, key } = stepRef;
    const handler = stepHandlers[type];
    if (!handler) {
        throw new Error(`Unsupported instruction type "${type}" for key "${key}". Expected "single" or "multi".`);
    }

    return handler(key, state, showLog);
};

export default executeStep;
