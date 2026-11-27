import guardSingleStep from "../../single/guard/index.js";

const guardMultiSteps = (key, steps) => {
    if (!Array.isArray(steps)) {
        throw new Error(`Multi instruction not found: ${key}`);
    }

    steps.forEach((step, stepIndex) => {
        guardSingleStep(key, step, { type: "multi", stepIndex });
    });

    return steps;
};

export default guardMultiSteps;
