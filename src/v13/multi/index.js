import multiInstructions from "declarative-instructions-multi";
import runStep from "../single/runStep.js";

/**
 * Executes a multi-step instruction array from `declarative-instructions-multi` sequentially.
 */
const runMulti = (key, state, showLog = false) => {
    const steps = multiInstructions[key];
    if (!Array.isArray(steps)) {
        throw new Error(`Multi instruction not found: ${key}`);
    }

    steps.forEach((step) => runStep(step, state, showLog));
    return state;
};

export default runMulti;
