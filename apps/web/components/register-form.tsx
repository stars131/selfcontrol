"use client";

import { useRouter } from "next/navigation";

import { useStoredLocale } from "../lib/locale";
import { getRegisterFormCopy } from "./auth-form-copy";
import { AuthFormFrame } from "./auth-form-frame";
import { useRegisterFormController } from "./use-register-form-controller";

export function RegisterForm() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getRegisterFormCopy(locale);
  const controller = useRegisterFormController(router, copy.registerFailed);

  return (
    <AuthFormFrame
      alternateHref="/login"
      alternateLabel={copy.signIn}
      eyebrow={copy.eyebrow}
      locale={locale}
      onLocaleChange={setLocale}
      title={copy.title}
    >
      <form className="form-stack" onSubmit={controller.onSubmit}>
        <label className="field">
          <span className="field-label">{copy.username}</span>
          <input
            className="input"
            name="username"
            autoComplete="username"
            required
            value={controller.username}
            onChange={(event) => controller.onUsernameChange(event.target.value)}
            placeholder={copy.usernamePlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.email}</span>
          <input
            className="input"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={controller.email}
            onChange={(event) => controller.onEmailChange(event.target.value)}
            placeholder={copy.emailPlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.displayName}</span>
          <input
            className="input"
            name="displayName"
            autoComplete="name"
            value={controller.displayName}
            onChange={(event) => controller.onDisplayNameChange(event.target.value)}
            placeholder={copy.displayNamePlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.password}</span>
          <input
            className="input"
            name="password"
            type="password"
            autoComplete="new-password"
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
