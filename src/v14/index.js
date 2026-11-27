import executeStep from "./executeStep.js";
import registerGlobal from "./registerGlobal/index.js";

/**
 * Executes an ordered array of `{ type: "single" | "multi", key }` descriptors on `base`.
 */
const runInstructions = ({
    instructions = [],
    base,
    data,
    showLog = false
} = {}) => {
    instructions.forEach(step => {
        executeStep(step, { base, data }, showLog);
    });

    return base;
};

export { executeStep };
export default runInstructions;

registerGlobal(runInstructions);
