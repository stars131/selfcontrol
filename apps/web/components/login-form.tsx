"use client";

import { useRouter } from "next/navigation";

import { useStoredLocale } from "../lib/locale";
import { getLoginFormCopy } from "./auth-form-copy";
import { AuthFormFrame } from "./auth-form-frame";
import { useLoginFormController } from "./use-login-form-controller";

export function LoginForm() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getLoginFormCopy(locale);
  const controller = useLoginFormController(router, copy.loginFailed);

  return (
    <AuthFormFrame
      alternateHref="/register"
      alternateLabel={copy.register}
      eyebrow={copy.eyebrow}
      locale={locale}
      onLocaleChange={setLocale}
      title={copy.title}
    >
      <form className="form-stack" onSubmit={controller.onSubmit}>
        <label className="field">
          <span className="field-label">{copy.account}</span>
          <input
            className="input"
            name="username"
            autoComplete="username"
            required
            value={controller.account}
            onChange={(event) => controller.onAccountChange(event.target.value)}
            placeholder={copy.accountPlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.password}</span>
          <input
            className="input"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={controller.password}
            onChange={(event) => controller.onPasswordChange(event.target.value)}
            placeholder={copy.passwordPlaceholder}
          />
        </label>
        {controller.error ? <div className="notice error">{controller.error}</div> : null}
        <button className="button" type="submit" disabled={controller.loading}>
          {controller.loading ? copy.loading : copy.submit}
        </button>
      </form>
    </AuthFormFrame>
  );
}
