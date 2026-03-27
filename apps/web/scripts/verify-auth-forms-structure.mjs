import fs from "node:fs";
import path from "node:path";

const authFormFramePath = path.resolve(process.cwd(), "components/auth-form-frame.tsx");
const authFormFrameTypesPath = path.resolve(process.cwd(), "components/auth-form-frame.types.ts");
const authFormFrameSource = fs.readFileSync(authFormFramePath, "utf8");
const authFormFrameTypesSource = fs.readFileSync(authFormFrameTypesPath, "utf8");
const authFormFrameLines = authFormFrameSource.split(/\r?\n/).length;
const authFormFrameTypesLines = authFormFrameTypesSource.split(/\r?\n/).length;

for (const [relativePath, getterName, maxAllowedLines] of [
  ["components/login-form.tsx", "getLoginFormCopy", 95],
  ["components/register-form.tsx", "getRegisterFormCopy", 110],
]) {
  const source = fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
  const lineCount = source.split(/\r?\n/).length;

  if (!source.includes('from "./auth-form-copy";')) {
    throw new Error(`${relativePath} must import auth-form-copy`);
  }

  if (!source.includes(`${getterName}(locale)`)) {
    throw new Error(`${relativePath} must delegate locale copy lookup to ${getterName}`);
  }

  if (relativePath === "components/login-form.tsx" && !source.includes("copy.loginFailed")) {
    throw new Error(`${relativePath} must delegate login fallback errors to auth-form copy`);
  }

  if (relativePath === "components/register-form.tsx" && !source.includes("copy.registerFailed")) {
    throw new Error(`${relativePath} must delegate register fallback errors to auth-form copy`);
  }

  if (!source.includes('import { AuthFormFrame } from "./auth-form-frame";')) {
    throw new Error(`${relativePath} must import AuthFormFrame`);
  }

  for (const requiredFrameUsage of [
    "<AuthFormFrame",
    "alternateHref=",
    "alternateLabel=",
    "locale={locale}",
    "onLocaleChange={setLocale}",
  ]) {
    if (!source.includes(requiredFrameUsage)) {
      throw new Error(`${relativePath} must delegate shared auth layout to AuthFormFrame: ${requiredFrameUsage}`);
    }
  }

  for (const forbiddenLayoutToken of [
    'from "./language-switcher";',
    'className="page-shell"',
    'className="panel auth-panel"',
    'className="panel-header"',
    'className="hero-actions"',
  ]) {
    if (source.includes(forbiddenLayoutToken)) {
      throw new Error(`${relativePath} must keep shared auth shell layout delegated: ${forbiddenLayoutToken}`);
    }
  }

  for (const forbiddenToken of ["const COPY:", "const DISPLAY_COPY:", "Record<", "LocaleCode"]) {
    if (source.includes(forbiddenToken)) {
      throw new Error(`${relativePath} must keep auth-form copy delegated: ${forbiddenToken}`);
    }
  }

  for (const forbiddenErrorFallback of ['"Login failed"', '"Register failed"']) {
    if (source.includes(forbiddenErrorFallback)) {
      throw new Error(`${relativePath} must not hardcode auth fallback errors: ${forbiddenErrorFallback}`);
    }
  }

  if (lineCount > maxAllowedLines) {
    throw new Error(`${relativePath} exceeded ${maxAllowedLines} lines: ${lineCount}`);
  }
}

for (const requiredFrameToken of [
  'import { LanguageSwitcher } from "./language-switcher";',
  'import type { AuthFormFrameProps } from "./auth-form-frame.types";',
  "}: AuthFormFrameProps) {",
  "<LanguageSwitcher locale={locale} onChange={onLocaleChange} />",
  '<Link className="button secondary" href={alternateHref}>',
  '<main className="page-shell">',
]) {
  if (!authFormFrameSource.includes(requiredFrameToken)) {
    throw new Error(`components/auth-form-frame.tsx must own shared auth layout rendering: ${requiredFrameToken}`);
  }
}

for (const forbiddenFrameToken of [
  "type AuthFormFrameProps = {",
]) {
  if (authFormFrameSource.includes(forbiddenFrameToken)) {
    throw new Error(`components/auth-form-frame.tsx must keep auth frame prop typing delegated: ${forbiddenFrameToken}`);
  }
}

if (authFormFrameLines > 50) {
  throw new Error(`components/auth-form-frame.tsx exceeded 50 lines: ${authFormFrameLines}`);
}

for (const requiredFrameTypesToken of [
  'import type { ReactNode } from "react"; import type { LocaleCode } from "../lib/locale"; export type AuthFormFrameProps = { alternateHref: string; alternateLabel: string; children: ReactNode; eyebrow: string; locale: LocaleCode; onLocaleChange: (locale: LocaleCode) => void; title: string };',
]) {
  if (!authFormFrameTypesSource.includes(requiredFrameTypesToken)) {
    throw new Error(`components/auth-form-frame.types.ts must own auth frame prop typing: ${requiredFrameTypesToken}`);
  }
}

if (authFormFrameTypesLines > 2) {
  throw new Error(`components/auth-form-frame.types.ts exceeded 2 lines: ${authFormFrameTypesLines}`);
}

console.log("auth-form structure verification passed");
