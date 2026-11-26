import spec from "declarative-spec";
import instructions from "declarative-instructions";

import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import { rowOnColumn, columnOnRow } from "json-transformer-funcs-two-dimensions";

import { hasDestination, hasMatch, resolveSource, writeResult } from "./helpers.js";

const runMatrix = (fn) => (instruction, { data }) => fn({
    columns: data?.columns,
    data,
    columnSpec: spec[instruction.templateKey.columnKey],
    rowSpec: spec[instruction.templateKey.rowKey]
});

const noFunc = (instruction) => {
    const template = spec[instruction.templateKey];
    if (template === undefined) {
        throw new Error(`Instruction spec not found: ${instruction.templateKey}`);
    }
    return structuredClone(template);
};

const types = {
    single: (instruction, state) => {
        const template = spec[instruction.templateKey];
        const source = resolveSource(instruction.sourcePath, state);
        const fn = instruction.func === "fromCollection" ? fromCollection : applyTemplate;
        return fn(source, template);
    },
    rowOnColumn: runMatrix(rowOnColumn),
    columnOnRow: runMatrix(columnOnRow),
    noFunc
};

/**
 * Executes an instruction key (single step or step array) against `state.base`.
 */
export const executeStep = (stepRef, state, showLog = false) => {
    const key = typeof stepRef === "string" ? stepRef : stepRef?.instructionKey;
    const entry = instructions[key];
    if (!entry) throw new Error(`Instruction not found: ${key}`);

    const steps = Array.isArray(entry) ? entry : [entry];
    let lastResult;

    for (const step of steps) {
        if (step.skipIf && hasMatch(state.base, step.skipIf)) continue;
        if (!hasDestination(state, step.destinationPath)) continue;

        const typeKey = step.type ?? "noFunc";
        const handler = types[typeKey];
        if (!handler) throw new Error(`Unsupported instruction type for ${key}: ${typeKey}`);

        lastResult = handler(step, state);
        writeResult(state, step.destinationPath, lastResult, showLog);
    }

    return lastResult;
};

export default executeStep;
