import fs from "node:fs";
import path from "node:path";

const authFormFramePath = path.resolve(process.cwd(), "components/auth-form-frame.tsx");
const authFormFrameSource = fs.readFileSync(authFormFramePath, "utf8");
const authFormFrameLines = authFormFrameSource.split(/\r?\n/).length;

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

  if (lineCount > maxAllowedLines) {
    throw new Error(`${relativePath} exceeded ${maxAllowedLines} lines: ${lineCount}`);
  }
}

for (const requiredFrameToken of [
  'import { LanguageSwitcher } from "./language-switcher";',
  'type AuthFormFrameProps = {',
  "<LanguageSwitcher locale={locale} onChange={onLocaleChange} />",
  '<Link className="button secondary" href={alternateHref}>',
  '<main className="page-shell">',
]) {
  if (!authFormFrameSource.includes(requiredFrameToken)) {
    throw new Error(`components/auth-form-frame.tsx must own shared auth layout rendering: ${requiredFrameToken}`);
  }
}

if (authFormFrameLines > 50) {
  throw new Error(`components/auth-form-frame.tsx exceeded 50 lines: ${authFormFrameLines}`);
}

console.log("auth-form structure verification passed");
