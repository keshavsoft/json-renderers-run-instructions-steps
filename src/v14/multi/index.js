import multiInstructions from "declarative-instructions-multi";
import guardMultiSteps from "./guard/index.js";
import runStep from "../single/runStep.js";

/**
 * Executes a multi-step instruction array from `declarative-instructions-multi` sequentially.
 */
const runMulti = (key, state, showLog = false) => {
    const steps = multiInstructions[key];
    const guardedSteps = guardMultiSteps(key, steps);

    guardedSteps.forEach((step) => runStep(step, state, showLog));
    return state;
};

export default runMulti;
