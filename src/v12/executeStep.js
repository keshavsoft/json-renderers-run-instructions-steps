import spec from "declarative-spec";
import singleInstructions from "declarative-instructions-single";
import multiInstructions from "declarative-instructions-multi";

import fromCollection from "json-transformer-funcs-one-dimension";
import { rowOnColumn } from "json-transformer-funcs-two-dimensions";

import { query } from "jsonpathly";

const runSingleStep = (step, state, showLog = false) => {
    if (step.skipIf && query(state.base, step.skipIf, { returnArray: true }).length > 0) {
        return state;
    }

    const { templateKey, func, sourcePath, destinationPath } = step;

    if (func === "fromCollection") {
        const template = spec[templateKey];
        const source = query(state, sourcePath);
        const result = fromCollection(source, template);
        const target = query(state, destinationPath?.jsonPath, { returnArray: true });
        target[0]?.push(...result);
    } else if (func === "rowOnColumn") {
        const columns = query(state, sourcePath?.columns);
        const data = query(state, sourcePath?.rows);
        const result = rowOnColumn({
            columns,
            data,
            columnSpec: spec[templateKey?.columnKey],
            rowSpec: spec[templateKey?.rowKey]
        });
        const target = query(state, destinationPath?.jsonPath, { returnArray: true });
        target[0]?.push(...result);
    } else if (func === null) {
        const template = spec[templateKey];
        if (template === undefined) {
            throw new Error(`Instruction spec not found: ${templateKey}`);
        }

        const target = query(state, destinationPath?.jsonPath, { returnArray: true });
        const action = destinationPath?.action;

        if (action === "unshift") {
            target[0]?.unshift(structuredClone(template));
        } else if (action === "push") {
            target[0]?.push(structuredClone(template));
        } else if (action === "unshiftSerialToRows") {
            target[0]?.forEach((row, rowIndex) => {
                const item = structuredClone(template);
                item.textContent = rowIndex + 1;
                row?.children?.unshift(item);
            });
        } else if (action === "pushToRows") {
            target[0]?.forEach((row) => {
                const item = structuredClone(template);
                row?.children?.push(item);
            });
        }

        if (showLog) console.log("template : ", target, template);
    } else {
        throw new Error(`Unsupported instruction func: ${func}`);
    }

    if (showLog) console.log("state : ", state);
    return state;
};

const stepHandlers = {
    single: (key, state, showLog) => {
        const step = singleInstructions[key];
        if (!step) {
            throw new Error(`Single instruction not found: ${key}`);
        }
        runSingleStep(step, state, showLog);
    },
    multi: (key, state, showLog) => {
        const steps = multiInstructions[key];
        if (!Array.isArray(steps)) {
            throw new Error(`Multi instruction not found: ${key}`);
        }
        steps.forEach((step) => runSingleStep(step, state, showLog));
    }
};

/**
 * Executes one `{ type: "single" | "multi", key }` descriptor against `state`.
 */
const executeStep = (stepRef, state, showLog = false) => {
    if (!stepRef || typeof stepRef !== "object") {
        throw new Error(`Invalid instruction descriptor: expected { type, key }, got ${String(stepRef)}`);
    }

    const { type, key } = stepRef;
    const handler = stepHandlers[type];
    if (!handler) {
        throw new Error(`Unsupported instruction type "${type}" for key "${key}". Expected "single" or "multi".`);
    }

    handler(key, state, showLog);
    return state;
};

export default executeStep;
