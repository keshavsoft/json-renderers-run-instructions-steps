import spec from "declarative-spec";
import instructions from "declarative-instructions";

import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";

import { rowOnColumn, columnOnRow } from "json-transformer-funcs-two-dimensions";

import { hasDestination, hasMatch, resolveSource, writeResult } from "./helpers.js";

const types = {
    single: (instruction, state) => {
        const template = spec[instruction.templateKey];
        const source = resolveSource(instruction.sourcePath, state);
        const fn = instruction.func === "fromCollection" ? fromCollection : applyTemplate;
        return fn(source, template);
    },
    rowOnColumn: (instruction, { data }) => {
        return rowOnColumn({
            columns: data?.columns,
            data,
            columnSpec: spec[instruction.templateKey.columnKey],
            rowSpec: spec[instruction.templateKey.rowKey]
        });
    },
    columnOnRow: (instruction, { data }) => {
        return columnOnRow({
            columns: data?.columns,
            data,
            columnSpec: spec[instruction.templateKey.columnKey],
            rowSpec: spec[instruction.templateKey.rowKey]
        });
    },
    writeBundle: (steps, state, showLog = false) => {
        for (const step of steps) {
            if (step.skipIf && hasMatch(state.base, step.skipIf)) continue;
            if (!hasDestination(state, step.destinationPath)) continue;

            const template = spec[step.templateKey];
            if (template === undefined) {
                throw new Error(`Instruction spec not found: ${step.templateKey}`);
            }

            writeResult(state, step.destinationPath, structuredClone(template), showLog);
            if (showLog && step.narration) console.log(step.narration);
        }
    }
};

/**
 * Executes a single blueprint instruction or option write-bundle by key.
 */
export const executeStep = (stepRef, state, showLog = false) => {
    const key = typeof stepRef === "string" ? stepRef : stepRef?.instructionKey;
    const instruction = instructions[key];
    if (!instruction) {
        throw new Error(`Instruction not found: ${key}`);
    }

    if (Array.isArray(instruction)) {
        return types.writeBundle(instruction, state, showLog);
    }

    const handler = types[instruction.type];
    if (!handler) {
        throw new Error(`Unsupported instruction type for ${key}: ${instruction.type}`);
    }

    const result = handler(instruction, state);
    writeResult(state, instruction.destinationPath, result, showLog);
    return result;
};

export default executeStep;
