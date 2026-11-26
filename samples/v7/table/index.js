import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };

import definitions from "https://keshavsoft.github.io/declarative-definitions/json/v5/definitions.json" with { type: "json" };
import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../../docs/dist/v8/min.js";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        // console.log("instructions : ",);

        const localInstructions = definitions?.table?.simpleSortable?.instructions;
        const localBaseFromSpec = definitions?.table?.simpleSortable?.baseFromSpec;

        const localBase = structuredClone(spec[localBaseFromSpec]);
        console.log("aaaaaaaaaa : ", localInstructions, localBase);
        const result = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: localInstructions,
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
        console.error("V7 Table error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
