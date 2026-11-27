import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../../docs/dist/v13/min.js";

const targetHtmlId = "dom-render-container";

const items = [
    {
        id: "one",
        title: "1. Pure Orchestration Layer (v13)",
        content: "executeStep.js inspects { type, key } descriptors and routes straight to single/index.js or multi/index.js without duplicating AST transformation logic."
    },
    {
        id: "two",
        title: "2. Atomic Single vs Composite Multi Catalogs",
        content: "declarative-instructions-single holds single-write blueprints, while declarative-instructions-multi holds cross-slot macros like set-serial, options-show-button, and card-with-footer."
    },
    {
        id: "three",
        title: "3. Canvas In-Place Mutation",
        content: "Callers clone a spec canvas once and pass it into runInstructions({ instructions, base, data }). Every step mutates the same base canvas and hands it back to json-to-dom."
    }
];

const start = () => {
    try {
        const result = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [
                { type: "single", key: "buildAccordionItems" }
            ],
            base: structuredClone(spec?.accordionSimple),
            data: { items },
            showLog: true
        });
        console.log("result : ", result);

        window.ks.jsonToDom.appendToDom({
            jsonSpec: result,
            targetHtmlId,
            appendPosition: "replace",
            showLog: false
        });
    } catch (err) {
        console.error("V7 Accordion error:", err);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
