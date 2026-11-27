import spec from "https://keshavsoft.github.io/declarative-spec/json/v4/spec.json" with { type: "json" };

import "../../docs/dist/v13/min.js";

const navItems = [
    { href: "./table/", text: "Table (Search + Serial + Options)" },
    { href: "./form/", text: "Form (Data Entry)" },
    { href: "./select/", text: "Select (2D columnOnRow)" },
    { href: "./datalist/", text: "DataList (Autocomplete)" },
    { href: "./card/", text: "Card (0D Single & Multi)" },
    { href: "./accordion/", text: "Accordion (Collapsible FAQ)" },
    { href: "./list/", text: "List & List Groups" },
    { href: "./menu/", text: "Menu (Pills & Cards)" }
];

const cardItems = [
    {
        title: "Data Table",
        description: "Full table pipeline with search toolbar (single), serial column (multi + single), and row action buttons (options-show-button, options-show-edit-button).",
        href: "./table/",
        actionText: "Open Table Demo"
    },
    {
        title: "Data Entry Form",
        description: "Generates Bootstrap label + input form fields from columns.json inside formSimple using { type: 'single', key: 'buildFormField' }.",
        href: "./form/",
        actionText: "Open Form Demo"
    },
    {
        title: "Select Dropdowns",
        description: "Builds per-column <select> controls populated with option lists via 2D columnOnRow ({ type: 'single', key: 'buildSelectWithOptions' }).",
        href: "./select/",
        actionText: "Open Select Demo"
    },
    {
        title: "DataList Autocomplete",
        description: "Generates <datalist> elements via buildDataListWithOptions paired with live <input list='...'> autocomplete fields.",
        href: "./datalist/",
        actionText: "Open DataList Demo"
    },
    {
        title: "Cards (0D + Multi)",
        description: "Demonstrates 0D applyTemplate single steps (buildCardHeader, buildCardBody) and composite { type: 'multi', key: 'card-with-footer' }.",
        href: "./card/",
        actionText: "Open Card Demo"
    },
    {
        title: "Accordion",
        description: "Builds collapsible Bootstrap 5 accordion items using 1D fromCollection ({ type: 'single', key: 'buildAccordionItems' }).",
        href: "./accordion/",
        actionText: "Open Accordion Demo"
    },
    {
        title: "List & List Groups",
        description: "Renders unstyled lists (buildListItems), badge list groups (buildListGroupItems), and numbered ordered list groups.",
        href: "./list/",
        actionText: "Open List Demo"
    },
    {
        title: "Menu Patterns",
        description: "Showcases pill navigation (buildMenuItems) alongside responsive card grids (buildMenuCards) rendered by v13.",
        href: "./menu/",
        actionText: "Open Menu Demo"
    }
];

const start = () => {
    try {
        const navResult = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [{ type: "single", key: "buildMenuItems" }],
            base: structuredClone(spec?.menuSimple),
            data: { items: navItems },
            showLog: false
        });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: navResult,
            targetHtmlId: "dom-menu-nav",
            appendPosition: "replace",
            showLog: false
        });

        const cardsResult = window.ks.jsonRenderers.runInstructions.steps.runInstructions({
            instructions: [{ type: "single", key: "buildMenuCards" }],
            base: structuredClone(spec?.menuCardsBase),
            data: { items: cardItems },
            showLog: false
        });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: cardsResult,
            targetHtmlId: "dom-render-container",
            appendPosition: "replace",
            showLog: false
        });
    } catch (err) {
        console.error("V7 Showcase Menu error:", err);
        const container = document.getElementById("dom-render-container");
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        }
    }
};

start();
