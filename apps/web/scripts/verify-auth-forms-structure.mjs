import fs from "node:fs";
import path from "node:path";

const authFormFramePath = path.resolve(process.cwd(), "components/auth-form-frame.tsx");
const authFormFrameTypesPath = path.resolve(process.cwd(), "components/auth-form-frame.types.ts");
const loginFormControllerTypesPath = path.resolve(
  process.cwd(),
  "components/login-form-controller.types.ts",
);
const registerFormControllerTypesPath = path.resolve(
  process.cwd(),
  "components/register-form-controller.types.ts",
);
const useLoginFormControllerPath = path.resolve(
  process.cwd(),
  "components/use-login-form-controller.ts",
);
const useRegisterFormControllerPath = path.resolve(
  process.cwd(),
  "components/use-register-form-controller.ts",
);
const authFormFrameSource = fs.readFileSync(authFormFramePath, "utf8");
const authFormFrameTypesSource = fs.readFileSync(authFormFrameTypesPath, "utf8");
const loginFormControllerTypesSource = fs.readFileSync(loginFormControllerTypesPath, "utf8");
const registerFormControllerTypesSource = fs.readFileSync(registerFormControllerTypesPath, "utf8");
const useLoginFormControllerSource = fs.readFileSync(useLoginFormControllerPath, "utf8");
const useRegisterFormControllerSource = fs.readFileSync(useRegisterFormControllerPath, "utf8");
const authFormFrameLines = authFormFrameSource.split(/\r?\n/).length;
const authFormFrameTypesLines = authFormFrameTypesSource.split(/\r?\n/).length;
const loginFormControllerTypesLines = loginFormControllerTypesSource.split(/\r?\n/).length;
const registerFormControllerTypesLines = registerFormControllerTypesSource.split(/\r?\n/).length;
const useLoginFormControllerLines = useLoginFormControllerSource.split(/\r?\n/).length;
const useRegisterFormControllerLines = useRegisterFormControllerSource.split(/\r?\n/).length;

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

  if (
    relativePath === "components/login-form.tsx" &&
    !source.includes('import { useLoginFormController } from "./use-login-form-controller";')
  ) {
    throw new Error(`${relativePath} must import useLoginFormController`);
  }

  if (
    relativePath === "components/register-form.tsx" &&
    !source.includes('import { useRegisterFormController } from "./use-register-form-controller";')
  ) {
    throw new Error(`${relativePath} must import useRegisterFormController`);
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

  for (const requiredControllerUsage of relativePath === "components/login-form.tsx"
    ? [
        "const controller = useLoginFormController(router, copy.loginFailed);",
        'onSubmit={controller.onSubmit}',
        "value={controller.account}",
        "controller.onAccountChange(event.target.value)",
        "value={controller.password}",
        "controller.onPasswordChange(event.target.value)",
        "controller.error",
        "controller.loading",
      ]
    : [
        "const controller = useRegisterFormController(router, copy.registerFailed);",
        'onSubmit={controller.onSubmit}',
        "value={controller.username}",
        "controller.onUsernameChange(event.target.value)",
        "value={controller.email}",
        "controller.onEmailChange(event.target.value)",
        "value={controller.displayName}",
        "controller.onDisplayNameChange(event.target.value)",
        "value={controller.password}",
        "controller.onPasswordChange(event.target.value)",
        "controller.error",
        "controller.loading",
      ]) {
    if (!source.includes(requiredControllerUsage)) {
      throw new Error(`${relativePath} must delegate auth controller wiring: ${requiredControllerUsage}`);
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

  for (const forbiddenControllerToken of [
    'from "../lib/api";',
    'from "../lib/auth";',
    'from "../lib/error-message";',
    'import { FormEvent',
    "useState(",
    "useEffect(",
    "const handleSubmit = async",
  ]) {
    if (source.includes(forbiddenControllerToken)) {
      throw new Error(`${relativePath} must keep auth submission logic delegated: ${forbiddenControllerToken}`);
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

for (const requiredLoginFormControllerTypesToken of [
  'import type { FormEventHandler } from "react"; export type LoginFormRouter = { push: (href: string) => void; replace: (href: string) => void }; export type LoginFormControllerResult = { account: string; error: string; loading: boolean; onAccountChange: (value: string) => void; onPasswordChange: (value: string) => void; onSubmit: FormEventHandler<HTMLFormElement>; password: string };',
]) {
  if (!loginFormControllerTypesSource.includes(requiredLoginFormControllerTypesToken)) {
    throw new Error(`components/login-form-controller.types.ts must own login controller contracts: ${requiredLoginFormControllerTypesToken}`);
  }
}

if (loginFormControllerTypesLines > 2) {
  throw new Error(`components/login-form-controller.types.ts exceeded 2 lines: ${loginFormControllerTypesLines}`);
}

for (const requiredRegisterFormControllerTypesToken of [
  'import type { FormEventHandler } from "react"; export type RegisterFormRouter = { push: (href: string) => void }; export type RegisterFormControllerResult = { email: string; error: string; loading: boolean; onDisplayNameChange: (value: string) => void; onEmailChange: (value: string) => void; onPasswordChange: (value: string) => void; onSubmit: FormEventHandler<HTMLFormElement>; onUsernameChange: (value: string) => void; password: string; displayName: string; username: string };',
]) {
  if (!registerFormControllerTypesSource.includes(requiredRegisterFormControllerTypesToken)) {
    throw new Error(`components/register-form-controller.types.ts must own register controller contracts: ${requiredRegisterFormControllerTypesToken}`);
  }
}

if (registerFormControllerTypesLines > 2) {
  throw new Error(`components/register-form-controller.types.ts exceeded 2 lines: ${registerFormControllerTypesLines}`);
}

for (const requiredUseLoginFormControllerToken of [
  'import { useEffect, useState } from "react";',
  'import { login } from "../lib/api";',
  'import { getStoredToken, setStoredSession } from "../lib/auth";',
  'import { resolveErrorMessage } from "../lib/error-message";',
  'from "./login-form-controller.types";',
  "export function useLoginFormController(",
  'router.replace("/app");',
  "const result = await login({ account, password });",
  'router.push("/app");',
]) {
  if (!useLoginFormControllerSource.includes(requiredUseLoginFormControllerToken)) {
    throw new Error(`components/use-login-form-controller.ts must own login submission orchestration: ${requiredUseLoginFormControllerToken}`);
  }
}

for (const forbiddenUseLoginFormControllerToken of [
  'import { useRouter } from "next/navigation";',
  'from "./auth-form-copy";',
  "<AuthFormFrame",
  'className="field"',
]) {
  if (useLoginFormControllerSource.includes(forbiddenUseLoginFormControllerToken)) {
    throw new Error(`components/use-login-form-controller.ts must keep login rendering delegated: ${forbiddenUseLoginFormControllerToken}`);
  }
}

if (useLoginFormControllerLines > 55) {
  throw new Error(`components/use-login-form-controller.ts exceeded 55 lines: ${useLoginFormControllerLines}`);
}

for (const requiredUseRegisterFormControllerToken of [
  'import { useState } from "react";',
  'import { login, register } from "../lib/api";',
  'import { setStoredSession } from "../lib/auth";',
  'import { resolveErrorMessage } from "../lib/error-message";',
  'from "./register-form-controller.types";',
  "export function useRegisterFormController(",
  "await register({",
  "const session = await login({",
  'router.push("/app");',
]) {
  if (!useRegisterFormControllerSource.includes(requiredUseRegisterFormControllerToken)) {
    throw new Error(`components/use-register-form-controller.ts must own register submission orchestration: ${requiredUseRegisterFormControllerToken}`);
  }
}

for (const forbiddenUseRegisterFormControllerToken of [
  'import { useRouter } from "next/navigation";',
  'from "./auth-form-copy";',
  "<AuthFormFrame",
  'className="field"',
]) {
  if (useRegisterFormControllerSource.includes(forbiddenUseRegisterFormControllerToken)) {
    throw new Error(`components/use-register-form-controller.ts must keep register rendering delegated: ${forbiddenUseRegisterFormControllerToken}`);
  }
}

if (useRegisterFormControllerLines > 65) {
  throw new Error(`components/use-register-form-controller.ts exceeded 65 lines: ${useRegisterFormControllerLines}`);
}

console.log("auth-form structure verification passed");
