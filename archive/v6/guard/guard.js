import spec from "declarative-spec";

const guardFunc = (inConfig) => {
    if (!inConfig || typeof inConfig !== "object" || Array.isArray(inConfig)) {
        throw new TypeError("Config must be an object");
    }

    const { baseKey, instructions } = inConfig;

    if (typeof baseKey !== "string" || !baseKey.trim()) {
        throw new TypeError("baseKey must be a non-empty string");
    }

    if (!(baseKey in spec)) {
        throw new Error(`baseKey "${baseKey}" does not exist in declarative-spec`);
    }

    if (!Array.isArray(instructions)) {
        throw new TypeError("instructions must be an Array");
    }

    if (instructions.length === 0) {
        throw new Error("instructions cannot be empty");
    }

    for (let i = 0; i < instructions.length; i++) {
        if (typeof instructions[i] !== "string" || !instructions[i].trim()) {
            throw new TypeError(`instructions[${i}] must be a non-empty string`);
        }
    }

    return true;
};

export default guardFunc;
