import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };
import "../../../docs/dist/v7/min.js";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        const localInstructions = window.ks.declarative.definitions.data.table.simple.instructions;
        const localBaseFromSpec = window.ks.declarative.definitions.data.table.simple.baseFromSpec;
        const localBase = structuredClone(window.ks.declarative.spec.data[localBaseFromSpec]);

        const result = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: localInstructions,
            base: localBase,
            data: { columns, data },
            showLog: false
        });
        console.log("result : ", result);

        window.ks.jsonToDom.appendToDom({
            jsonSpec: result,
            targetHtmlId, appendPosition: "replace", showLog: false
        });
    } catch (err) {
        console.error("V7 Table error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
