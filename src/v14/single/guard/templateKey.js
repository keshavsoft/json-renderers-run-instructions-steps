import spec from "declarative-spec";
import throwGuardError from "./error.js";

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const guardTemplateKey = (key, step, context) => {
    const fail = (message) => throwGuardError(key, message, context);

    const requireTemplate = (templateKey, fieldName) => {
        if (!isNonEmptyString(templateKey)) {
            fail(`${fieldName} must be a non-empty string`);
        }
        if (spec[templateKey] === undefined) {
            fail(`template was not found for ${fieldName} "${templateKey}"`);
        }
    };

    if (step.func === "rowOnColumn" || step.func === "columnOnRow") {
        const templateKey = step.templateKey;
        if (!templateKey || typeof templateKey !== "object" || Array.isArray(templateKey)) {
            fail("templateKey must contain rowKey and columnKey");
        }

        requireTemplate(templateKey.rowKey, "templateKey.rowKey");
        requireTemplate(templateKey.columnKey, "templateKey.columnKey");
        return;
    }

    requireTemplate(step.templateKey, "templateKey");
};

export default guardTemplateKey;
