"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { login, register } from "../lib/api";
import { setStoredSession } from "../lib/auth";
import { useStoredLocale, type LocaleCode } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";

const COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    signIn: string;
    username: string;
    email: string;
    displayName: string;
    password: string;
    usernamePlaceholder: string;
    emailPlaceholder: string;
    displayNamePlaceholder: string;
    passwordPlaceholder: string;
    loading: string;
    submit: string;
  }
> = {
  "zh-CN": {
    eyebrow: "访问",
    title: "创建账号",
    signIn: "登录",
    username: "用户名",
    email: "邮箱",
    displayName: "显示名称",
    password: "密码",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "请使用更长的密码",
    loading: "创建中...",
    submit: "创建账号",
  },
  en: {
    eyebrow: "Access",
    title: "Create Account",
    signIn: "Sign In",
    username: "Username",
    email: "Email",
    displayName: "Display name",
    password: "Password",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "Use a long password",
    loading: "Creating...",
    submit: "Create Account",
  },
  ja: {
    eyebrow: "アクセス",
    title: "アカウント作成",
    signIn: "ログイン",
    username: "ユーザー名",
    email: "メール",
    displayName: "表示名",
    password: "パスワード",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "長めのパスワードを使用してください",
    loading: "作成中...",
    submit: "アカウント作成",
  },
};

const DISPLAY_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    signIn: string;
    username: string;
    email: string;
    displayName: string;
    password: string;
    usernamePlaceholder: string;
    emailPlaceholder: string;
    displayNamePlaceholder: string;
    passwordPlaceholder: string;
    loading: string;
    submit: string;
  }
> = {
  "zh-CN": {
    eyebrow: "访问",
    title: "创建账号",
    signIn: "登录",
    username: "用户名",
    email: "邮箱",
    displayName: "显示名称",
    password: "密码",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "请使用更长的密码",
    loading: "创建中...",
    submit: "创建账号",
  },
  en: {
    eyebrow: "Access",
    title: "Create Account",
    signIn: "Sign In",
    username: "Username",
    email: "Email",
    displayName: "Display name",
    password: "Password",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "Use a long password",
    loading: "Creating...",
    submit: "Create Account",
  },
  ja: {
    eyebrow: "アクセス",
    title: "アカウント作成",
    signIn: "ログイン",
    username: "ユーザー名",
    email: "メール",
    displayName: "表示名",
    password: "パスワード",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "長めのパスワードを使用してください",
    loading: "作成中...",
    submit: "アカウント作成",
  },
};

export function RegisterForm() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = { ...COPY[locale], ...DISPLAY_COPY[locale] };
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
      setError(caught instanceof Error ? caught.message : "Register failed");
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
            <Link className="button secondary" href="/login">
              {copy.signIn}
            </Link>
          </div>
        </div>
        <div className="panel-body">
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
        </div>
      </section>
    </main>
  );
}
