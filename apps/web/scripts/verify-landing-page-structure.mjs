import fs from "node:fs";
import path from "node:path";

const landingPagePath = path.resolve(process.cwd(), "components/landing-page-client.tsx");
const source = fs.readFileSync(landingPagePath, "utf8");
const lineCount = source.split(/\r?\n/).length;

if (!source.includes('import { getLandingPageCopy } from "./landing-page-copy";')) {
  throw new Error("landing-page-client.tsx must import getLandingPageCopy");
}

if (!source.includes("getLandingPageCopy(locale)")) {
  throw new Error("landing-page-client.tsx must delegate locale copy lookup to getLandingPageCopy");
}

for (const forbiddenToken of ["const COPY:", "const DISPLAY_COPY:", "Record<", "LocaleCode"]) {
  if (source.includes(forbiddenToken)) {
    throw new Error(`landing-page-client.tsx must keep landing-page copy delegated: ${forbiddenToken}`);
  }
}

const maxAllowedLines = 95;
if (lineCount > maxAllowedLines) {
  throw new Error(`landing-page-client.tsx exceeded ${maxAllowedLines} lines: ${lineCount}`);
}

console.log("landing-page structure verification passed");
