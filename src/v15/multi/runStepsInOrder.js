import runStep from "../single/runStep.js";

const runStepsInOrder = (steps, state, showLog = false) => {
    for (const step of steps) {
        runStep(step, state, showLog);
    }

    return state;
};

export default runStepsInOrder;
