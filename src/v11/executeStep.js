import spec from "declarative-spec";
import instructions from "declarative-instructions";

import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import { rowOnColumn, columnOnRow } from "json-transformer-funcs-two-dimensions";

import { query } from "jsonpathly";

export const executeStep = (stepRef, state, showLog = false) => {
    console.log("stepRef-------- : ", stepRef);

    const instruction = instructions[stepRef];
    const templateKey = instruction?.templateKey;

    const func = instruction?.func;
    const sourcePath = instruction?.sourcePath;
    const destinationPath = instruction?.destinationPath;

    if (func === "fromCollection") {
        const template = spec[templateKey];
        const source = query(state, sourcePath);
        const result = fromCollection(source, template);

        let find = query(state, destinationPath);

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

        let find = query(state, destinationPath);

        find[0].push(...result);
    };

    return state;
};

export default executeStep;
