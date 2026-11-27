// node_modules/declarative-instructions-single/src/v4/index.js
var e = {
	"serial-show-serial": {
		narration: "Prepend the serial number cell into each table body row.",
		destinationPath: {
			action: "unshiftSerialToRows",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
		},
		sourcePath: null,
		templateKey: "buildBodyCell",
		func: null
	},
	"search-show-helper": {
		narration: "Insert the search helper text into its configured slot.",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-helper-slot'].children"
		},
		sourcePath: null,
		templateKey: "searchHelper",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'search-feedback']"
	},
	"search-show-input": {
		narration: "Insert the search input into its configured slot.",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-input-slot'].children"
		},
		sourcePath: null,
		templateKey: "searchInput",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'tableSearch']"
	},
	"search-show-label": {
		narration: "Insert the search label into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-label-slot'].children"
		},
		sourcePath: null,
		templateKey: "searchLabel",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'table-title']"
	},
	"set-search": {
		narration: "Insert the search toolbar frame before the table when a search feature is enabled.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$.base.children"
		},
		sourcePath: null,
		templateKey: "searchToolbar",
		func: null,
		skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
	},
	buildHeaderClickable: {
		type: "single",
		narration: "Build table header",
		destinationPath: { jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children" },
		sourcePath: "$.data.columns",
		templateKey: "tableHeaderClickable",
		func: "fromCollection"
	},
	buildColgroup: {
		narration: "Build column widths",
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		sourcePath: {
			rows: "$.data.data",
			columns: "$.data.columns"
		},
		destinationPath: { jsonPath: "$..*[?@.attributes['data-role'] == 'table-body'].children" },
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		},
		func: "rowOnColumn"
	},
	buildFormField: {
		type: "single",
		narration: "Build form fields from columns",
		destinationPath: { jsonPath: "$.base..*[?@.attributes['data-role'] == 'form-body'].children" },
		sourcePath: "$.data.columns",
		templateKey: "buildFormField",
		func: "fromCollection"
	},
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		sourcePath: {
			columns: "$.data.columns",
			rows: "$.data.data"
		},
		destinationPath: { jsonPath: "$.base.children" },
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		},
		func: "columnOnRow"
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.data",
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: { jsonPath: "$.base" },
		sourcePath: "$.data.data",
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildDataListWithOptions: {
		type: "columnOnRow",
		narration: "Build datalists with options",
		sourcePath: {
			columns: "$.data.columns",
			rows: "$.data.data"
		},
		destinationPath: { jsonPath: "$.base.children" },
		templateKey: {
			columnKey: "buildDataList",
			rowKey: "buildOption"
		},
		func: "columnOnRow"
	},
	buildAccordionItems: {
		type: "single",
		narration: "Build accordion items from array",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildAccordionItem",
		func: "fromCollection"
	},
	buildCardBody: {
		type: "single",
		narration: "Build card body content",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-body'].children"
		},
		sourcePath: "$.data",
		templateKey: "buildCardBodyTemplate",
		func: "applyTemplate"
	},
	buildCardHeader: {
		type: "single",
		narration: "Build card header content",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-header'].children"
		},
		sourcePath: "$.data",
		templateKey: "buildCardHeaderTemplate",
		func: "applyTemplate"
	},
	buildCardFooter: {
		type: "single",
		narration: "Build card footer content",
		destinationPath: {
			action: "push",
			jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-footer'].children"
		},
		sourcePath: "$.data",
		templateKey: "buildCardFooterTemplate",
		func: "applyTemplate"
	},
	buildListItems: {
		type: "single",
		narration: "Build simple list items",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildListItemTemplate",
		func: "fromCollection"
	},
	buildListGroupItems: {
		type: "single",
		narration: "Build list-group items",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildListGroupItemTemplate",
		func: "fromCollection"
	},
	buildMenuItems: {
		type: "single",
		narration: "Build navigation menu items",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildMenuItemTemplate",
		func: "fromCollection"
	},
	buildMenuCards: {
		type: "single",
		narration: "Build menu cards grid",
		destinationPath: { jsonPath: "$.base.children" },
		sourcePath: "$.data.items",
		templateKey: "buildMenuCardItemTemplate",
		func: "fromCollection"
	}
}, t = (e, t, n = {}) => {
	throw n.type === "multi" ? Error(`Invalid multi instruction "${e}" at step ${n.stepIndex + 1}: ${t}`) : Error(`Invalid single instruction "${e}": ${t}`);
}, n = /* @__PURE__ */ new Set([
	null,
	"applyTemplate",
	"fromCollection",
	"rowOnColumn",
	"columnOnRow"
]), r = (e, r, i) => {
	let a = (n) => t(e, n, i);
	(!r || typeof r != "object" || Array.isArray(r)) && a("expected an instruction object"), n.has(r.func) || a(`unsupported or missing func "${r.func}"`);
}, i = /* @__PURE__ */ new Set([
	"unshift",
	"push",
	"unshiftSerialToRows",
	"pushToRows"
]), a = (e, n, r) => {
	let a = (n) => t(e, n, r), o = n.destinationPath;
	(!o || typeof o != "object" || Array.isArray(o)) && a("destinationPath must be an object"), (typeof o.jsonPath != "string" || o.jsonPath.trim().length === 0) && a("destinationPath.jsonPath must be a non-empty string"), n.func === null && !i.has(o.action) && a(`unsupported or missing destinationPath.action "${o.action}"`);
}, o = {
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tableSearchBar: {
		tagName: "div",
		attributes: { class: "row mb-3 align-items-center" },
		children: [
			{
				tagName: "div",
				attributes: { class: "col-md-4 d-flex align-items-center" },
				children: [{
					tagName: "h6",
					attributes: {
						class: "mb-0 fw-semibold text-secondary",
						id: "table-title"
					},
					textContent: "Items"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
				children: [{
					tagName: "span",
					attributes: {
						id: "search-feedback",
						class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
					},
					textContent: "Showing all records"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4" },
				children: [{
					tagName: "div",
					attributes: { class: "input-group" },
					children: [{
						tagName: "span",
						attributes: { class: "input-group-text bg-white" },
						children: [{
							tagName: "i",
							attributes: { class: "bi bi-search" },
							textContent: "🔍"
						}]
					}, {
						tagName: "input",
						attributes: {
							type: "text",
							id: "tableSearch",
							class: "form-control",
							placeholder: "Search table..."
						}
					}]
				}]
			}
		]
	},
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	tableHeaderClickable: {
		tagName: "th",
		attributes: {
			class: "py-3 px-3 fw-semibold text-uppercase small user-select-none",
			role: "button",
			tabindex: "0",
			style: "cursor: pointer;",
			"data-column": "${columnName}",
			"data-sort-order": "none",
			"data-role": "sortable-header"
		},
		children: [{
			tagName: "span",
			attributes: { class: "d-inline-flex align-items-center gap-2" },
			children: [{
				tagName: "span",
				textContent: "${columnName}"
			}, {
				tagName: "span",
				textContent: "⇅",
				attributes: {
					class: "small opacity-75",
					"data-role": "sort-indicator"
				}
			}]
		}]
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-withSearch-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-withSearch-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableBodyOnly: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-tag-id"
		},
		children: [{
			tagName: "tbody",
			attributes: {
				"data-role": "table-body",
				id: "table-body-id"
			},
			children: []
		}]
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-colgroup-id"
				},
				children: []
			}, {
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-row-id"
					},
					children: []
				}]
			}]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	selectBase: {
		tagName: "div",
		attributes: {
			"data-role": "select-container",
			id: "select-base-id"
		},
		children: []
	},
	dataListBase: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-base-id"
		},
		children: []
	},
	dataListSimple: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-simple-id"
		},
		children: []
	},
	selectOptionsOnlyBase: [],
	searchInputBase: {
		tagName: "div",
		attributes: {
			class: "d-flex align-items-center gap-2",
			id: "search-input-base-id"
		},
		children: [{
			tagName: "label",
			textContent: "${label}",
			attributes: {
				class: "form-label mb-0 text-nowrap fw-semibold",
				for: "${id}",
				id: "search-input-label-id"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "search",
				placeholder: "${placeholder}",
				class: "form-control",
				id: "search-input-field-id"
			}
		}]
	},
	formBase: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-base-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-base-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-base-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-base-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-base-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-base-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-base-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-base-submit-button-id"
					}
				}]
			}
		]
	},
	formSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-simple-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-simple-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-simple-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-simple-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-simple-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-simple-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-simple-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-simple-submit-button-id"
					}
				}]
			}
		]
	},
	searchToolbar: {
		tagName: "div",
		attributes: {
			class: "row mb-3 align-items-center",
			"data-role": "search-toolbar"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 d-flex align-items-center",
					"data-role": "search-label-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 text-center d-flex align-items-center justify-content-center",
					"data-role": "search-helper-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4",
					"data-role": "search-input-slot"
				},
				children: []
			}
		]
	},
	searchLabel: {
		tagName: "h6",
		textContent: "Items",
		attributes: {
			class: "mb-0 fw-semibold text-secondary",
			id: "table-title"
		}
	},
	searchHelper: {
		tagName: "span",
		textContent: "Showing all records",
		attributes: {
			id: "search-feedback",
			class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
		}
	},
	searchInput: {
		tagName: "div",
		attributes: { class: "input-group" },
		children: [{
			tagName: "span",
			attributes: { class: "input-group-text bg-white" },
			children: [{
				tagName: "i",
				attributes: { class: "bi bi-search" },
				textContent: "🔍"
			}]
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "tableSearch",
				class: "form-control",
				placeholder: "Search table..."
			}
		}]
	},
	optionsEditButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "edit",
			attributes: { class: "btn btn-secondary btn-sm ks-btn-edit" }
		}]
	},
	optionsDeleteButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "delete",
			attributes: { class: "btn btn-danger btn-sm ks-btn-delete" }
		}]
	},
	headerForEditOption: {
		tagName: "th",
		textContent: "edit",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	headerForDeleteOption: {
		tagName: "th",
		textContent: "delete",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForEditOption: {
		tagName: "col",
		attributes: { width: "80px" }
	},
	colGroupForDeleteOption: {
		tagName: "col",
		attributes: { width: "90px" }
	},
	tableWithFooterParent: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-footer-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-with-footer-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-with-footer-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-with-footer-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-with-footer-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-with-footer-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-with-footer-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-with-footer-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithSearchAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-search-footer-parent-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-with-footer-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-with-footer-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-with-footer-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-with-footer-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-with-footer-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-with-footer-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-with-footer-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	accordionSimple: {
		tagName: "div",
		attributes: {
			class: "accordion shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	accordionFlush: {
		tagName: "div",
		attributes: {
			class: "accordion accordion-flush shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	buildAccordionItem: {
		tagName: "div",
		attributes: {
			class: "accordion-item",
			"data-role": "accordion-item"
		},
		children: [{
			tagName: "h2",
			attributes: {
				class: "accordion-header",
				id: "heading-${id}"
			},
			children: [{
				tagName: "button",
				attributes: {
					class: "accordion-button collapsed",
					type: "button",
					"data-bs-toggle": "collapse",
					"data-bs-target": "#collapse-${id}",
					"aria-expanded": "false",
					"aria-controls": "collapse-${id}"
				},
				textContent: "${title}"
			}]
		}, {
			tagName: "div",
			attributes: {
				id: "collapse-${id}",
				class: "accordion-collapse collapse",
				"aria-labelledby": "heading-${id}",
				"data-bs-parent": "#accordion-parent-id",
				"data-role": "accordion-collapse"
			},
			children: [{
				tagName: "div",
				attributes: { class: "accordion-body text-secondary" },
				textContent: "${content}"
			}]
		}]
	},
	cardSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithHeader: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-header bg-white py-3 fw-bold border-bottom",
				"data-role": "card-header"
			},
			children: []
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithFooter: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 fw-bold border-bottom",
					"data-role": "card-header"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					"data-role": "card-body"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light py-3 border-top",
					"data-role": "card-footer"
				},
				children: []
			}
		]
	},
	cardImageTop: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3 overflow-hidden",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "img",
			attributes: {
				class: "card-img-top",
				src: "${imageSrc}",
				alt: "${imageAlt}",
				"data-role": "card-img"
			}
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	buildCardBodyTemplate: {
		tagName: "div",
		attributes: { class: "card-content" },
		children: [{
			tagName: "h5",
			attributes: { class: "card-title fw-bold text-dark mb-2" },
			textContent: "${title}"
		}, {
			tagName: "p",
			attributes: { class: "card-text text-secondary mb-3" },
			textContent: "${text}"
		}]
	},
	buildCardHeaderTemplate: {
		tagName: "span",
		attributes: { class: "card-header-title text-dark" },
		textContent: "${headerTitle}"
	},
	buildCardFooterTemplate: {
		tagName: "small",
		attributes: { class: "text-muted" },
		textContent: "${footerText}"
	},
	listSimple: {
		tagName: "ul",
		attributes: {
			class: "list-unstyled mb-0",
			id: "list-parent-id",
			"data-role": "list-parent"
		},
		children: []
	},
	listGroup: {
		tagName: "ul",
		attributes: {
			class: "list-group shadow-sm",
			id: "list-group-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	listOrdered: {
		tagName: "ol",
		attributes: {
			class: "list-group list-group-numbered shadow-sm",
			id: "list-ordered-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	menuSimple: {
		tagName: "ul",
		attributes: {
			class: "nav nav-pills flex-column bg-white p-3 rounded-3 shadow-sm border",
			id: "menu-parent-id",
			"data-role": "menu-parent"
		},
		children: []
	},
	menuCardsBase: {
		tagName: "div",
		attributes: {
			class: "row g-4",
			id: "menu-cards-parent-id",
			"data-role": "menu-cards-parent"
		},
		children: []
	},
	buildListItemTemplate: {
		tagName: "li",
		attributes: {
			class: "py-2 px-3 border-bottom d-flex align-items-center text-secondary",
			"data-role": "list-item"
		},
		textContent: "${text}"
	},
	buildListGroupItemTemplate: {
		tagName: "li",
		attributes: {
			class: "list-group-item d-flex justify-content-between align-items-center py-3",
			"data-role": "list-group-item"
		},
		children: [{
			tagName: "span",
			textContent: "${text}"
		}, {
			tagName: "span",
			attributes: { class: "badge bg-primary rounded-pill px-3 py-2" },
			textContent: "${badge}"
		}]
	},
	buildMenuItemTemplate: {
		tagName: "li",
		attributes: {
			class: "nav-item mb-1",
			"data-role": "menu-item"
		},
		children: [{
			tagName: "a",
			attributes: {
				class: "nav-link text-dark fw-medium",
				href: "${href}"
			},
			textContent: "${text}"
		}]
	},
	buildMenuCardItemTemplate: {
		tagName: "div",
		attributes: {
			class: "col-md-4 col-sm-6",
			"data-role": "menu-card-col"
		},
		children: [{
			tagName: "div",
			attributes: { class: "card h-100 shadow-sm border rounded-3" },
			children: [{
				tagName: "div",
				attributes: { class: "card-body p-4 d-flex flex-column" },
				children: [
					{
						tagName: "h5",
						attributes: { class: "card-title fw-bold text-primary mb-2" },
						textContent: "${title}"
					},
					{
						tagName: "p",
						attributes: { class: "card-text text-muted small flex-grow-1" },
						textContent: "${description}"
					},
					{
						tagName: "a",
						attributes: {
							class: "btn btn-outline-primary btn-sm mt-3",
							href: "${href}"
						},
						textContent: "${actionText}"
					}
				]
			}]
		}]
	}
}, s = {
	name: "declarative-spec",
	version: "1.4.1"
}, c = (e) => {
	typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.declarative ??= {}, globalThis.ks.declarative.spec = {
		meta: s,
		data: e
	});
}, l = o;
c(o);
// src/v14/single/guard/templateKey.js
var u = (e) => typeof e == "string" && e.trim().length > 0, d = (e, n, r) => {
	let i = (n) => t(e, n, r), a = (e, t) => {
		u(e) || i(`${t} must be a non-empty string`), l[e] === void 0 && i(`template was not found for ${t} "${e}"`);
	};
	if (n.func === "rowOnColumn" || n.func === "columnOnRow") {
		let e = n.templateKey;
		(!e || typeof e != "object" || Array.isArray(e)) && i("templateKey must contain rowKey and columnKey"), a(e.rowKey, "templateKey.rowKey"), a(e.columnKey, "templateKey.columnKey");
	} else a(n.templateKey, "templateKey");
}, f = (e) => typeof e == "string" && e.trim().length > 0, p = (e, n, r) => {
	let i = (n) => t(e, n, r);
	if (n.func === null) return;
	if (n.func === "applyTemplate" || n.func === "fromCollection") {
		f(n.sourcePath) || i("sourcePath must be a non-empty string");
		return;
	}
	let a = n.sourcePath;
	(!a || typeof a != "object" || Array.isArray(a)) && i("sourcePath must contain rows and columns paths"), f(a.rows) && f(a.columns) || i("sourcePath.rows and sourcePath.columns must be non-empty strings");
}, m = (e, t, n = { type: "single" }) => (r(e, t, n), a(e, t, n), d(e, t, n), p(e, t, n), t), ee = (e) => typeof e == "object" && !!e && !Array.isArray(e), h = (e, t) => {
	if (!ee(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = b(t, i);
	return n;
}, te = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => b(t, e));
}, g = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, _ = (e, t) => g(e, t), ne = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, v = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, y = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: v,
		applyTemplate: e
	});
}, b = (e, t, n) => {
	let r = e, i = t;
	ne(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? g(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = _(a?.textContent, r)), "attributes" in a && (a.attributes = h(a?.attributes, r)), "children" in a && (a.children = te(a?.children, r))), a);
};
y(b);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var re = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, ie = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, ae = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: ie,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, oe = (e, t) => {
	let n = e, r = t;
	return re(n, r), n.map((e) => b(e, r));
};
ae((e, t) => {
	let n = e;
	return re(n, t), n.map((e) => b(e, e[t]));
}, oe);
// node_modules/json-transformer-funcs-two-dimensions/src/v10/index.js
var se = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = b(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? oe(a, r) : [], i;
}), ce = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => se({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), le = ({ columns: e = [], data: t = [], rows: n, columnSpec: r, rowSpec: i } = {}) => {
	let a = n ?? (Array.isArray(t) ? t : t?.data ?? t?.rows ?? []);
	return se({
		outer: e,
		outerSpec: r,
		innerSpec: i,
		getInner: (e) => Array.isArray(e.options) && e.options.length > 0 ? e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : a.map((t) => ({
			...t,
			rowValue: t[e.columnName] ?? t.value ?? t
		}))
	});
}, ue = Object.defineProperty, x = Object.getOwnPropertySymbols, de = Object.prototype.hasOwnProperty, fe = Object.prototype.propertyIsEnumerable, pe = Math.pow, me = (e, t, n) => t in e ? ue(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, he = (e, t) => {
	for (var n in t ||= {}) de.call(t, n) && me(e, n, t[n]);
	if (x) for (var n of x(t)) fe.call(t, n) && me(e, n, t[n]);
	return e;
}, S = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, C = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, w = () => void 0, ge = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = D(e);
		return r === D(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = E(e), a = E(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, _e = (e, t, n = w) => {
	let r = [];
	if (!ge(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!ge(ve(e.x, t), ve(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !T(o, i) || !T(a, i)) return !1;
			let s = a[i];
			if (!T(o, i) || !ge(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, T = (e, t) => Object.prototype.hasOwnProperty.call(e, t), ve = (e, t) => T(e, t) ? e[t] : void 0, ye = 16383, be = 1e3, E = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > be) throw new C(`Member name too long (maximum ${be} characters)`);
	return t;
}, D = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, xe = (e) => e instanceof RangeError && /call stack/i.test(e.message), O = (e) => Array.isArray(e), Se = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), k = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, A = (e) => typeof e == "number", j = (e) => typeof e == "string", Ce = (e) => e === void 0, M = (e) => e !== void 0;
function we(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function Te(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function Ee(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var De = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function Oe(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: zr }, a = zr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", g = "false", _ = "null", ne = /^[,\]]/, v = /^[+\-]/, y = /^[*\/]/, b = /^[a-zA-Z_]/, re = /^[\x80-\uFFFF_]/, ie = /^[a-zA-Z0-9_]/, ae = /^[0-9@$\-]/, oe = /^[^\/\\]/, se = /^[gimsuy]/, ce = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, le = /^[\uD800-\uDBFF]/, ue = /^[\uDC00-\uDFFF]/, x = /^[0-9]/, de = /^[1-9]/, fe = /^[eE]/, pe = /^["\\]/, me = /^['\\]/, he = /^[ -\uD7FF\uE000-\uFFFF]/, S = /^[dD]/, C = /^[89abAB]/, w = /^[c-fC-F]/, ge = /^[0-9a-fA-F]/, _e = /^[ \t\n\r]/, T = q([",", "]"], !1, !1, !1), ve = K("length", !1), ye = K("count", !1), be = K("match", !1), E = K("search", !1), D = K("value", !1), xe = q(["+", "-"], !1, !1, !1), O = q(["*", "/"], !1, !1, !1), Se = Pr("string"), k = q([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), A = q([["", "￿"], "_"], !1, !1, !1), j = q([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Ce = K("-", !1), M = q([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Oe = K("$", !1), ke = K("@", !1), Ae = K("..", !1), N = K(".", !1), je = K("*", !1), Me = K("&&", !1), Ne = K("||", !1), Pe = K("!", !1), Fe = K("==", !1), Ie = K("!=", !1), Le = K(">=", !1), Re = K(">", !1), ze = K("<=", !1), Be = K("<", !1), Ve = K("=~", !1), He = K("in", !1), Ue = K("nin", !1), We = K("subsetof", !1), Ge = K("anyof", !1), Ke = K("noneof", !1), qe = K("sizeof", !1), Je = K("size", !1), Ye = K("empty", !1), Xe = K("true", !1), Ze = K("false", !1), P = K("null", !1), Qe = K("{", !1), $e = K("}", !1), et = K("[", !1), tt = K("]", !1), nt = K(":", !1), rt = K(",", !1), it = K("(", !1), at = K(")", !1), ot = K("?", !1), st = Pr("regex"), ct = K("/", !1), lt = q(["/", "\\"], !0, !1, !1), F = K("\\", !1), ut = Mr(), dt = q([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), ft = q([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), pt = q([["\ud800", "\udbff"]], !1, !1, !1), mt = q([["\udc00", "\udfff"]], !1, !1, !1), I = q([["0", "9"]], !1, !1, !1), ht = Pr("number"), gt = K("0", !1), _t = q([["1", "9"]], !1, !1, !1), vt = Pr("integer"), yt = q(["e", "E"], !1, !1, !1), bt = K("\"", !1), xt = K("'", !1), St = q(["\"", "\\"], !1, !1, !1), Ct = q(["'", "\\"], !1, !1, !1), wt = q([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Tt = K("b", !1), Et = K("f", !1), Dt = K("n", !1), Ot = K("r", !1), kt = K("t", !1), At = K("u", !1), jt = q(["d", "D"], !1, !1, !1), Mt = q([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Nt = K("\\u", !1), Pt = q([["c", "f"], ["C", "F"]], !1, !1, !1), Ft = q([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), It = q([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Lt(e) {
		return {
			type: "root",
			next: we(e)
		};
	}
	function Rt(e) {
		return e.map((e) => e[1]);
	}
	function zt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Bt(e) {
		return e;
	}
	function Vt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Ht() {
		return { type: "wildcard" };
	}
	function Ut(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Wt() {
		return { type: "wildcard" };
	}
	function Gt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Kt(e) {
		return e;
	}
	function qt(e) {
		return e;
	}
	function Jt(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function L(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function R(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Yt(e, t) {
		return Ee(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function z(e, t) {
		return Ee(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function Xt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function Zt(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function Qt(e, t) {
		return t !== null || Te(e);
	}
	function $t(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function en(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function tn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function nn() {
		return { operator: "empty" };
	}
	function rn() {
		return "eq";
	}
	function an() {
		return "ne";
	}
	function on() {
		return "le";
	}
	function B() {
		return "lt";
	}
	function sn() {
		return "ge";
	}
	function cn() {
		return "gt";
	}
	function ln() {
		return "in";
	}
	function un() {
		return "nin";
	}
	function dn() {
		return "subsetof";
	}
	function fn() {
		return "anyof";
	}
	function pn() {
		return "noneof";
	}
	function mn() {
		return "sizeof";
	}
	function hn() {
		return "size";
	}
	function gn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function _n() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function vn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function yn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function bn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function xn() {
		return "length";
	}
	function Sn() {
		return "count";
	}
	function Cn() {
		return "match";
	}
	function wn() {
		return "search";
	}
	function Tn() {
		return "value";
	}
	function En(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Dn(e, t) {
		return t.length === 0 ? e : Ee(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function On(e, t) {
		return t.length === 0 ? e : Ee(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function kn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function An(e) {
		return {
			type: "root",
			next: we(e)
		};
	}
	function jn(e) {
		return {
			type: "current",
			next: we(e)
		};
	}
	function Mn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Nn() {
		return { type: "wildcard" };
	}
	function Pn(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Fn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function In(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Ln(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Rn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function zn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Bn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Vn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Hn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Un(e) {
		return e;
	}
	function Wn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Gn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Kn(e, t) {
		return [e, t.value];
	}
	function qn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Jn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function Yn(e) {
		return _a(e);
	}
	function Xn(e) {
		return _a(e);
	}
	function Zn() {
		return "true";
	}
	function Qn() {
		return "false";
	}
	function $n() {
		return "null";
	}
	function er(e) {
		return _a(e);
	}
	function tr() {
		return "true";
	}
	function nr() {
		return "false";
	}
	function rr() {
		return "null";
	}
	function ir(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function ar(e) {
		return e.join("");
	}
	function or(e, t) {
		let n = parseFloat(kr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function sr() {
		let e = parseInt(kr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function cr(e) {
		return e.join("");
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e) {
		return e;
	}
	function dr() {
		return "\"";
	}
	function fr(e) {
		return e;
	}
	function pr(e) {
		return e;
	}
	function mr() {
		return "'";
	}
	function hr(e) {
		return e;
	}
	function gr() {
		return "\\";
	}
	function _r() {
		return "/";
	}
	function vr() {
		return "\b";
	}
	function yr() {
		return "\f";
	}
	function br() {
		return "\n";
	}
	function xr() {
		return "\r";
	}
	function Sr() {
		return "	";
	}
	function Cr(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function wr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Tr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let V = t.peg$currPos | 0, H = V, U = [{
		line: 1,
		column: 1
	}], W = V, Er = t.peg$maxFailExpected || [], G = t.peg$silentFails | 0, Dr = /* @__PURE__ */ new Map(), Or;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function kr() {
		return e.substring(H, V);
	}
	function Ar(e, t) {
		throw t = t === void 0 ? Ir(H, V) : t, Lr(e, t);
	}
	function jr(t = V) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function K(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function q(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Mr() {
		return { type: "any" };
	}
	function Nr() {
		return { type: "end" };
	}
	function Pr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Fr(t) {
		let n = U[t], r;
		if (n) return n;
		if (t >= U.length) r = U.length - 1;
		else for (r = t; !U[--r];);
		for (n = U[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return U[t] = n, n;
	}
	function Ir(e, t, n) {
		let i = Fr(e), a = Fr(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function J(e) {
		V < W || (V > W && (W = V, Er = []), Er.push(e));
	}
	function Lr(e, t) {
		return new De(e, null, null, t);
	}
	function Rr(e, t, n) {
		return new De(De.buildMessage(e, t), e, t, n);
	}
	function zr() {
		let e, t, r, i;
		return e = V, t = Ci(), t === n ? (V = e, e = n) : (r = Br(), i = ga(), i === n ? (V = e, e = n) : (H = e, e = Lt(r))), e;
	}
	function Br() {
		let e, t, r, i, a;
		for (e = V, t = [], r = V, i = $(), a = Vr(), a === n ? (V = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = V, i = $(), a = Vr(), a === n ? (V = r, r = n) : (i = [i, a], r = i);
		return H = e, t = Rt(t), e = t, e;
	}
	function Vr() {
		let e;
		return e = Ur(), e === n && (e = Hr()), e;
	}
	function Hr() {
		let e, t, r;
		return e = V, t = Ei(), t === n ? (V = e, e = n) : (r = Wr(), r === n ? (V = e, e = n) : (H = e, e = zt(r))), e === n && (e = V, t = Kr(), t !== n && (H = e, t = Bt(t)), e = t), e;
	}
	function Ur() {
		let e, t, r;
		return e = V, t = Ti(), t === n ? (V = e, e = n) : (r = Gr(), r === n ? (V = e, e = n) : (H = e, e = Vt(r))), e;
	}
	function Wr() {
		let e, t;
		return e = V, t = Di(), t !== n && (H = e, t = Ht()), e = t, e === n && (e = V, t = Si(), t !== n && (H = e, t = Ut(t)), e = t), e;
	}
	function Gr() {
		let e, t;
		return e = V, t = Di(), t !== n && (H = e, t = Wt()), e = t, e === n && (e = V, t = Si(), t !== n && (H = e, t = Gt(t)), e = t, e === n && (e = V, t = Kr(), t !== n && (H = e, t = Kt(t)), e = t)), e;
	}
	function Kr() {
		let e, t, r, i;
		return e = V, t = Zi(), t === n ? (V = e, e = n) : ($(), r = qr(), r === n ? (V = e, e = n) : ($(), i = Qi(), i === n ? (V = e, e = n) : (H = e, e = qt(r)))), e;
	}
	function qr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = di(), t !== n) {
			for (r = [], i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = di(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = di(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Jt(t, r);
		} else V = e, e = n;
		return e;
	}
	function Jr() {
		let t, r, i, a, o, s, c, l, u;
		return t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = ea(), i === n ? (V = t, t = n) : ($(), a = Yr(), a === n ? (V = t, t = n) : ($(), o = X(), o === n ? (V = t, t = n) : (s = V, G++, c = V, l = $(), u = e.charAt(V), ne.test(u) ? V++ : (u = n, G === 0 && J(T)), u === n ? (V = c, c = n) : (l = [l, u], c = l), G--, c === n ? s = n : (V = s, s = void 0), s === n ? (V = t, t = n) : (H = t, t = L(a)))))), t === n && (t = V, r = ta(), r === n ? (V = t, t = n) : ($(), i = Yr(), i === n ? (V = t, t = n) : (H = t, t = R(i)))), t;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c, l = V * 91 + 10, u = Dr.get(l);
		if (u) return V = u.nextPos, u.result;
		if (e = V, t = Xr(), t !== n) {
			for (r = [], i = V, a = $(), o = ki(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = ki(), o === n ? (V = i, i = n) : (s = $(), c = Xr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Yt(t, r);
		} else V = e, e = n;
		return Dr.set(l, {
			nextPos: V,
			result: e
		}), e;
	}
	function Xr() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = Zr(), t !== n) {
			for (r = [], i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Zr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Oi(), o === n ? (V = i, i = n) : (s = $(), c = Zr(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = z(t, r);
		} else V = e, e = n;
		return e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = V, t = Ai(), t === n ? (V = e, e = n) : ($(), r = ea(), r === n ? (V = e, e = n) : ($(), i = Yr(), i === n ? (V = e, e = n) : ($(), a = X(), a === n ? (V = e, e = n) : (H = e, e = Xt(i))))), e === n && (e = V, t = Ai(), t === n ? (V = e, e = n) : ($(), r = ti(), r === n ? (V = e, e = n) : (H = e, e = Zt(r))), e === n && (e = Qr())), e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = V, t = oi(), t === n ? (V = e, e = n) : (r = V, i = $(), a = $r(), a === n ? (V = r, r = n) : (i = [i, a], r = i), r === n && (r = null), H = V, i = Qt(t, r), i = i ? void 0 : n, i === n ? (V = e, e = n) : (H = e, e = $t(t, r))), e === n && (e = ti()), e;
	}
	function $r() {
		let e, t, r;
		return e = V, t = ei(), t === n ? (V = e, e = n) : ($(), r = oi(), r === n ? (V = e, e = n) : (H = e, e = en(t, r))), e === n && (e = V, t = Li(), t === n ? (V = e, e = n) : ($(), r = fi(), r === n ? (V = e, e = n) : (H = e, e = tn(r))), e === n && (e = V, t = Gi(), t !== n && (H = e, t = nn()), e = t)), e;
	}
	function ei() {
		let e, t;
		return e = V, t = ji(), t !== n && (H = e, t = rn()), e = t, e === n && (e = V, t = Mi(), t !== n && (H = e, t = an()), e = t, e === n && (e = V, t = Fi(), t !== n && (H = e, t = on()), e = t, e === n && (e = V, t = Ii(), t !== n && (H = e, t = B()), e = t, e === n && (e = V, t = Ni(), t !== n && (H = e, t = sn()), e = t, e === n && (e = V, t = Pi(), t !== n && (H = e, t = cn()), e = t, e === n && (e = V, t = Ri(), t !== n && (H = e, t = ln()), e = t, e === n && (e = V, t = zi(), t !== n && (H = e, t = un()), e = t, e === n && (e = V, t = Bi(), t !== n && (H = e, t = dn()), e = t, e === n && (e = V, t = Vi(), t !== n && (H = e, t = fn()), e = t, e === n && (e = V, t = Hi(), t !== n && (H = e, t = pn()), e = t, e === n && (e = V, t = Ui(), t !== n && (H = e, t = mn()), e = t, e === n && (e = V, t = Wi(), t !== n && (H = e, t = hn()), e = t)))))))))))), e;
	}
	function ti() {
		let e, t, r, i;
		return e = V, t = ea(), t === n ? (V = e, e = n) : ($(), r = Yr(), r === n ? (V = e, e = n) : ($(), i = X(), i === n ? (V = e, e = n) : (H = e, e = gn(r)))), e === n && (e = ni(), e === n && (e = li(), e === n && (e = V, t = Ki(), t !== n && (H = e, t = _n()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = vn()), e = t, e === n && (e = V, t = Ji(), t !== n && (H = e, t = yn()), e = t))))), e;
	}
	function ni() {
		let e, t, r, i, a;
		return e = V, t = ri(), t === n ? (V = e, e = n) : (r = ea(), r === n ? (V = e, e = n) : ($(), i = ii(), i === n && (i = null), $(), a = X(), a === n ? (V = e, e = n) : (H = e, e = bn(t, i)))), e;
	}
	function ri() {
		let t, r;
		return t = V, e.substr(V, 6) === o ? (r = o, V += 6) : (r = n, G === 0 && J(ve)), r !== n && (H = t, r = xn()), t = r, t === n && (t = V, e.substr(V, 5) === s ? (r = s, V += 5) : (r = n, G === 0 && J(ye)), r !== n && (H = t, r = Sn()), t = r, t === n && (t = V, e.substr(V, 5) === c ? (r = c, V += 5) : (r = n, G === 0 && J(be)), r !== n && (H = t, r = Cn()), t = r, t === n && (t = V, e.substr(V, 6) === l ? (r = l, V += 6) : (r = n, G === 0 && J(E)), r !== n && (H = t, r = wn()), t = r, t === n && (t = V, e.substr(V, 5) === u ? (r = u, V += 5) : (r = n, G === 0 && J(D)), r !== n && (H = t, r = Tn()), t = r)))), t;
	}
	function ii() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = ai(), t !== n) {
			for (r = [], i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = ai(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = ai(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = En(t, r);
		} else V = e, e = n;
		return e;
	}
	function ai() {
		let e;
		return e = oi(), e === n && (e = mi()), e;
	}
	function oi() {
		let t, r, i, a, o, s, c, l, u = V * 91 + 21, d = Dr.get(u);
		if (d) return V = d.nextPos, d.result;
		if (t = V, r = si(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), v.test(s) ? V++ : (s = n, G === 0 && J(xe)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), v.test(s) ? V++ : (s = n, G === 0 && J(xe)), s === n ? (V = a, a = n) : (c = $(), l = si(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = Dn(r, i);
		} else V = t, t = n;
		return Dr.set(u, {
			nextPos: V,
			result: t
		}), t;
	}
	function si() {
		let t, r, i, a, o, s, c, l;
		if (t = V, r = ci(), r !== n) {
			for (i = [], a = V, o = $(), s = e.charAt(V), y.test(s) ? V++ : (s = n, G === 0 && J(O)), s === n ? (V = a, a = n) : (c = $(), l = ci(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = V, o = $(), s = e.charAt(V), y.test(s) ? V++ : (s = n, G === 0 && J(O)), s === n ? (V = a, a = n) : (c = $(), l = ci(), l === n ? (V = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			H = t, t = On(r, i);
		} else V = t, t = n;
		return t;
	}
	function ci() {
		let e, t, r, i;
		return e = V, t = ea(), t === n ? (V = e, e = n) : ($(), r = oi(), r === n ? (V = e, e = n) : ($(), i = X(), i === n ? (V = e, e = n) : (H = e, e = kn(r)))), e === n && (e = ni(), e === n && (e = pi(), e === n && (e = li()))), e;
	}
	function li() {
		let e, t, r;
		return e = V, t = Ci(), t === n ? (V = e, e = n) : (r = Br(), r === n ? (V = e, e = n) : (H = e, e = An(r))), e === n && (e = V, t = wi(), t === n ? (V = e, e = n) : (r = Br(), r === n ? (V = e, e = n) : (H = e, e = jn(r)))), e;
	}
	function ui() {
		let e, t, r, i, a, o, s, c, l;
		return e = V, t = V, r = la(), r === n ? (V = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = $i(), r === n ? (V = e, e = n) : (i = $(), a = V, o = la(), o === n ? (V = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = V, s = $i(), s === n ? (V = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), H = e, e = Mn(t, a, o)), e;
	}
	function di() {
		let e, t;
		return e = Jr(), e === n && (e = ui(), e === n && (e = V, t = Di(), t !== n && (H = e, t = Nn()), e = t, e === n && (e = V, t = la(), t !== n && (H = e, t = Pn(t)), e = t, e === n && (e = V, t = da(), t !== n && (H = e, t = Fn(t)), e = t, e === n && (e = V, t = bi(), t !== n && (H = e, t = In(t)), e = t))))), e;
	}
	function fi() {
		let e, t, r;
		return e = V, t = na(), t === n ? (V = e, e = n) : (r = ra(), H = e, e = Ln(t, r)), e;
	}
	function pi() {
		let e, t;
		return e = V, t = mi(), t !== n && (H = e, t = Rn(t)), e = t, e === n && (e = V, t = sa(), t !== n && (H = e, t = zn(t)), e = t, e === n && (e = hi(), e === n && (e = vi(), e === n && (e = V, t = Ki(), t !== n && (H = e, t = Bn()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = Vn()), e = t, e === n && (e = V, t = Ji(), t !== n && (H = e, t = Hn()), e = t)))))), e;
	}
	function mi() {
		let e, t;
		return G++, e = V, t = da(), t !== n && (H = e, t = Un(t)), e = t, G--, e === n && (t = n, G === 0 && J(Se)), e;
	}
	function hi() {
		let e, t, r, i;
		return e = V, t = Yi(), t === n ? (V = e, e = n) : ($(), r = gi(), r === n && (r = null), $(), i = Xi(), i === n ? (V = e, e = n) : (H = e, e = Wn(r))), e;
	}
	function gi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = _i(), t !== n) {
			for (r = [], i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = _i(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = _i(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Gn(t, r);
		} else V = e, e = n;
		return e;
	}
	function _i() {
		let e, t, r, i;
		return e = V, t = da(), t === n ? (V = e, e = n) : ($(), r = $i(), r === n ? (V = e, e = n) : ($(), i = pi(), i === n ? (V = e, e = n) : (H = e, e = Kn(t, i)))), e;
	}
	function vi() {
		let e, t, r, i;
		return e = V, t = Zi(), t === n ? (V = e, e = n) : ($(), r = yi(), r === n && (r = null), $(), i = Qi(), i === n ? (V = e, e = n) : (H = e, e = qn(r))), e;
	}
	function yi() {
		let e, t, r, i, a, o, s, c;
		if (e = V, t = pi(), t !== n) {
			for (r = [], i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = pi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = V, a = $(), o = Y(), o === n ? (V = i, i = n) : (s = $(), c = pi(), c === n ? (V = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			H = e, e = Jn(t, r);
		} else V = e, e = n;
		return e;
	}
	function bi() {
		let t, r, i, a, o, s;
		if (t = V, r = V, i = V, a = e.charAt(V), b.test(a) ? V++ : (a = n, G === 0 && J(k)), a !== n) {
			for (o = [], s = xi(); s !== n;) o.push(s), s = xi();
			a = [a, o], i = a;
		} else V = i, i = n;
		if (r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Yn(r)), t = r, t === n) {
			if (t = V, r = V, i = [], a = e.charAt(V), re.test(a) ? V++ : (a = n, G === 0 && J(A)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(V), re.test(a) ? V++ : (a = n, G === 0 && J(A));
			else i = n;
			r = i === n ? i : e.substring(r, V), r !== n && (H = t, r = Xn(r)), t = r, t === n && (t = V, r = Ki(), r !== n && (H = t, r = Zn()), t = r, t === n && (t = V, r = qi(), r !== n && (H = t, r = Qn()), t = r, t === n && (t = V, r = Ji(), r !== n && (H = t, r = $n()), t = r)));
		}
		return t;
	}
	function xi() {
		let t, r, i, a;
		return t = e.charAt(V), ie.test(t) ? V++ : (t = n, G === 0 && J(j)), t === n && (t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && J(Ce)), r === n ? (V = t, t = n) : (i = V, G++, a = e.charAt(V), ae.test(a) ? V++ : (a = n, G === 0 && J(M)), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function Si() {
		let e, t;
		return e = V, t = ia(), t !== n && (H = e, t = er(t)), e = t, e === n && (e = V, t = Ki(), t !== n && (H = e, t = tr()), e = t, e === n && (e = V, t = qi(), t !== n && (H = e, t = nr()), e = t, e === n && (e = V, t = Ji(), t !== n && (H = e, t = rr()), e = t))), e;
	}
	function Ci() {
		let t;
		return e.charCodeAt(V) === 36 ? (t = "$", V++) : (t = n, G === 0 && J(Oe)), t;
	}
	function wi() {
		let t;
		return e.charCodeAt(V) === 64 ? (t = "@", V++) : (t = n, G === 0 && J(ke)), t;
	}
	function Ti() {
		let t;
		return e.substr(V, 2) === ".." ? (t = "..", V += 2) : (t = n, G === 0 && J(Ae)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(V) === 46 ? (t = ".", V++) : (t = n, G === 0 && J(N)), t;
	}
	function Di() {
		let t;
		return e.charCodeAt(V) === 42 ? (t = "*", V++) : (t = n, G === 0 && J(je)), t;
	}
	function Oi() {
		let t;
		return e.substr(V, 2) === "&&" ? (t = "&&", V += 2) : (t = n, G === 0 && J(Me)), t;
	}
	function ki() {
		let t;
		return e.substr(V, 2) === "||" ? (t = "||", V += 2) : (t = n, G === 0 && J(Ne)), t;
	}
	function Ai() {
		let t;
		return e.charCodeAt(V) === 33 ? (t = "!", V++) : (t = n, G === 0 && J(Pe)), t;
	}
	function ji() {
		let t;
		return e.substr(V, 2) === "==" ? (t = "==", V += 2) : (t = n, G === 0 && J(Fe)), t;
	}
	function Mi() {
		let t;
		return e.substr(V, 2) === "!=" ? (t = "!=", V += 2) : (t = n, G === 0 && J(Ie)), t;
	}
	function Ni() {
		let t;
		return e.substr(V, 2) === ">=" ? (t = ">=", V += 2) : (t = n, G === 0 && J(Le)), t;
	}
	function Pi() {
		let t;
		return e.charCodeAt(V) === 62 ? (t = ">", V++) : (t = n, G === 0 && J(Re)), t;
	}
	function Fi() {
		let t;
		return e.substr(V, 2) === "<=" ? (t = "<=", V += 2) : (t = n, G === 0 && J(ze)), t;
	}
	function Ii() {
		let t;
		return e.charCodeAt(V) === 60 ? (t = "<", V++) : (t = n, G === 0 && J(Be)), t;
	}
	function Li() {
		let t;
		return e.substr(V, 2) === "=~" ? (t = "=~", V += 2) : (t = n, G === 0 && J(Ve)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = V, e.substr(V, 2) === "in" ? (r = "in", V += 2) : (r = n, G === 0 && J(He)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = V, e.substr(V, 3) === "nin" ? (r = "nin", V += 3) : (r = n, G === 0 && J(Ue)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = V, e.substr(V, 8) === d ? (r = d, V += 8) : (r = n, G === 0 && J(We)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === f ? (r = f, V += 5) : (r = n, G === 0 && J(Ge)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === p ? (r = p, V += 6) : (r = n, G === 0 && J(Ke)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = V, e.substr(V, 6) === m ? (r = m, V += 6) : (r = n, G === 0 && J(qe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === ee ? (r = ee, V += 4) : (r = n, G === 0 && J(Je)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === h ? (r = h, V += 5) : (r = n, G === 0 && J(Ye)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === te ? (r = te, V += 4) : (r = n, G === 0 && J(Xe)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = V, e.substr(V, 5) === g ? (r = g, V += 5) : (r = n, G === 0 && J(Ze)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t, r, i, a;
		return t = V, e.substr(V, 4) === _ ? (r = _, V += 4) : (r = n, G === 0 && J(P)), r === n ? (V = t, t = n) : (i = V, G++, a = Q(), G--, a === n ? i = void 0 : (V = i, i = n), i === n ? (V = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(V) === 123 ? (t = "{", V++) : (t = n, G === 0 && J(Qe)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(V) === 125 ? (t = "}", V++) : (t = n, G === 0 && J($e)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(V) === 91 ? (t = "[", V++) : (t = n, G === 0 && J(et)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(V) === 93 ? (t = "]", V++) : (t = n, G === 0 && J(tt)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(V) === 58 ? (t = ":", V++) : (t = n, G === 0 && J(nt)), t;
	}
	function Y() {
		let t;
		return e.charCodeAt(V) === 44 ? (t = ",", V++) : (t = n, G === 0 && J(rt)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(V) === 40 ? (t = "(", V++) : (t = n, G === 0 && J(it)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(V) === 41 ? (t = ")", V++) : (t = n, G === 0 && J(at)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(V) === 63 ? (t = "?", V++) : (t = n, G === 0 && J(ot)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && J(ct)), r !== n) {
			for (i = [], a = e.charAt(V), oe.test(a) ? V++ : (a = n, G === 0 && J(lt)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && J(F)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && J(ut)), s === n ? (V = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(V), oe.test(a) ? V++ : (a = n, G === 0 && J(lt)), a === n && (a = V, e.charCodeAt(V) === 92 ? (o = "\\", V++) : (o = n, G === 0 && J(F)), o === n ? (V = a, a = n) : (e.length > V ? (s = e.charAt(V), V++) : (s = n, G === 0 && J(ut)), s === n ? (V = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(V) === 47 ? (a = "/", V++) : (a = n, G === 0 && J(ct)), a === n ? (V = t, t = n) : (H = t, t = ir(i));
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && J(st)), t;
	}
	function ra() {
		let t, r, i;
		for (t = V, r = [], i = e.charAt(V), se.test(i) ? V++ : (i = n, G === 0 && J(dt)); i !== n;) r.push(i), i = e.charAt(V), se.test(i) ? V++ : (i = n, G === 0 && J(dt));
		return H = t, r = ar(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = V, r = V, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else V = r, r = n;
		return t = r === n ? r : e.substring(t, V), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(V), ce.test(t) ? V++ : (t = n, G === 0 && J(ft)), t === n && (t = V, r = e.charAt(V), le.test(r) ? V++ : (r = n, G === 0 && J(pt)), r === n ? (V = t, t = n) : (i = e.charAt(V), ue.test(i) ? V++ : (i = n, G === 0 && J(mt)), i === n ? (V = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(V), x.test(t) ? V++ : (t = n, G === 0 && J(I))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (G++, t = V, e.charCodeAt(V) === 45 ? (r = "-", V++) : (r = n, G === 0 && J(Ce)), r === n && (r = null), i = ca(), i !== n) {
			if (a = V, e.charCodeAt(V) === 46 ? (o = ".", V++) : (o = n, G === 0 && J(N)), o !== n) {
				if (s = [], c = e.charAt(V), x.test(c) ? V++ : (c = n, G === 0 && J(I)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(V), x.test(c) ? V++ : (c = n, G === 0 && J(I));
				else s = n;
				s === n ? (V = a, a = n) : (o = [o, s], a = o);
			} else V = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), H = t, t = or(a, o);
		} else V = t, t = n;
		return G--, t === n && (r = n, G === 0 && J(ht)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(V) === 48 ? (t = "0", V++) : (t = n, G === 0 && J(gt)), t === n) {
			if (t = V, r = e.charAt(V), de.test(r) ? V++ : (r = n, G === 0 && J(_t)), r !== n) {
				for (i = [], a = e.charAt(V), x.test(a) ? V++ : (a = n, G === 0 && J(I)); a !== n;) i.push(a), a = e.charAt(V), x.test(a) ? V++ : (a = n, G === 0 && J(I));
				r = [r, i], t = r;
			} else V = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (G++, t = V, e.charCodeAt(V) === 48 ? (r = "0", V++) : (r = n, G === 0 && J(gt)), r === n) {
			if (r = V, e.charCodeAt(V) === 45 ? (i = "-", V++) : (i = n, G === 0 && J(Ce)), i === n && (i = null), a = e.charAt(V), de.test(a) ? V++ : (a = n, G === 0 && J(_t)), a !== n) {
				for (o = [], s = e.charAt(V), x.test(s) ? V++ : (s = n, G === 0 && J(I)); s !== n;) o.push(s), s = e.charAt(V), x.test(s) ? V++ : (s = n, G === 0 && J(I));
				i = [
					i,
					a,
					o
				], r = i;
			} else V = r, r = n;
		}
		return r !== n && (H = t, r = sr()), t = r, G--, t === n && (r = n, G === 0 && J(vt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = V, r = e.charAt(V), fe.test(r) ? V++ : (r = n, G === 0 && J(yt)), r !== n) {
			if (i = e.charAt(V), v.test(i) ? V++ : (i = n, G === 0 && J(xe)), i === n && (i = null), a = [], o = e.charAt(V), x.test(o) ? V++ : (o = n, G === 0 && J(I)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(V), x.test(o) ? V++ : (o = n, G === 0 && J(I));
			else a = n;
			a === n ? (V = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else V = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (G++, t = V, e.charCodeAt(V) === 34 ? (r = "\"", V++) : (r = n, G === 0 && J(bt)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(V) === 34 ? (a = "\"", V++) : (a = n, G === 0 && J(bt)), a === n ? (V = t, t = n) : (H = t, t = cr(i));
		} else V = t, t = n;
		if (t === n) {
			if (t = V, e.charCodeAt(V) === 39 ? (r = "'", V++) : (r = n, G === 0 && J(xt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(V) === 39 ? (a = "'", V++) : (a = n, G === 0 && J(xt)), a === n ? (V = t, t = n) : (H = t, t = lr(i));
			} else V = t, t = n;
		}
		return G--, t === n && (r = n, G === 0 && J(Se)), t;
	}
	function fa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), pe.test(i) ? V++ : (i = n, G === 0 && J(St)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = ur(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && J(F)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 34 ? (i = "\"", V++) : (i = n, G === 0 && J(bt)), i === n ? (V = t, t = n) : (H = t, t = dr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && J(F)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = fr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = V, r = V, G++, i = e.charAt(V), me.test(i) ? V++ : (i = n, G === 0 && J(Ct)), G--, i === n ? r = void 0 : (V = r, r = n), r === n ? (V = t, t = n) : (i = ma(), i === n ? (V = t, t = n) : (H = t, t = pr(i))), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && J(F)), r === n ? (V = t, t = n) : (e.charCodeAt(V) === 39 ? (i = "'", V++) : (i = n, G === 0 && J(xt)), i === n ? (V = t, t = n) : (H = t, t = mr())), t === n && (t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && J(F)), r === n ? (V = t, t = n) : (i = ha(), i === n ? (V = t, t = n) : (H = t, t = hr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(V), he.test(t) ? V++ : (t = n, G === 0 && J(wt)), t === n && (t = V, r = V, i = e.charAt(V), le.test(i) ? V++ : (i = n, G === 0 && J(pt)), i === n ? (V = r, r = n) : (a = e.charAt(V), ue.test(a) ? V++ : (a = n, G === 0 && J(mt)), a === n ? (V = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, V)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = V, e.charCodeAt(V) === 92 ? (r = "\\", V++) : (r = n, G === 0 && J(F)), r !== n && (H = t, r = gr()), t = r, t === n && (t = V, e.charCodeAt(V) === 47 ? (r = "/", V++) : (r = n, G === 0 && J(ct)), r !== n && (H = t, r = _r()), t = r, t === n && (t = V, e.charCodeAt(V) === 98 ? (r = "b", V++) : (r = n, G === 0 && J(Tt)), r !== n && (H = t, r = vr()), t = r, t === n && (t = V, e.charCodeAt(V) === 102 ? (r = "f", V++) : (r = n, G === 0 && J(Et)), r !== n && (H = t, r = yr()), t = r, t === n && (t = V, e.charCodeAt(V) === 110 ? (r = "n", V++) : (r = n, G === 0 && J(Dt)), r !== n && (H = t, r = br()), t = r, t === n && (t = V, e.charCodeAt(V) === 114 ? (r = "r", V++) : (r = n, G === 0 && J(Ot)), r !== n && (H = t, r = xr()), t = r, t === n && (t = V, e.charCodeAt(V) === 116 ? (r = "t", V++) : (r = n, G === 0 && J(kt)), r !== n && (H = t, r = Sr()), t = r, t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && J(At)), r === n ? (V = t, t = n) : (i = V, a = V, o = e.charAt(V), S.test(o) ? V++ : (o = n, G === 0 && J(jt)), o === n ? (V = a, a = n) : (s = e.charAt(V), C.test(s) ? V++ : (s = n, G === 0 && J(Mt)), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (e.substr(V, 2) === "\\u" ? (a = "\\u", V += 2) : (a = n, G === 0 && J(Nt)), a === n ? (V = t, t = n) : (o = V, s = V, c = e.charAt(V), S.test(c) ? V++ : (c = n, G === 0 && J(jt)), c === n ? (V = s, s = n) : (l = e.charAt(V), w.test(l) ? V++ : (l = n, G === 0 && J(Pt)), l === n ? (V = s, s = n) : (u = Z(), u === n ? (V = s, s = n) : (d = Z(), d === n ? (V = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, V), o === n ? (V = t, t = n) : (H = t, t = Cr(i, o))))), t === n && (t = V, e.charCodeAt(V) === 117 ? (r = "u", V++) : (r = n, G === 0 && J(At)), r === n ? (V = t, t = n) : (i = V, a = V, o = Z(), o === n ? (V = a, a = n) : (s = Z(), s === n ? (V = a, a = n) : (c = Z(), c === n ? (V = a, a = n) : (l = Z(), l === n ? (V = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, V), i === n ? (V = t, t = n) : (H = V, a = wr(i), a = a ? n : void 0, a === n ? (V = t, t = n) : (H = t, t = Tr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(V), ge.test(t) ? V++ : (t = n, G === 0 && J(Ft)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(V), ie.test(t) ? V++ : (t = n, G === 0 && J(j)), t;
	}
	function $() {
		let t, r;
		for (G++, t = [], r = e.charAt(V), _e.test(r) ? V++ : (r = n, G === 0 && J(It)); r !== n;) t.push(r), r = e.charAt(V), _e.test(r) ? V++ : (r = n, G === 0 && J(It));
		return G--, t;
	}
	function ga() {
		let t, r;
		return t = V, G++, e.length > V ? (r = e.charAt(V), V++) : (r = n, G === 0 && J(ut)), G--, r === n ? t = void 0 : (V = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Ar("Member name too long (maximum 1000 characters)"), e;
	}
	Or = a();
	let va = Or !== n && V === e.length;
	function ya() {
		throw Or !== n && V < e.length && J(Nr()), Rr(Er, W < e.length ? jr(W) : null, W < e.length ? Ir(W, W + 1) : Ir(W, W));
	}
	if (t.peg$library) return {
		peg$result: Or,
		peg$currPos: V,
		peg$FAILED: n,
		peg$maxFailExpected: Er,
		peg$maxFailPos: W,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return Or;
	ya();
}
var ke = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), Ae = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, N = (e) => {
	throw new S(1, 1, e);
}, je = (e) => e.type === "root" || e.type === "current", Me = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function Ne(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if (je(i)) r === "value" && !Me(i) && N("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && N(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = ke.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = Ae[e], a = i.args;
				a.length !== n.args.length && N(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && N(`The result of ${e}() must be compared`), r === "value" && n.logical && N(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && N("A literal must be compared");
		}
	}
}
function Pe(e) {
	let t;
	try {
		t = Oe(e);
	} catch (e) {
		if (xe(e)) throw new S(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new S(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new S(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return Ne(t), t;
}
var Fe = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), Ie = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), Le = (e) => e >= 55296 && e <= 56319, Re = (e) => e >= 56320 && e <= 57343, ze = (e) => e !== void 0 && e >= "0" && e <= "9", Be = (e, t) => {
	let n = e.charCodeAt(t);
	return Le(n) && Re(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : Le(n) || Re(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, Ve = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !Fe.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, He = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return Ie.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Ue = (e, t) => {
	let n = e[t];
	return n === "\\" ? Ve(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : Be(e, t);
}, We = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = He(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Ue(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Ue(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, Ge = (e, t) => {
	let n = t + 1, r = n;
	for (; ze(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; ze(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Ke = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? Ge(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = We(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = He(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = Ve(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = Be(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, qe = 1e3, Je = 1e3, Ye = 16, Xe = /^[dgimsuy]*$/, Ze = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, P = class extends Error {}, Qe = 0, $e = 1, et = 2, tt = 3, nt = 4, rt = 5, it = pe(2, 31) - 1, at = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > it - t - 2 || r.step > it - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, ot = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), st = /^\{(\d+)(?:,(\d*))?\}/, ct = /^[0-9a-fA-F]{4}/, lt = /^\(\?([ims]*)(?:-([ims]*))?:/, F = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, ut = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new P("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = lt.exec(e.slice(t, t + 12));
				if (!r) throw new P("lookaround or named group");
				let i = he({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new P("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new P("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new P("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(ot.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new P("trailing backslash");
		if (r === "b" || r === "B") throw new P("word boundary");
		if (r >= "1" && r <= "9") throw new P("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new P("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && ct.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (ct.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = st.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > qe || i !== Infinity && i > qe) throw new P("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, dt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= qe) throw new P("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(rt);
	}
	compile(e) {
		if (++this.work > 4 * qe) throw new P("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Qe, this.atomId(e));
				return;
			case "bol":
				this.emit(tt, +!!e.multiline);
				return;
			case "eol":
				this.emit(nt, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit($e);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(et)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit($e);
					this.x[t] = t + 1, this.compile(e.node), this.emit(et, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit($e);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, ft = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new ut(e, r, t, n).parse(), a = new dt(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, pt = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: g } = r, _ = r.gen, ne = r.step;
	r.gen = _ + t.length + 2, r.step = ne + t.length + 2;
	let v = 0, y = !1, b = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== _) switch (ee[r] = _, ++c === 64 && (u(c), c = 0), i[r]) {
				case Qe:
					e[n++] = r;
					break;
				case rt: return u(c), y = !0, n;
				case et:
					h[s++] = a[r];
					break;
				case $e:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case tt:
					(v === 0 || a[r] === 1 && F(t.charCodeAt(v - 1))) && (h[s++] = r + 1);
					break;
				case nt: (v === t.length || a[r] === 1 && F(t.charCodeAt(v))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (_++, p = b(d, 0, 0), y) return !0;
	for (; v < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(v) : t.charCodeAt(v)) > 65535 ? 2 : 1, n = t.slice(v, v + e), r = ne + v + 1;
		_++, m = 0, v += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (te[i] !== r) {
				te[i] = r;
				let e = s[i];
				g[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (g[i] === 1 && (m = b(f, m, t + 1), y)) return !0;
		}
		if (!l && (m = b(f, m, 0), y)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, mt = (e, t, n) => {
	let r = at(e, t.length);
	try {
		return pt(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, I = 256, ht = /* @__PURE__ */ new Map(), gt = 0, _t = (e, t, n, r, i = !1) => {
	if (e.length > Je || t.length > 7 || !Xe.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = ht.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Ze(s) > Ye ? null : ft(n ? `^(?:${s})$` : s, t, i);
	gt >= I && (ht.clear(), gt = 0);
	let l = ht.get(s);
	return l === void 0 && ht.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), gt++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, vt = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), mt(e, t, n);
}, yt = class {
	constructor(e) {
		this.nodes = e;
	}
}, bt = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, xt = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !bt(e);
}, St = 256, Ct = /* @__PURE__ */ new Map(), wt = (e, t) => {
	let n = Ct.get(e);
	return n === void 0 && (n = xt(e), Ct.size >= St && Ct.clear(), Ct.set(Array.from(e).join(""), n)), t(e.length), n;
}, Tt = /* @__PURE__ */ new Map(), Et = (e, t) => {
	let n = Tt.get(e);
	return n === void 0 && (n = Ke(e), n !== null && (n = Array.from(n).join("")), Tt.size >= St && Tt.clear(), Tt.set(Array.from(e).join(""), n)), t(e.length), n;
}, Dt = 256, Ot = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > Je) c = null;
		else if (o) {
			let n = Et(e, i);
			c = n === null ? null : _t(n, t, r, i, !0);
		} else c = wt(e, i) ? _t(e, t, r, i) : null;
		s !== void 0 && (s.size >= Dt && s.clear(), s.set(a, c));
	}
	return c !== null && vt(c, n, i);
}, kt = {
	length: (e, t) => {
		let n = e[0];
		if (j(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (O(n)) return D(n);
		if (k(n)) {
			let e = E(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !j(r) || !j(i) ? !1 : Ot(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !j(r) || !j(i) ? !1 : Ot(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, At = (e, t, n = w) => e === void 0 && t === void 0 || _e(e, t, n), jt = (e, t, n = w) => !_e(e, t, n), Mt = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, Nt = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return Mt(n) - Mt(i);
	}
	return e.length - t.length;
}, Pt = (e, t, n = w) => A(e) && A(t) ? e < t : j(e) && j(t) ? (n(Math.min(e.length, t.length)), Nt(e, t) < 0) : !1, Ft = (e, t, n = w) => Pt(e, t, n) || At(e, t, n), It = (e, t, n = w) => A(e) && A(t) ? e > t : j(e) && j(t) ? (n(Math.min(e.length, t.length)), Nt(e, t) > 0) : !1, Lt = (e, t, n = w) => It(e, t, n) || At(e, t, n), Rt = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, zt = (e, t, n) => {
	let r = D(e);
	for (let i = 0; i < r; i++) {
		let r = ve(e, i);
		if (n(1 + Rt(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, Bt = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, Vt = (e) => typeof e == "string" && e.length + 1 > ye, Ht = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = D(e);
	for (let n = 0; n < a; n++) {
		let r = ve(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), Vt(r) ? i.long.push(r) : i.set.add(Bt(r));
	}
	return n?.set(e, i), i;
}, Ut = ({ set: e, long: t }, n, r) => {
	if (Vt(n)) {
		for (let e of t) if (r(1 + Rt(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(Bt(n)));
}, Wt = (e, t, n) => {
	let r = D(e);
	for (let i = 0; i < r; i++) if (n(), T(e, i) && t(e[i])) return !0;
	return !1;
}, Gt = {
	eq: At,
	ne: jt,
	lt: Pt,
	le: Ft,
	gt: It,
	ge: Lt,
	in: (e, t, n = w) => O(t) ? zt(t, e, n) !== -1 : !1,
	nin: (e, t, n = w) => O(t) ? zt(t, e, n) === -1 : !1,
	subsetof: (e, t, n = w, r) => {
		if (!O(e) || !O(t)) return !1;
		let i = Ht(t, n, r);
		return !Wt(e, (e) => !Ut(i, e, n), n);
	},
	anyof: (e, t, n = w, r) => {
		if (!O(e) || !O(t)) return !1;
		let i = Ht(t, n, r);
		return Wt(e, (e) => Ut(i, e, n), n);
	},
	noneof: (e, t, n = w, r) => {
		if (!O(e) || !O(t)) return !1;
		let i = Ht(t, n, r);
		return !Wt(e, (e) => Ut(i, e, n), n);
	},
	sizeof: (e, t) => !O(e) && !j(e) || !O(t) && !j(t) ? !1 : (O(e) ? D(e) : e.length) === (O(t) ? D(t) : t.length),
	size: (e, t) => !O(e) && !j(e) || !A(t) ? !1 : (O(e) ? D(e) : e.length) === t
}, Kt = (e) => !O(e) && !j(e) ? !1 : (O(e) ? D(e) : e.length) === 0, qt = (e, t, n, r = w, i) => !j(e) || !j(t) ? !1 : Ot(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Jt = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), L = (e, t) => e.concat(`[${t}]`), R = (e, t) => e < 0 ? t + e : e, Yt = (e, t) => {
	let n = D(e), r = R(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: T(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, z = (e, t) => {
	for (let n of t) e.push(n);
}, Xt = 1e6, Zt = 100, Qt = 1e6, $t = 20, en = 1e4, tn = 1e4, nn = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					T(n, r) && this.visit(n[r]);
				} else if (T(n, t)) this.visit(n[t]);
				else if (++e.holes > tn) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!T(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), O(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: D(e),
				i: 0,
				holes: 0
			});
			else if (k(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, rn = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Jt(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Jt(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = D(e);
			for (let r = 0; r < n; r++) this.tick(), T(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new nn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(en, Math.ceil((this.retained - this.retainedLimit) / $t))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new C(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Xt, Zt * e.weight) + t, this.retainedLimit = Math.max(Qt, $t * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new nn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(en, Math.ceil((this.steps - this.stepLimit) / Zt))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new C(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!k(e)) return;
			let r = this.canonicalName(n, n.value);
			if (T(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (O(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: L(t, r)
					});
				}), n;
			}
			if (k(e)) {
				let n = E(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) T(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!O(e)) return;
			let r = Yt(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: L(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (O(e)) {
				let r = Yt(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: L(t, r.index)
				} : void 0;
			}
			if (k(e)) {
				let r = String(n.value);
				return T(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!O(e)) return [];
			let r = D(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : R(n.start, r), o = n.end === null ? r : R(n.end, r)) : (a = n.start === null ? r - 1 : R(n.start, r), o = n.end === null ? -r - 1 : R(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: T(e, u) ? e[u] : void 0,
				paths: L(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (k(e.value)) {
						let t = this.handleIdentifier(e, r);
						M(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (k(e.value)) {
						let t = this.handleStringLiteral(e, r);
						M(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (O(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						M(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					z(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": z(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						M(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						z(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						z(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						M(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (k(e)) {
					let t = E(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else O(e) && i.push({
					parent: a,
					keys: null,
					length: D(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!T(n, t)) continue;
						a = {
							value: n[t],
							paths: L(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!T(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!A(i) || !A(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return A(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return Kt(n);
			if (t.operator === "reg") return qt(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = Gt[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new yt(r.value) : new yt(M(r?.value) ? [r?.value] : []);
			}), i = kt[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : M(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : M(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (O(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: L(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (k(n)) {
						let i = E(n);
						this.tick(i.length);
						for (let a of i) {
							if (!T(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!M(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) z(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw xe(e) ? new C("Query is nested too deeply") : Se(e) ? new C("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Xt, this.retainedLimit = this.adaptiveLimit ? Qt : Infinity;
	}
}, an = (e, t, n) => {
	let r = Pe(t), i = new rn(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? Ce(i) ? [] : [i.value] : i?.value;
}, on = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = an(e, i, n);
		M(t) && r.push(t);
	}
	return r;
}, B = (e, t, n = {}) => {
	try {
		return O(t) ? on(e, t, n) : an(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, sn = {
	unshift: (e, t) => e?.unshift(structuredClone(t)),
	push: (e, t) => e?.push(structuredClone(t)),
	unshiftSerialToRows: (e, t) => {
		e?.forEach((e, n) => {
			let r = structuredClone(t);
			r.textContent = n + 1, e?.children?.unshift(r);
		});
	},
	pushToRows: (e, t) => {
		e?.forEach((e) => {
			e?.children?.push(structuredClone(t));
		});
	}
}, cn = {
	applyTemplate: (e, t) => {
		let n = l[e.templateKey], r = b(B(t, e.sourcePath), n);
		B(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(r);
	},
	fromCollection: (e, t) => {
		let n = l[e.templateKey], r = oe(B(t, e.sourcePath), n);
		B(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...r);
	},
	rowOnColumn: (e, t) => {
		let n = ce({
			columns: B(t, e.sourcePath?.columns),
			data: B(t, e.sourcePath?.rows),
			columnSpec: l[e.templateKey?.columnKey],
			rowSpec: l[e.templateKey?.rowKey]
		});
		B(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...n);
	},
	columnOnRow: (e, t) => {
		let n = le({
			columns: B(t, e.sourcePath?.columns),
			data: B(t, e.sourcePath?.rows),
			columnSpec: l[e.templateKey?.columnKey],
			rowSpec: l[e.templateKey?.rowKey]
		});
		B(t, e.destinationPath?.jsonPath, { returnArray: !0 })[0]?.push(...n);
	}
}, ln = (e, t, n = !1) => {
	if (e.skipIf && B(t.base, e.skipIf, { returnArray: !0 }).length > 0) return t;
	if (e.func === null) {
		let r = l[e.templateKey];
		if (r === void 0) throw Error(`Instruction spec not found: ${e.templateKey}`);
		let i = B(t, e.destinationPath?.jsonPath, { returnArray: !0 }), a = sn[e.destinationPath?.action];
		return a?.(i[0], r), n && console.log("template : ", i, r), n && console.log("state : ", t), t;
	}
	let r = cn[e.func];
	if (!r) throw Error(`Unsupported instruction func: ${e.func}`);
	return r(e, t), n && console.log("state : ", t), t;
}, un = (t, n, r = !1) => {
	let i = e[t];
	if (!i) throw Error(`Single instruction not found: ${t}`);
	return ln(m(t, i), n, r);
}, dn = {
	"set-serial": [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	serial: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshiftSerialToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	search: [{
		narration: "Prepend the search row to top of the table.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-parent']"
		},
		sourcePath: null,
		templateKey: "tableSearch",
		func: null
	}],
	"options-show-button": [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				action: "pushToRows",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	"options-show-edit-button": [
		{
			narration: "Append edit column width.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForEditOption",
			func: null
		},
		{
			narration: "Append edit header.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerForEditOption",
			func: null
		},
		{
			narration: "Append edit button cells to table rows.",
			destinationPath: {
				action: "pushToRows",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
			},
			sourcePath: null,
			templateKey: "optionsEditButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the edit action column.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	"options-show-delete-button": [
		{
			narration: "Append delete column width.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-colgroup'].children"
			},
			sourcePath: null,
			templateKey: "colGroupForDeleteOption",
			func: null
		},
		{
			narration: "Append delete header.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-header-row'].children"
			},
			sourcePath: null,
			templateKey: "headerForDeleteOption",
			func: null
		},
		{
			narration: "Append delete button cells to table rows.",
			destinationPath: {
				action: "pushToRows",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-body'].children"
			},
			sourcePath: null,
			templateKey: "optionsDeleteButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the delete action column.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'table-footer-row'].children"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	"card-with-footer": [
		{
			narration: "Build card header content.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-header'].children"
			},
			sourcePath: "$.data",
			templateKey: "buildCardHeaderTemplate",
			func: "applyTemplate"
		},
		{
			narration: "Build card body content.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-body'].children"
			},
			sourcePath: "$.data",
			templateKey: "buildCardBodyTemplate",
			func: "applyTemplate"
		},
		{
			narration: "Build card footer content.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'card-footer'].children"
			},
			sourcePath: "$.data",
			templateKey: "buildCardFooterTemplate",
			func: "applyTemplate"
		}
	],
	"table-search-toolbar": [
		{
			narration: "Insert the search toolbar frame before the table.",
			destinationPath: {
				action: "unshift",
				jsonPath: "$.base.children"
			},
			sourcePath: null,
			templateKey: "searchToolbar",
			func: null,
			skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
		},
		{
			narration: "Insert the search label into its configured slot.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-label-slot'].children"
			},
			sourcePath: null,
			templateKey: "searchLabel",
			func: null,
			skipIf: "$..*[?@.attributes.id == 'table-title']"
		},
		{
			narration: "Insert the search helper text into its configured slot.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-helper-slot'].children"
			},
			sourcePath: null,
			templateKey: "searchHelper",
			func: null,
			skipIf: "$..*[?@.attributes.id == 'search-feedback']"
		},
		{
			narration: "Insert the search input into its configured slot.",
			destinationPath: {
				action: "push",
				jsonPath: "$.base..*[?@.attributes['data-role'] == 'search-input-slot'].children"
			},
			sourcePath: null,
			templateKey: "searchInput",
			func: null,
			skipIf: "$..*[?@.attributes.id == 'tableSearch']"
		}
	]
}, fn = (e, t) => {
	if (!Array.isArray(t)) throw Error(`Multi instruction not found: ${e}`);
	return t.forEach((t, n) => {
		m(e, t, {
			type: "multi",
			stepIndex: n
		});
	}), t;
}, pn = {
	single: un,
	multi: (e, t, n = !1) => {
		let r = dn[e];
		return fn(e, r).forEach((e) => ln(e, t, n)), t;
	}
}, mn = (e, t, n = !1) => {
	if (!e || typeof e != "object") throw Error(`Invalid instruction descriptor: expected { type, key }, got ${String(e)}`);
	let { type: r, key: i } = e, a = pn[r];
	if (!a) throw Error(`Unsupported instruction type "${r}" for key "${i}". Expected "single" or "multi".`);
	return a(i, t, n);
}, hn = {
	name: "json-renderers-run-instructions",
	version: "1.14.1"
}, gn = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.steps = {
		meta: hn,
		runInstructions: e
	});
}, _n = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	mn(e, {
		base: t,
		data: n
	}, r);
}), t);
gn(_n);
export { _n as default, mn as executeStep };
