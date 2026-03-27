import fs from "node:fs";
import path from "node:path";

const roots = [
  path.resolve(process.cwd(), "components"),
  path.resolve(process.cwd(), "lib"),
];

const localeHints = ['"zh-CN"', "LocaleCode", "Record<LocaleCode"];
const suspiciousTokens = [
  "銈",
  "銉",
  "銇",
  "鍒涘",
  "鍏变",
  "璁板",
  "鏃ュ",
  "鐭ヨ",
  "濯掍",
  "鏇存",
  "鍔犲",
  "杩",
  "鏆",
  "闁",
];

const allowedExtensions = new Set([".ts", ".tsx"]);
const ignoredSuffixes = [".types.ts", ".d.ts"];
const findings = [];

function shouldInspect(filePath) {
  const extension = path.extname(filePath);
  if (!allowedExtensions.has(extension)) {
    return false;
  }
  return !ignoredSuffixes.some((suffix) => filePath.endsWith(suffix));
}

function walk(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!shouldInspect(fullPath)) {
      continue;
    }

    const source = fs.readFileSync(fullPath, "utf8");
    if (!localeHints.some((hint) => source.includes(hint))) {
      continue;
    }

    for (const token of suspiciousTokens) {
      if (source.includes(token)) {
        findings.push({
          file: path.relative(process.cwd(), fullPath),
          token,
        });
      }
    }
  }
}

for (const root of roots) {
  walk(root);
}

if (findings.length) {
  for (const finding of findings) {
    console.error(`Suspicious locale copy token "${finding.token}" found in ${finding.file}`);
  }
  throw new Error("Locale copy integrity verification failed");
}

console.log("locale copy integrity verification passed");
