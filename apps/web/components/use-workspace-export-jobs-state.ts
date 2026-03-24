"use client";

import { useState } from "react";

import type { WorkspaceTransferJob } from "../lib/types";

export function useWorkspaceExportJobsState() {
  const [jobs, setJobs] = useState<WorkspaceTransferJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  return {
    jobs,
    setJobs,
    loading,
    setLoading,
    actionLoading,
    setActionLoading,
    error,
    setError,
    message,
    setMessage,
  };
}
