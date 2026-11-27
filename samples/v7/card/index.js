import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../../docs/dist/v13/min.js";

const start = () => {
    try {
        const singleCard = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [
                { type: "single", key: "buildCardHeader" },
                { type: "single", key: "buildCardBody" }
            ],
            base: structuredClone(spec?.cardWithHeader),
            data: {
                headerTitle: "Inventory Summary (Single Steps)",
                title: "0.09/30mm High Tensile Bolt",
                text: "Category: Fasteners — 1200.00/kgs opening rate, currently in stock."
            },
            showLog: true
        });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: singleCard,
            targetHtmlId: "dom-card-single",
            appendPosition: "replace",
            showLog: false
        });

        const multiCard = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [
                { type: "multi", key: "card-with-footer" }
            ],
            base: structuredClone(spec?.cardWithFooter),
            data: {
                headerTitle: "Supplier Notice (Multi Step)",
                title: "0.11-25 Galvanized Wire Coil",
                text: "Category: Raw Materials — zinc coated anti-corrosive wire coil.",
                footerText: "Populated via { type: 'multi', key: 'card-with-footer' }"
            },
            showLog: true
        });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: multiCard,
            targetHtmlId: "dom-card-multi",
            appendPosition: "replace",
            showLog: false
        });
    } catch (err) {
        console.error("V7 Card error:", err);
    }
};

start();
