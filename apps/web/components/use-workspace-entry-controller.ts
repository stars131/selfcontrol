"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import {
  acceptShareToken,
  createWorkspace,
  createWorkspaceImportJob,
  downloadWorkspaceTransferJob,
  getCurrentUser,
  importWorkspaceArchive,
  listWorkspaceTransferJobs,
  listWorkspaces,
  previewShareToken,
} from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import type { SharePreview, User, Workspace, WorkspaceTransferJob } from "../lib/types";

type RouterLike = {
  push: (href: string) => void;
  replace: (href: string) => void;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractShareToken(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.includes("/share/")) {
    return trimmed.split("/share/").pop()?.split(/[?#]/)[0] ?? "";
  }
  return trimmed.replace(/^\/+/, "").replace(/^share\//, "");
}

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function useWorkspaceEntryController(router: RouterLike) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [name, setName] = useState("");
  const [shareTokenInput, setShareTokenInput] = useState("");
  const [importName, setImportName] = useState("");
  const [importSlug, setImportSlug] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [transferJobs, setTransferJobs] = useState<WorkspaceTransferJob[]>([]);
  const [sharePreview, setSharePreview] = useState<SharePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [importing, setImporting] = useState(false);
  const [queueingImportJob, setQueueingImportJob] = useState(false);
  const [joining, setJoining] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);

  const suggestedSlug = useMemo(() => slugify(name), [name]);
  const normalizedShareToken = useMemo(() => extractShareToken(shareTokenInput), [shareTokenInput]);

  const loadTransferJobs = async (activeToken: string) => {
    setJobsLoading(true);
    try {
      const result = await listWorkspaceTransferJobs(activeToken);
      setTransferJobs(result.items);
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    const nextToken = getStoredToken();
    if (!nextToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(nextToken);
        const [me, workspaceResult] = await Promise.all([getCurrentUser(nextToken), listWorkspaces(nextToken)]);
        setUser(me.user);
        setWorkspaces(workspaceResult.items);
        await loadTransferJobs(nextToken);
      } catch (caught) {
        clearStoredSession();
        setError(getActionErrorMessage(caught, "Failed to load workspace list"));
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router]);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !name.trim()) {
      return;
    }

    setCreating(true);
    setError("");
    try {
      const result = await createWorkspace(token, {
        name: name.trim(),
        slug: suggestedSlug || `workspace-${Date.now()}`,
      });
      setWorkspaces((current) => [result.workspace, ...current]);
      setName("");
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to create workspace"));
    } finally {
      setCreating(false);
    }
  };

  const resetImportForm = () => {
    setImportName("");
    setImportSlug("");
    setImportFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImportWorkspace = async () => {
    if (!token || !importFile) {
      return;
    }

    setImporting(true);
    setError("");
    try {
      const result = await importWorkspaceArchive(token, {
        file: importFile,
        name: importName.trim() || undefined,
        slug: slugify(importSlug) || undefined,
      });
      const workspaceResult = await listWorkspaces(token);
      setWorkspaces(workspaceResult.items);
      await loadTransferJobs(token);
      resetImportForm();
      router.push(`/app/workspaces/${result.result.workspace.id}`);
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to import workspace"));
    } finally {
      setImporting(false);
    }
  };

  const handleQueueImportJob = async () => {
    if (!token || !importFile) {
      return;
    }

    setQueueingImportJob(true);
    setError("");
    try {
      await createWorkspaceImportJob(token, {
        file: importFile,
        name: importName.trim() || undefined,
        slug: slugify(importSlug) || undefined,
      });
      await loadTransferJobs(token);
      resetImportForm();
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to create import job"));
    } finally {
      setQueueingImportJob(false);
    }
  };

  const handlePreviewShare = async () => {
    if (!normalizedShareToken) {
      return;
    }

    setPreviewing(true);
    setError("");
    try {
      const result = await previewShareToken(normalizedShareToken);
      setSharePreview(result.preview);
    } catch (caught) {
      setSharePreview(null);
      setError(getActionErrorMessage(caught, "Failed to preview share link"));
    } finally {
      setPreviewing(false);
    }
  };

  const handleAcceptShare = async () => {
    if (!token || !normalizedShareToken) {
      return;
    }

    setJoining(true);
    setError("");
    try {
      const result = await acceptShareToken(token, normalizedShareToken);
      const workspaceResult = await listWorkspaces(token);
      setWorkspaces(workspaceResult.items);
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to join shared workspace"));
    } finally {
      setJoining(false);
    }
  };

  const handleLogout = () => {
    clearStoredSession();
    router.replace("/login");
  };

  const handleDownloadTransferJob = async (jobId: string) => {
    if (!token) {
      return;
    }

    setError("");
    try {
      const result = await downloadWorkspaceTransferJob(token, jobId);
      const objectUrl = window.URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = result.filename ?? `workspace-transfer-${jobId}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to download transfer job result"));
    }
  };

  return {
    fileInputRef,
    token,
    user,
    workspaces,
    name,
    shareTokenInput,
    importName,
    importSlug,
    importFile,
    transferJobs,
    sharePreview,
    loading,
    error,
    creating,
    importing,
    queueingImportJob,
    joining,
    previewing,
    jobsLoading,
    suggestedSlug,
    normalizedShareToken,
    setName,
    setShareTokenInput,
    setImportName,
    setImportSlug,
    setImportFile,
    handleCreate,
    handleImportWorkspace,
    handleQueueImportJob,
    handlePreviewShare,
    handleAcceptShare,
    handleLogout,
    handleDownloadTransferJob,
    loadTransferJobs,
  };
}
