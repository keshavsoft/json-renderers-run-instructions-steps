const throwGuardError = (key, message, context = {}) => {
    if (context.type === "multi") {
        throw new Error(`Invalid multi instruction "${key}" at step ${context.stepIndex + 1}: ${message}`);
    }

    throw new Error(`Invalid single instruction "${key}": ${message}`);
};

export default throwGuardError;
