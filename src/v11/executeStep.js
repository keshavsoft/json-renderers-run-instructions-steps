import spec from "declarative-spec";
import instructions from "declarative-instructions";

import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import { rowOnColumn, columnOnRow } from "json-transformer-funcs-two-dimensions";

import { query } from "jsonpathly";

const startFunc = (stepRef, state, showLog = false) => {
    const instruction = instructions[stepRef];

    if (Array.isArray(instruction)) {
        ifArray(instruction, state, showLog = false);
    } else {
        ifObject(instruction, state, showLog = false);
    };
};

const ifArray = (stepRef, state, showLog = false) => {
    stepRef.forEach(element => {
        ifObject(element, state, showLog);
    });
};

const ifObject = (instruction, state, showLog = false) => {
    const templateKey = instruction?.templateKey;

    const func = instruction.func;
    const sourcePath = instruction?.sourcePath;
    const destinationPath = instruction?.destinationPath;

    if (func === "fromCollection") {
        const template = spec[templateKey];
        const source = query(state, sourcePath);
        const result = fromCollection(source, template);

        let find = query(state, destinationPath?.jsonPath);

        find[0].push(...result);
    };

    if (func === "rowOnColumn") {
        const columns = query(state, sourcePath?.columns);
        const data = query(state, sourcePath?.rows);

        const columnSpec = spec[templateKey?.columnKey];
        const rowSpec = spec[templateKey?.rowKey];

        const result = rowOnColumn({
            columns, data, columnSpec, rowSpec
        });

        let find = query(state, destinationPath?.jsonPath);

        find[0].push(...result);
    };

    if (func === null) {
        const template = spec[templateKey];

        let find = query(state, destinationPath?.jsonPath, { returnArray: true });

        if (destinationPath?.action === "unshift") {
            find[0]?.unshift(structuredClone(template));
        };

        if (destinationPath?.action === "push") {
            find[0]?.push(structuredClone(template));
        };

        if (destinationPath?.action === "unshiftSerialToRows") {
            find[0]?.forEach((row, rowIndex) => {
                const item = structuredClone(template);
                item.textContent = rowIndex + 1;
                row.children.unshift(item);
            });
        };

        console.log("template : ", find, template);

    };

    console.log("state : ", state);

    return state;
};

export default startFunc;
