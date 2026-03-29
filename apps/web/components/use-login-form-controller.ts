"use client";

import { useEffect, useState } from "react";
import { login } from "../lib/api";
import { getStoredToken, setStoredSession } from "../lib/auth";
import { resolveErrorMessage } from "../lib/error-message";
import type {
  LoginFormControllerResult,
  LoginFormRouter,
} from "./login-form-controller.types";

export function useLoginFormController(
  router: LoginFormRouter,
  loginFailedLabel: string,
): LoginFormControllerResult {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getStoredToken()) {
      router.replace("/app");
    }
  }, [router]);

  const onSubmit: LoginFormControllerResult["onSubmit"] = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login({ account, password });
      setStoredSession(result.access_token, result.user);
      router.push("/app");
    } catch (caught) {
      setError(resolveErrorMessage(caught, loginFailedLabel));
    } finally {
      setLoading(false);
    }
  };

  return {
    account,
    error,
    loading,
    onAccountChange: setAccount,
    onPasswordChange: setPassword,
    onSubmit,
    password,
  };
}
