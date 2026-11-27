import spec from "declarative-spec";
import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import { rowOnColumn, columnOnRow } from "json-transformer-funcs-two-dimensions";

const resultBuilders = {
    applyTemplate: (step, source) => {
        const template = spec[step.templateKey];
        return applyTemplate(source, template);
    },
    fromCollection: (step, source) => {
        const template = spec[step.templateKey];
        return fromCollection(source, template);
    },
    rowOnColumn: (step, source) => rowOnColumn({
        columns: source.columns,
        data: source.rows,
        columnSpec: spec[step.templateKey?.columnKey],
        rowSpec: spec[step.templateKey?.rowKey]
    }),
    columnOnRow: (step, source) => columnOnRow({
        columns: source.columns,
        data: source.rows,
        columnSpec: spec[step.templateKey?.columnKey],
        rowSpec: spec[step.templateKey?.rowKey]
    })
};

const buildResult = (step, source) => {
    const build = resultBuilders[step.func];
    if (!build) {
        throw new Error(`Unsupported instruction func: ${step.func}`);
    }

    return build(step, source);
};

export default buildResult;
