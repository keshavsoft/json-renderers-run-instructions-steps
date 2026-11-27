import applyStaticInstruction from "./applyStaticInstruction.js";
import buildResult from "./buildResult.js";
import readSource from "./readSource.js";
import shouldSkip from "./shouldSkip.js";
import writeResult from "./writeResult.js";

/**
 * Runs one instruction as a short sequence: skip, read, build, and write.
 */
const runStep = (step, state, showLog = false) => {
    if (shouldSkip(step, state)) {
        return state;
    }

    if (step.func === null) {
        return applyStaticInstruction(step, state, showLog);
    }

    const source = readSource(step, state);
    const result = buildResult(step, source);
    writeResult(step, state, result);

    if (showLog) console.log("state : ", state);
    return state;
};

export default runStep;
