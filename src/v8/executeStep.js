import spec from "declarative-spec";
import instructions from "declarative-instructions";

import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";

import { rowOnColumn, columnOnRow } from "json-transformer-funcs-two-dimensions";

import { resolveSource, writeResult } from "./helpers.js";

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
    }
};

export const executeStep = (key, state, showLog = false) => {
    const instruction = instructions[key];
    const result = types[instruction.type](instruction, state);
    writeResult(state, instruction.destinationPath, result, showLog);
    return result;
};

export default executeStep;