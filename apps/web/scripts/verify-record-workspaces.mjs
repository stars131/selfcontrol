import fs from "node:fs";
import path from "node:path";

function readSource(relativePath) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

function verifyLineLimit(relativePath, maxAllowedLines) {
  const lineCount = readSource(relativePath).split(/\r?\n/).length;
  if (lineCount > maxAllowedLines) {
    throw new Error(`${relativePath} exceeded ${maxAllowedLines} lines: ${lineCount}`);
  }
}

const editorWorkspacePath = "components/record-editor-workspace.tsx";
const editorWorkspaceSource = readSource(editorWorkspacePath);

if (!editorWorkspaceSource.includes('from "./record-editor-workspace-bindings";')) {
  throw new Error("record-editor-workspace.tsx must import record-editor-workspace-bindings");
}

for (const forbiddenToken of ["setForm((", "setLocationReviewForm(("]) {
  if (editorWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-editor-workspace.tsx must keep state-update closures in bindings helpers: ${forbiddenToken}`);
  }
}

verifyLineLimit(editorWorkspacePath, 340);

const browseWorkspacePath = "components/record-browse-workspace.tsx";
const browseWorkspaceSource = readSource(browseWorkspacePath);

for (const forbiddenToken of ["useState(", "useEffect(", "useMemo(", "fetchMediaBlob(", "const handle"]) {
  if (browseWorkspaceSource.includes(forbiddenToken)) {
    throw new Error(`record-browse-workspace.tsx must remain a composition shell: ${forbiddenToken}`);
  }
}

verifyLineLimit(browseWorkspacePath, 240);

console.log("record workspaces verification passed");
