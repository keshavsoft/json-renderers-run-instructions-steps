import spec from "declarative-spec";
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

const applyStaticInstruction = (step, state, showLog = false) => {
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
};

export default applyStaticInstruction;
