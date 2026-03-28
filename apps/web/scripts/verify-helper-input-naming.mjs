import fs from "node:fs";
import path from "node:path";

const componentsDir = path.resolve(process.cwd(), "components");
const targetExtensions = new Set([".ts", ".tsx"]);
const violations = [];

function scanDirectory(directoryPath) {
  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(entryPath);
      continue;
    }

    if (!targetExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const source = fs.readFileSync(entryPath, "utf8");
    const lines = source.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (!line.includes("export function ")) {
        return;
      }

      const match = line.match(/\bexport function (build|create|use)[A-Za-z0-9_]*\(props:/);
      if (!match) {
        return;
      }

      violations.push(`${path.relative(process.cwd(), entryPath)}:${index + 1}`);
    });
  }
}

scanDirectory(componentsDir);

if (violations.length > 0) {
  throw new Error(
    `build/create/use helpers must prefer explicit input naming over props. Violations: ${violations.join(", ")}`,
  );
}

console.log("helper input naming verification passed");
