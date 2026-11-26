import writePath from "json-write-path";
import { query } from "jsonpathly";

export const hasMatch = (root, jsonPath) => {
    if (!jsonPath) return true;
    return root !== undefined && query(root, jsonPath, { returnArray: true }).length > 0;
};

export const hasDestination = (state, destinationPath) => {
    if (!destinationPath?.jsonPath) return true;
    return hasMatch(state?.[destinationPath.fileName], destinationPath.jsonPath);
};

export const resolveSource = (sourcePath, state) => {
    if (!sourcePath) return null;

    const root = state[sourcePath.fileName];
    if (root === undefined) {
        throw new Error(`Entry not found in state: ${sourcePath.fileName}`);
    }

    if (sourcePath.jsonPath) {
        const matches = query(root, sourcePath.jsonPath, { returnArray: true });
        if (matches.length === 0) {
            if (Array.isArray(root)) return root;
            return [];
        }
        return matches.length === 1 ? matches[0] : matches;
    }

    if (Array.isArray(sourcePath.filePath) && sourcePath.filePath.length > 0) {
        return sourcePath.filePath.reduce((curr, key) => (curr ? curr[key] : undefined), root);
    }

    return root;
};

export const writeResult = (state, destinationPath, result, showLog = false) => {
    if (!destinationPath) return;

    if (!destinationPath.filePath || destinationPath.filePath.length === 0) {
        const target = state[destinationPath.fileName];
        if (Array.isArray(target)) {
            target.push(...(Array.isArray(result) ? result : [result]));
        } else {
            state[destinationPath.fileName] = result;
        }
        return;
    }

    try {
        writePath(state, destinationPath, result, showLog);
    } catch {
        // Safe skip when destination container does not exist in target canvas
    }
};
