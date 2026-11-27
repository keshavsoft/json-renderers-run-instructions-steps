import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../../docs/dist/v13/min.js";

const navItems = [
    { href: "../table/", text: "Table Demo" },
    { href: "../form/", text: "Form Demo" },
    { href: "../select/", text: "Select Demo" },
    { href: "../datalist/", text: "DataList Demo" },
    { href: "../card/", text: "Card Demo" },
    { href: "../accordion/", text: "Accordion Demo" },
    { href: "../list/", text: "List Demo" }
];

const cardItems = [
    { title: "Table", description: "Searchable grid with serial & row buttons.", href: "../table/", actionText: "Open Table" },
    { title: "Form", description: "Column-driven data entry inputs.", href: "../form/", actionText: "Open Form" },
    { title: "Select", description: "Dropdown option matrices.", href: "../select/", actionText: "Open Select" },
    { title: "DataList", description: "Browser native input autocomplete.", href: "../datalist/", actionText: "Open DataList" },
    { title: "Card", description: "0D applyTemplate single & multi cards.", href: "../card/", actionText: "Open Card" },
    { title: "Accordion", description: "Collapsible FAQ sections.", href: "../accordion/", actionText: "Open Accordion" }
];

const start = () => {
    try {
        const pills = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [{ type: "single", key: "buildMenuItems" }],
            base: structuredClone(spec?.menuSimple),
            data: { items: navItems },
            showLog: true
        });
        window.ks.jsonToDom.appendToDom({
            jsonSpec: pills,
            targetHtmlId: "dom-menu-pills",
            appendPosition: "replace",
            showLog: false
        });

        const cards = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [{ type: "single", key: "buildMenuCards" }],
            base: structuredClone(spec?.menuCardsBase),
            data: { items: cardItems },
            showLog: true
        });
        window.ks.jsonToDom.appendToDom({
            jsonSpec: cards,
            targetHtmlId: "dom-menu-cards",
            appendPosition: "replace",
            showLog: false
        });
    } catch (err) {
        console.error("V7 Menu error:", err);
    }
};

start();
