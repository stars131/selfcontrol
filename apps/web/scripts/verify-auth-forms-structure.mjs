import fs from "node:fs";
import path from "node:path";

for (const [relativePath, getterName, maxAllowedLines] of [
  ["components/login-form.tsx", "getLoginFormCopy", 120],
  ["components/register-form.tsx", "getRegisterFormCopy", 150],
]) {
  const source = fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
  const lineCount = source.split(/\r?\n/).length;

  if (!source.includes('from "./auth-form-copy";')) {
    throw new Error(`${relativePath} must import auth-form-copy`);
  }

  if (!source.includes(`${getterName}(locale)`)) {
    throw new Error(`${relativePath} must delegate locale copy lookup to ${getterName}`);
  }

  for (const forbiddenToken of ["const COPY:", "const DISPLAY_COPY:", "Record<", "LocaleCode"]) {
    if (source.includes(forbiddenToken)) {
      throw new Error(`${relativePath} must keep auth-form copy delegated: ${forbiddenToken}`);
    }
  }

  if (lineCount > maxAllowedLines) {
    throw new Error(`${relativePath} exceeded ${maxAllowedLines} lines: ${lineCount}`);
  }
}

console.log("auth-form structure verification passed");
