import singleInstructions from "declarative-instructions-single";
import runStep from "./runStep.js";

/**
 * Executes one atomic instruction from `declarative-instructions-single`.
 */
const runSingle = (key, state, showLog = false) => {
    const step = singleInstructions[key];
    if (!step) {
        throw new Error(`Single instruction not found: ${key}`);
    }

    return runStep(step, state, showLog);
};

export { runStep };
export default runSingle;
