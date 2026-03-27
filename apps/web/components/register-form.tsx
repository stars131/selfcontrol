"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { login, register } from "../lib/api";
import { setStoredSession } from "../lib/auth";
import { resolveErrorMessage } from "../lib/error-message";
import { useStoredLocale } from "../lib/locale";
import { getRegisterFormCopy } from "./auth-form-copy";
import { AuthFormFrame } from "./auth-form-frame";

export function RegisterForm() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getRegisterFormCopy(locale);
  const [form, setForm] = useState({
    username: "",
    email: "",
    displayName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register({
        username: form.username,
        email: form.email || undefined,
        password: form.password,
        display_name: form.displayName || undefined,
      });
      const session = await login({
        account: form.username,
        password: form.password,
      });
      setStoredSession(session.access_token, session.user);
      router.push("/app");
    } catch (caught) {
      setError(resolveErrorMessage(caught, copy.registerFailed));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormFrame
      alternateHref="/login"
      alternateLabel={copy.signIn}
      eyebrow={copy.eyebrow}
      locale={locale}
      onLocaleChange={setLocale}
      title={copy.title}
    >
      <form className="form-stack" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field-label">{copy.username}</span>
          <input
            className="input"
            value={form.username}
            onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
            placeholder={copy.usernamePlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.email}</span>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder={copy.emailPlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.displayName}</span>
          <input
            className="input"
            value={form.displayName}
            onChange={(event) => setForm((prev) => ({ ...prev, displayName: event.target.value }))}
            placeholder={copy.displayNamePlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.password}</span>
          <input
            className="input"
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder={copy.passwordPlaceholder}
          />
        </label>
        {error ? <div className="notice error">{error}</div> : null}
        <button className="button" type="submit" disabled={loading}>
          {loading ? copy.loading : copy.submit}
        </button>
      </form>
    </AuthFormFrame>
  );
}
