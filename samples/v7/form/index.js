import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };

import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../../docs/dist/v13/min.js";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        const localBase = structuredClone(spec?.formSimple);

        const result = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [
                { type: "single", key: "buildFormField" }
            ],
            base: localBase,
            data: { columns, data },
            showLog: true
        });
        console.log("result : ", result);

        window.ks.jsonToDom.appendToDom({
            jsonSpec: result,
            targetHtmlId, appendPosition: "replace", showLog: false
        });
    } catch (err) {
        console.error("V7 Form error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
