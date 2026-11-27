import spec from "declarative-spec";
import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import { rowOnColumn, columnOnRow } from "json-transformer-funcs-two-dimensions";
import { query } from "jsonpathly";

const staticWriteActions = {
    unshift: (target, template) => target?.unshift(structuredClone(template)),
    push: (target, template) => target?.push(structuredClone(template)),
    unshiftSerialToRows: (target, template) => {
        target?.forEach((row, rowIndex) => {
            const item = structuredClone(template);
            item.textContent = rowIndex + 1;
            row?.children?.unshift(item);
        });
    },
    pushToRows: (target, template) => {
        target?.forEach((row) => {
            row?.children?.push(structuredClone(template));
        });
    }
};

const funcHandlers = {
    applyTemplate: (step, state) => {
        const template = spec[step.templateKey];
        const source = query(state, step.sourcePath);
        const result = applyTemplate(source, template);
        const target = query(state, step.destinationPath?.jsonPath, { returnArray: true });
        target[0]?.push(result);
    },
    fromCollection: (step, state) => {
        const template = spec[step.templateKey];
        const source = query(state, step.sourcePath);
        const result = fromCollection(source, template);
        const target = query(state, step.destinationPath?.jsonPath, { returnArray: true });
        target[0]?.push(...result);
    },
    rowOnColumn: (step, state) => {
        const columns = query(state, step.sourcePath?.columns);
        const data = query(state, step.sourcePath?.rows);
        const result = rowOnColumn({
            columns,
            data,
            columnSpec: spec[step.templateKey?.columnKey],
            rowSpec: spec[step.templateKey?.rowKey]
        });
        const target = query(state, step.destinationPath?.jsonPath, { returnArray: true });
        target[0]?.push(...result);
    },
    columnOnRow: (step, state) => {
        const columns = query(state, step.sourcePath?.columns);
        const rows = query(state, step.sourcePath?.rows);
        const result = columnOnRow({
            columns,
            data: rows,
            columnSpec: spec[step.templateKey?.columnKey],
            rowSpec: spec[step.templateKey?.rowKey]
        });
        const target = query(state, step.destinationPath?.jsonPath, { returnArray: true });
        target[0]?.push(...result);
    }
};

/**
 * Executes one resolved atomic instruction object against `state`.
 */
const runStep = (step, state, showLog = false) => {
    if (step.skipIf && query(state.base, step.skipIf, { returnArray: true }).length > 0) {
        return state;
    }

    if (step.func === null) {
        const template = spec[step.templateKey];
        if (template === undefined) {
            throw new Error(`Instruction spec not found: ${step.templateKey}`);
        }

        const target = query(state, step.destinationPath?.jsonPath, { returnArray: true });
        const action = staticWriteActions[step.destinationPath?.action];
        action?.(target[0], template);

        if (showLog) console.log("template : ", target, template);
        if (showLog) console.log("state : ", state);
        return state;
    }

    const handler = funcHandlers[step.func];
    if (!handler) {
        throw new Error(`Unsupported instruction func: ${step.func}`);
    }

    handler(step, state);
    if (showLog) console.log("state : ", state);
    return state;
};

export default runStep;
