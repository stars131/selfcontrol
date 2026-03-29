"use client";

import { useState } from "react";
import { login, register } from "../lib/api";
import { setStoredSession } from "../lib/auth";
import { resolveErrorMessage } from "../lib/error-message";
import type {
  RegisterFormControllerResult,
  RegisterFormRouter,
} from "./register-form-controller.types";

export function useRegisterFormController(
  router: RegisterFormRouter,
  registerFailedLabel: string,
): RegisterFormControllerResult {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: RegisterFormControllerResult["onSubmit"] = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register({
        username,
        email: email || undefined,
        password,
        display_name: displayName || undefined,
      });
      const session = await login({
        account: username,
        password,
      });
      setStoredSession(session.access_token, session.user);
      router.push("/app");
    } catch (caught) {
      setError(resolveErrorMessage(caught, registerFailedLabel));
    } finally {
      setLoading(false);
    }
  };

  return {
    displayName,
    email,
    error,
    loading,
    onDisplayNameChange: setDisplayName,
    onEmailChange: setEmail,
    onPasswordChange: setPassword,
    onSubmit,
    onUsernameChange: setUsername,
    password,
    username,
  };
}
