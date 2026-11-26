import executeStep from "./executeStep.js";
import registerGlobal from "./registerGlobal/index.js";

/**
 * Task 1: Executes an array of blueprint instruction keys sequentially on base with data.
 */
const runInstructions = ({
    instructions = [],
    base,
    data,
    showLog = false
} = {}) => {
    instructions.forEach(key => {
        if (showLog) console.log(`[runStep] ${key}`);
        executeStep(key, { base, data }, showLog);
    });

    return base;
};

export { executeStep };
export default runInstructions;

registerGlobal(runInstructions);