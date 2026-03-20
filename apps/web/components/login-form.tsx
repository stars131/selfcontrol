"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { login } from "../lib/api";
import { getStoredToken, setStoredSession } from "../lib/auth";

export function LoginForm() {
  const router = useRouter();
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
            <div className="eyebrow">Access</div>
            <h1 className="title">Sign In</h1>
          </div>
          <Link className="button secondary" href="/register">
            Register
          </Link>
        </div>
        <div className="panel-body">
          <form className="form-stack" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field-label">Username or email</span>
              <input
                className="input"
                value={account}
                onChange={(event) => setAccount(event.target.value)}
                placeholder="demo or demo@example.com"
              />
            </label>
            <label className="field">
              <span className="field-label">Password</span>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
              />
            </label>
            {error ? <div className="notice error">{error}</div> : null}
            <button className="button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
