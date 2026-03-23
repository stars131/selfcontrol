"use client";

import { useState } from "react";

import type { MediaRetentionReport } from "../lib/types";
import type {
  MediaRetentionActionResult,
  WorkspaceMediaRetentionControllerState,
} from "./workspace-media-retention-controller.types";

export function useWorkspaceMediaRetentionState(): WorkspaceMediaRetentionControllerState {
  const [olderThanDays, setOlderThanDays] = useState(90);
  const [report, setReport] = useState<MediaRetentionReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionResult, setActionResult] = useState<MediaRetentionActionResult | null>(null);

  return {
    olderThanDays,
    setOlderThanDays,
    report,
    setReport,
    loading,
    setLoading,
    error,
    setError,
    selectedMediaIds,
    setSelectedMediaIds,
    actionLoading,
    setActionLoading,
    actionError,
    setActionError,
    actionResult,
    setActionResult,
  };
}
