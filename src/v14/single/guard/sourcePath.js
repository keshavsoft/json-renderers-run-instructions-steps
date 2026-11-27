import throwGuardError from "./error.js";

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const guardSourcePath = (key, step, context) => {
    const fail = (message) => throwGuardError(key, message, context);

    if (step.func === null) {
        return;
    }

    if (step.func === "applyTemplate" || step.func === "fromCollection") {
        if (!isNonEmptyString(step.sourcePath)) {
            fail("sourcePath must be a non-empty string");
        }
        return;
    }

    const sourcePath = step.sourcePath;
    if (!sourcePath || typeof sourcePath !== "object" || Array.isArray(sourcePath)) {
        fail("sourcePath must contain rows and columns paths");
    }

    if (!isNonEmptyString(sourcePath.rows) || !isNonEmptyString(sourcePath.columns)) {
        fail("sourcePath.rows and sourcePath.columns must be non-empty strings");
    }
};

export default guardSourcePath;
