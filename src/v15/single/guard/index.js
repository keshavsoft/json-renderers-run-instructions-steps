import guardFunc from "./func.js";
import guardDestinationPath from "./destinationPath.js";
import guardTemplateKey from "./templateKey.js";
import guardSourcePath from "./sourcePath.js";

const guardSingleStep = (key, step, context = { type: "single" }) => {
    guardFunc(key, step, context);
    guardDestinationPath(key, step, context);
    guardTemplateKey(key, step, context);
    guardSourcePath(key, step, context);
    return step;
};

export { guardDestinationPath, guardFunc, guardSourcePath, guardTemplateKey };
export default guardSingleStep;
