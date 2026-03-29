"use client";

import { useEffect, useState } from "react";
import { acceptShareToken, previewShareToken } from "../lib/api";
import { getStoredToken } from "../lib/auth";
import { resolveErrorMessage } from "../lib/error-message";
import type { SharePreview } from "../lib/types";
import type {
  SharePreviewControllerResult,
  SharePreviewRouter,
} from "./share-preview-controller.types";

export function useSharePreviewController(
  router: SharePreviewRouter,
  tokenValue: string,
  loadFailedLabel: string,
  joinFailedLabel: string,
): SharePreviewControllerResult {
  const [preview, setPreview] = useState<SharePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await previewShareToken(tokenValue);
        setPreview(result.preview);
      } catch (caught) {
        setError(resolveErrorMessage(caught, loadFailedLabel));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [loadFailedLabel, tokenValue]);

  async function handleJoin() {
    const token = getStoredToken();
    if (!token) {
      router.push("/login");
      return;
    }
    setJoining(true);
    setError("");
    try {
      const result = await acceptShareToken(token, tokenValue);
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(resolveErrorMessage(caught, joinFailedLabel));
      setJoining(false);
    }
  }

  return {
    error,
    handleJoin,
    joining,
    loading,
    preview,
  };
}
