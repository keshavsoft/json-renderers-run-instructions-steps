import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../../docs/dist/v13/min.js";

const items = [
    { text: "Fasteners — High Tensile Bolt", badge: "1200 kgs" },
    { text: "Raw Materials — Galvanized Wire Coil", badge: "1450 kgs" },
    { text: "Raw Materials — Stainless Steel Rod", badge: "890 pcs" }
];

const start = () => {
    try {
        const simple = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [{ type: "single", key: "buildListItems" }],
            base: structuredClone(spec?.listSimple),
            data: { items },
            showLog: true
        });
        window.ks.jsonToDom.appendToDom({
            jsonSpec: simple,
            targetHtmlId: "dom-list-simple",
            appendPosition: "replace",
            showLog: false
        });

        const group = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [{ type: "single", key: "buildListGroupItems" }],
            base: structuredClone(spec?.listGroup),
            data: { items },
            showLog: true
        });
        window.ks.jsonToDom.appendToDom({
            jsonSpec: group,
            targetHtmlId: "dom-list-group",
            appendPosition: "replace",
            showLog: false
        });

        const ordered = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [{ type: "single", key: "buildListGroupItems" }],
            base: structuredClone(spec?.listOrdered),
            data: { items },
            showLog: true
        });
        window.ks.jsonToDom.appendToDom({
            jsonSpec: ordered,
            targetHtmlId: "dom-list-ordered",
            appendPosition: "replace",
            showLog: false
        });
    } catch (err) {
        console.error("V7 List error:", err);
    }
};

start();
