import executeStep from "./executeStep.js";
import spec from "declarative-spec";
import guardFunc from "./guard/index.js";
import registerGlobal from "./registerGlobal/index.js";

/**
 * Task 1: Executes an array of blueprint instruction keys sequentially on base with data.
 */
const runInstructions = (inConfig = {}) => {
    guardFunc(inConfig);

    const {
        instructions = [],
        baseKey,
        data,
        showLog = false
    } = inConfig;

    const base = spec[baseKey];

    instructions.forEach(key => {
        if (showLog) console.log(`[runStep] ${key}`);
        executeStep(key, { base, data }, showLog);
    });

    return base;
};

export { executeStep, guardFunc };
export default runInstructions;

registerGlobal(runInstructions);