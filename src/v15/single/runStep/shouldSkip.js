import { query } from "jsonpathly";

const shouldSkip = (step, state) => {
    return step.skipIf && query(state.base, step.skipIf, { returnArray: true }).length > 0;
};

export default shouldSkip;
