import meta from "./meta.js";

const registerGlobal = (runInstructions) => {
    if (typeof globalThis === "undefined" || !runInstructions) return;

    globalThis.ks ??= {};
    globalThis.ks.jsonRenderers ??= {};
    globalThis.ks.jsonRenderers.runInstructions ??= {};

    globalThis.ks.jsonRenderers.runInstructions.steps = {
        meta,
        runInstructions
    };
};

export default registerGlobal;