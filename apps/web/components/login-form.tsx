"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { login } from "../lib/api";
import { getStoredToken, setStoredSession } from "../lib/auth";
import { useStoredLocale } from "../lib/locale";
import { getLoginFormCopy } from "./auth-form-copy";
import { AuthFormFrame } from "./auth-form-frame";

export function LoginForm() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getLoginFormCopy(locale);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getStoredToken()) {
      router.replace("/app");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login({ account, password });
      setStoredSession(result.access_token, result.user);
      router.push("/app");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormFrame
      alternateHref="/register"
      alternateLabel={copy.register}
      eyebrow={copy.eyebrow}
      locale={locale}
      onLocaleChange={setLocale}
      title={copy.title}
    >
      <form className="form-stack" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field-label">{copy.account}</span>
          <input
            className="input"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            placeholder={copy.accountPlaceholder}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.password}</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
