"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { login } from "../lib/api";
import { getStoredToken, setStoredSession } from "../lib/auth";
import { useStoredLocale, type LocaleCode } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";

const COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    register: string;
    account: string;
    password: string;
    accountPlaceholder: string;
    passwordPlaceholder: string;
    loading: string;
    submit: string;
  }
> = {
  "zh-CN": {
    eyebrow: "访问",
    title: "登录",
    register: "注册",
    account: "用户名或邮箱",
    password: "密码",
    accountPlaceholder: "demo 或 demo@example.com",
    passwordPlaceholder: "输入密码",
    loading: "登录中...",
    submit: "登录",
  },
  en: {
    eyebrow: "Access",
    title: "Sign In",
    register: "Register",
    account: "Username or email",
    password: "Password",
    accountPlaceholder: "demo or demo@example.com",
    passwordPlaceholder: "password",
    loading: "Signing in...",
    submit: "Sign In",
  },
  ja: {
    eyebrow: "アクセス",
    title: "ログイン",
    register: "登録",
    account: "ユーザー名またはメール",
    password: "パスワード",
    accountPlaceholder: "demo または demo@example.com",
    passwordPlaceholder: "パスワード",
    loading: "ログイン中...",
    submit: "ログイン",
  },
};

export function LoginForm() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = COPY[locale];
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
    <main className="page-shell">
      <section className="panel auth-panel">
        <div className="panel-header">
          <div>
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="title">{copy.title}</h1>
          </div>
          <div className="hero-actions">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <Link className="button secondary" href="/register">
              {copy.register}
            </Link>
          </div>
        </div>
        <div className="panel-body">
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
        </div>
      </section>
    </main>
  );
}
