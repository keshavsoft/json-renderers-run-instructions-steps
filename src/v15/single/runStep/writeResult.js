import { query } from "jsonpathly";

const writeResult = (step, state, result) => {
    const target = query(state, step.destinationPath?.jsonPath, { returnArray: true });

    if (step.func === "applyTemplate") {
        target[0]?.push(result);
        return;
    }

    target[0]?.push(...result);
};

export default writeResult;
