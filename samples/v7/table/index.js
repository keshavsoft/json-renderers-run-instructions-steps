import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };

import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../../docs/dist/v14/min.js";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        const localBase = structuredClone(spec?.tableWithFooter);

        const result = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [
                { type: "single", key: "buildColgroup" },
                { type: "single", key: "buildHeader" },
                { type: "single", key: "buildBody" },
                { type: "single", key: "buildFooter" },
                { type: "single", key: "set-search" },
                { type: "single", key: "search-show-label" },
                { type: "single", key: "search-show-helper" },
                { type: "single", key: "search-show-input" },
                { type: "multi", key: "set-serial" },
                { type: "single", key: "serial-show-serial" },
                { type: "multi", key: "options-show-button" },
                { type: "multi", key: "options-show-edit-button" }
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
        console.error("V7 Table error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
