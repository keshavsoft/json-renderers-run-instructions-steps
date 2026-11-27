import { query } from "jsonpathly";

const sourceReaders = {
    applyTemplate: (step, state) => query(state, step.sourcePath),
    fromCollection: (step, state) => query(state, step.sourcePath),
    rowOnColumn: (step, state) => ({
        columns: query(state, step.sourcePath?.columns),
        rows: query(state, step.sourcePath?.rows)
    }),
    columnOnRow: (step, state) => ({
        columns: query(state, step.sourcePath?.columns),
        rows: query(state, step.sourcePath?.rows)
    })
};

const readSource = (step, state) => {
    const read = sourceReaders[step.func];
    if (!read) {
        throw new Error(`Unsupported instruction func: ${step.func}`);
    }

    return read(step, state);
};

export default readSource;
