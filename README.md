# json-renderers-run-instructions-steps

An ordered executor for single and multi instruction descriptors. It applies them to a caller-provided JSON specification tree and returns that same tree.

## The story

The caller supplies an ordered list such as <code>{ type: "single", key: "buildBody" }</code>, a mutable <code>base</code> tree, and input <code>data</code>. The runner creates a state from <code>{ base, data }</code>, resolves each descriptor, and lets the appropriate instruction runner update the tree.

A single descriptor selects one atomic instruction. A multi descriptor selects a group of atomic steps; the group is checked before any of its steps run, then its steps run in order. The runner returns the same base object after mutation. It does not choose a component definition, clone a spec, or render DOM.

## The V15 execution story

For each atomic instruction, the current single-step runner follows this sequence:

1. Check its optional <code>skipIf</code> condition.
2. For <code>func: null</code>, apply the configured template action directly.
3. Otherwise, read values from <code>sourcePath</code>, build a result using <code>func</code> and <code>templateKey</code>, then write it to <code>destinationPath</code>.

The multi runner validates its group first, then sends every atomic step through that same runner. The detailed module story is in [src/v15/STORY.md](src/v15/STORY.md).

## Quick start

~~~~js
import runInstructions from "json-renderers-run-instructions-steps";
import spec from "declarative-spec";

const base = structuredClone(spec.tableWithFooter);

const result = runInstructions({
  instructions: [
    { type: "single", key: "buildColgroup" },
    { type: "single", key: "buildHeader" },
    { type: "single", key: "buildBody" },
    { type: "single", key: "buildFooter" }
  ],
  base,
  data: { columns, data }
});

// result is the same object as base, now populated.
~~~~

## API

| Parameter | Purpose |
| --- | --- |
| <code>instructions</code> | Ordered array of <code>{ type, key }</code> descriptors. |
| <code>base</code> | Existing JSON specification tree to update in place. |
| <code>data</code> | Input object queried by the instruction source paths. |
| <code>showLog</code> | Optional execution logging, defaulting to <code>false</code>. |

The default export returns <code>base</code>. The named <code>executeStep</code> export runs one descriptor.

## Current sample

The highest sample directory in this package is [V7 table](samples/v7/table/index.js). It demonstrates the descriptor sequence and final handoff of the assembled JSON tree to <code>json-to-dom</code>.

## Install

~~~~bash
npm install json-renderers-run-instructions-steps
~~~~

## License

MIT © KeshavSoft.

