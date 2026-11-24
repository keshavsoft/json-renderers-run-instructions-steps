# ARCHITECTURE CONTRACT: The Canvas Pattern

> **Core Mandate:** `json-renderers-run-instructions-steps` strictly expects **`base`** (an in-memory JSON canvas object), **NEVER** `baseKey` (a string lookup key).

---

## 1. Executive Summary & The Golden Rule

```
                       ┌──────────────────────────────────────────────┐
                       │   runInstructions({ instructions, base, data })   │
                       └──────────────────────┬───────────────────────┘
                                              │
                         Mutates target paths inside base
                                              │
                                              ▼
                                         Returns base
```

In `json-renderers-run-instructions-steps`, the function signature is:

```typescript
function runInstructions({
    instructions: string[],
    base: Record<string, any>,
    data: { columns?: any[]; data?: any[] },
    showLog?: boolean
}): Record<string, any>
```

### The Inviolable Contract
1. **Never send `baseKey`**. The parameter is `base`.
2. **`base` must be a cloned JSON AST object** (the canvas), never a string or catalog key.
3. **`runInstructions` returns `base`**. It receives the canvas, mutates its sub-trees in-place via `executeStep` and `writeResult`, and returns the exact same canvas.
4. **Never try to change `base` to `baseKey`**. Doing so breaks the multi-task pipeline in parent orchestrators like `json-renderers-run-instructions`.

---

## 2. The Ecosystem Architecture & Role Division

To understand why `baseKey` is an architectural blunder, one must understand how `json-renderers-run-instructions-steps` fits into the broader KeshavSoft declarative rendering ecosystem:

| Package | Architectural Role | Responsibility |
| :--- | :--- | :--- |
| **`declarative-definitions`** | **The Blueprint Library** | Contains recipe definitions (`table.simple`, `select.simple`, etc.) specifying `baseFromSpec`, `instructions`, and `options`. |
| **`declarative-spec` / `spec-repo`** | **The Raw Catalog** | Static dictionary of clean HTML AST templates (`tableSimple`, `buildHeader`, `buildBodyCell`, etc.). |
| **`json-renderers-run-instructions`** | **The Master Orchestrator** | Resolves the definition, creates a fresh canvas clone from the spec catalog, and coordinates Task 1 and Task 2. |
| **`json-renderers-run-instructions-steps`** | **Task 1: The Step Worker (This Package)** | Receives the canvas (`base`) and sequentially mounts the core structural elements into it. |
| **`json-renderers-run-options`** | **Task 2: The Options Decorator** | Receives the *same* canvas (`base`) and mounts dynamic features (search bar, pagination, serial numbering, buttons). |
| **`json-to-dom`** | **The Physical Renderer** | Takes the completed AST canvas and mounts it to the browser DOM. |

---

## 3. The Lifecycle: How `json-renderers-run-instructions` Consumes Steps

Look at how the master orchestrator (`json-renderers-run-instructions/src/v15/index.js`) works:

```javascript
import { definitions } from "declarative-definitions";
import { spec } from "declarative-spec";
import runInstructions from "json-renderers-run-instructions-steps";
import runOptions from "./runOptions/index.js";

const startFunc = ({ instructionMainKey, instructionSubKey, data, options, showLog }) => {
    const definition = definitions[instructionMainKey]?.[instructionSubKey];

    // STAGE 0: The Canvas is created once by cloning the template from the catalog
    const base = structuredClone(spec[definition.baseFromSpec]);

    // STAGE 1: Core structural steps execute on the canvas (mutating base in place)
    runInstructions({
        instructions: definition.instructions ?? [],
        base,
        data,
        showLog
    });

    // STAGE 2: Dynamic feature options execute on the EXACT SAME canvas
    runOptions({
        options,
        optionDefs: definition.options,
        base,
        data,
        showLog
    });

    // STAGE 3: The fully assembled canvas is delivered to the caller
    return base;
};
```

Notice the critical flow:
1. `base` is instantiated **once** by the orchestrator.
2. `runInstructions` (this package) mutates `base` during Stage 1.
3. `runOptions` mutates that **same** `base` during Stage 2.
4. The orchestrator returns that completed `base`.

---

## 4. Why `baseKey` Was an Architectural Blunder (The 5 Fatal Flaws)

When `baseKey` was introduced in versions 5 and 6, it created severe system-wide breakage:

### Fatal Flaw 1: It Severed the Shared In-Memory Canvas Pipeline
In `json-renderers-run-instructions`, Stage 1 (`runInstructions`) and Stage 2 (`runOptions`) **must operate on the exact same canvas reference**.
If `runInstructions` expects `baseKey`:
- It ignores any existing canvas passed by the orchestrator.
- It is forced to instantiate its own local canvas inside `runInstructions`.
- Stage 2 (`runOptions`) would either operate on an empty/unpopulated canvas or require awkward intermediate reassignment, destroying pipeline composability.

### Fatal Flaw 2: Violation of the Return Contract Symmetry
`runInstructions` has always returned `base`.
- If a function accepts `base` and returns `base`, the contract is clear and predictable: **Canvas in $\rightarrow$ Canvas out**.
- If a function accepts a string `baseKey` and returns an object `base`, it is masquerading as a factory/catalog-instantiator while named a "step runner".

### Fatal Flaw 3: Catastrophic Spec Catalog Pollution ("Poisoning the Well")
If `runInstructions` took `baseKey` and executed:
```javascript
const base = spec[baseKey]; // NO structuredClone!
```
Every instruction step (`buildColgroup`, `buildHeader`, `buildBody`) would mutate `state.base` **directly inside the module's cached static spec**.
The next time any component requested `tableSimple`, the catalog entry would already be contaminated with old rows, headers, and IDs from the previous render!

### Fatal Flaw 4: Inversion of Responsibility & Catalog Bloat
`json-renderers-run-instructions-steps` is an AST transformer, not a catalog warehouse.
- When it expects `baseKey`, it is forced to import and bundle `declarative-spec` (or `spec-repo`).
- This bloated the distribution bundle from a few kilobytes of pure orchestration logic to over 5,000 lines of static catalog JSON.
- Worse, users could no longer pass custom AST structures or mock canvases; they were artificially constrained to only the keys hardcoded in that specific catalog bundle.

### Fatal Flaw 5: Complete Incompatibility with the Master Orchestrator
The primary caller across the entire framework is `json-renderers-run-instructions`.
The orchestrator sends:
```javascript
runInstructions({ instructions, base, data, showLog });
```
When `runInstructions` was changed to expect `baseKey`, all integration tests and end-to-end component renders crashed because `baseKey` was `undefined`!

---

## 5. Architectural Comparison: The Anti-Pattern vs The Standard

```javascript
// ❌ THE BLUNDER (Versions 5 & 6)
// Anti-Pattern: Steps runner acts as catalog owner
import spec from "declarative-spec"; // Bloated bundle dependency!

const runInstructions = ({ instructions = [], baseKey, data }) => {
    const base = spec[baseKey]; // ❌ Mutates global catalog! Cannot receive in-flight canvas!

    instructions.forEach(key => executeStep(key, { base, data }));
    return base;
};
```

```javascript
// ✅ THE ARCHITECTURAL STANDARD (Version 7)
// Correct: Steps runner is a pure, zero-dependency canvas worker
const runInstructions = ({ instructions = [], base, data, showLog = false } = {}) => {
    // base is provided by the caller (clean, cloned canvas)
    instructions.forEach(key => {
        executeStep(key, { base, data }, showLog);
    });

    // Returns the populated canvas
    return base;
};
```

---

## 6. Programmatic Governance: What Must NEVER Be Done

1. **NEVER change `base` to `baseKey`** in `runInstructions` or its parameter signature.
2. **NEVER import a spec catalog into `runInstructions`** to resolve a canvas template.
3. **NEVER reassign `base` to a new object** inside `runInstructions`. The runner must perform deterministic mutations onto the provided `base` reference via `writeResult`.
4. **ALWAYS clone the template in the orchestrator** (`structuredClone(spec[key])`) before passing it to `runInstructions`.
5. **ALWAYS preserve the contract:**
   $$\text{Input: } (\text{instructions}, \text{base}, \text{data}) \longrightarrow \text{Output: } \text{base}$$
