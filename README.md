# json-renderers-run-instructions-steps

> Sequential blueprint instruction step runner for JSON renderers with 3D dimensional orchestration.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-live-blue)](https://keshavsoft.github.io/json-renderers-run-instructions-steps/)

---

## What It Does

`json-renderers-run-instructions-steps` executes an array of declarative blueprint instruction keys sequentially upon an existing **`base` canvas AST** using the supplied input `data`.

```javascript
import runInstructions from "json-renderers-run-instructions-steps";
import { spec } from "declarative-spec";

// 1. Prepare your input data
const data = {
  columns: [
    { columnName: "Id" },
    { columnName: "Product" },
    { columnName: "Price" }
  ],
  data: [
    { Id: 1, Product: "Laptop", Price: 1200 },
    { Id: 2, Product: "Mouse", Price: 25 }
  ]
};

// 2. Clone the base canvas AST
const base = structuredClone(spec.tableSimple);

// 3. Run instructions directly against the base canvas
const canvas = runInstructions({
  instructions: ["buildColgroup", "buildHeader", "buildBody"],
  base,
  data,
  showLog: false
});

// Canvas is mutated in-place and returned
console.log(canvas);
```

---

## Architectural Contract: Expect `base`, NEVER `baseKey`

`json-renderers-run-instructions-steps` strictly enforces the **Canvas Pattern**:

```
Input:  { instructions, base, data, showLog? }
Output: base (mutated in-place and returned)
```

### The Rule

> **CRITICAL RULE**: `runInstructions` accepts `base` (an object/AST canvas), **NEVER** `baseKey` (a string).

### Why `base` and NOT `baseKey`?

1. **Pipeline Stage in `json-renderers-run-instructions`**:
   This package is **Task 1** inside the master runtime `json-renderers-run-instructions`.
   ```javascript
   // json-renderers-run-instructions orchestrates:
   const base = structuredClone(spec[definition.baseFromSpec]);

   // Task 1: Step Runner operates on the shared canvas
   runInstructions({ instructions: definition.instructions, base, data });

   // Task 2: Options Runner operates on the SAME canvas
   runOptions({ options, optionDefs, base, data });

   return base;
   ```
   Both tasks operate sequentially on the **same in-memory canvas reference**. If `steps` expected `baseKey`, the orchestrator could not pass its in-flight canvas.

2. **In-Place Mutation & Return**:
   `executeStep` uses `writeResult` to mount generated nodes directly into destination branches of `state.base`. Returning `base` guarantees symmetry: you hand in a canvas, the runner populates it, and hands it back.

3. **Catalog Decoupling**:
   By expecting `base`, this package has **zero coupling** to any specific specification catalog (`declarative-spec` or `spec-repo`). Callers can pass standard specs, custom layouts, or dynamic AST nodes without bundling megabytes of static catalog definitions.

4. **Zero Catalog Pollution**:
   If the package accepted a `baseKey` string and looked up `spec[baseKey]` internally without a deep clone, every run would mutate the global cached specification, corrupting future renders across the application.

---

## 3D Dimensional Orchestration

`json-renderers-run-instructions-steps` is a pure orchestrator. It contains zero transformation loops or ad-hoc algorithms; it delegates directly to the three dimensional transformer functions:

| Dimension          | Package                                 | Function                      | Usage                          |
| :----------------- | :-------------------------------------- | :---------------------------- | :----------------------------- |
| **0D (Primitive)** | `json-transformer-funcs-primitive`      | `applyTemplate`               | Cards, Badges, Containers      |
| **1D (Linear)**    | `json-transformer-funcs-one-dimension`  | `fromCollection`              | Colgroups, Headers, List items |
| **2D (Matrix)**    | `json-transformer-funcs-two-dimensions` | `rowOnColumn` & `columnOnRow` | Table body, Selects, DataLists |

---

## API Reference

### `runInstructions({ instructions, base, data, showLog })`

| Parameter      | Type       | Required | Description                                                  |
| :------------- | :--------- | :------- | :----------------------------------------------------------- |
| `instructions` | `string[]` | Yes      | Array of blueprint keys from `declarative-instructions`.     |
| `base`         | `object`   | Yes      | Target JSON canvas AST to mutate in-place. **Never a string!**|
| `data`         | `object`   | Yes      | Input data object containing `columns` and/or `data` arrays. |
| `showLog`      | `boolean`  | No       | Enable step-by-step console logs (default: `false`).         |

**Returns:** The mutated `base` canvas object.

---

## License

MIT © [KeshavSoft](https://github.com/keshavsoft)
