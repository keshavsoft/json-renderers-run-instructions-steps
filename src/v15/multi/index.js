import guardMultiSteps from "./guard/index.js";
import readInstructionSteps from "./readInstructionSteps.js";
import runStepsInOrder from "./runStepsInOrder.js";

/**
 * Executes a multi-step instruction array from `declarative-instructions-multi` sequentially.
 */
const runMulti = (key, state, showLog = false) => {
    const steps = readInstructionSteps(key);
    const guardedSteps = guardMultiSteps(key, steps);

    return runStepsInOrder(guardedSteps, state, showLog);
};

export default runMulti;
