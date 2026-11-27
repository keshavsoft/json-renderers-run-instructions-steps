import executeStep from "./executeStep.js";
import registerGlobal from "./registerGlobal/index.js";

/**
 * Executes an array of `{ type: "single" | "multi", key }` instruction descriptors sequentially on `base`.
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
