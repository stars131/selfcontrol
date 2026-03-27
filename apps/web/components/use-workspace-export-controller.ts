"use client";

import { useState } from "react";

import { downloadWorkspaceExport } from "../lib/api";
import { resolveErrorMessage } from "../lib/error-message";
import type { UseWorkspaceExportControllerProps } from "./use-workspace-export-controller.types";

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
}

export function useWorkspaceExportController({
  token,
  workspaceId,
  workspaceSlug,
  successMessage,
  failedMessage,
}: UseWorkspaceExportControllerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await downloadWorkspaceExport(token, workspaceId);
      const objectUrl = window.URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = result.filename ?? `${workspaceSlug || workspaceId}-export.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
      setSuccess(successMessage);
    } catch (caught) {
      setError(getActionErrorMessage(caught, failedMessage));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleDownload,
  };
}
