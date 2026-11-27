# Version 13 Story: Pure Orchestration Across Single & Multi Folders

## Why v13 Exists

Building a real UI table revealed two truths at the same time:

1. **Some table operations change one slot (`single`)**: building `colgroup`, headers, rows, footer inputs, search slots, or row serial cells.
2. **Other table operations touch every column slot in lockstep (`multi`)**: adding a serial header + width + footer (`set-serial`), or appending an options column header + width + row button + footer action (`options-show-button`, `options-show-edit-button`, `options-show-delete-button`).

When both lived in one giant `declarative-instructions` catalog and one `executeStep.js` file, the runner carried too many responsibilities: importing catalogs, guessing array vs object shapes, dispatching transforms, and mutating rows—all in the same place.

## The v13 Design: Orchestrator Above, Workers Below

In `v13`, the layers split strictly by job:

```text
Caller ({ instructions: [{ type, key }, ...], base, data })
  │
  ▼
v13/index.js ──▶ v13/executeStep.js (Pure Orchestrator)
                    ├── type === "single" ──▶ single/index.js (declarative-instructions-single)
                    └── type === "multi"  ──▶ multi/index.js  (declarative-instructions-multi)
                                                  └──▶ shares single/runStep.js
```

- **`index.js` & `executeStep.js` are orchestration only**: They loop over descriptors, validate `{ type, key }`, and hand control to `single/` or `multi/`—zero knowledge of specs, JSONPaths, or DOM templates.
- **`single/index.js`** owns looking up atomic instructions in `declarative-instructions-single` and running each step onto `base` via `single/runStep.js`.
- **`multi/index.js`** owns looking up composite sequences in `declarative-instructions-multi` and running each step sequentially using the same shared `single/runStep.js` primitive.
- **No legacy `declarative-instructions` dependency**: Because `single` and `multi` replaced the mixed catalog cleanly, the old monolithic catalog package is gone from dependencies.

## What You Gain Next

Because execution order is explicit right at the call site (`single` → `multi` → `single` → `multi`), callers control exact table assembly order while keeping every module small enough to read in seconds—and leaving `declarative-definitions` ready to store those ordered `{ type, key }` recipes whenever a table layout is finalized.
