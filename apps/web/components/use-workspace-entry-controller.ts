"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";

import type {
  SharePreview,
  User,
  Workspace,
  WorkspaceTransferJob,
} from "../lib/types";
import { createWorkspaceEntryControllerActions } from "./workspace-entry-controller-actions";
import {
  extractWorkspaceShareToken,
  slugifyWorkspaceName,
} from "./workspace-entry-controller-helpers";
import type {
  RouterLike,
  WorkspaceEntryControllerState,
} from "./workspace-entry-controller.types";
import { useWorkspaceEntryLoad } from "./use-workspace-entry-load";

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

  const suggestedSlug = useMemo(() => slugifyWorkspaceName(name), [name]);
  const normalizedShareToken = useMemo(
    () => extractWorkspaceShareToken(shareTokenInput),
    [shareTokenInput],
  );

  const state: WorkspaceEntryControllerState = {
    fileInputRef,
    token,
    setToken,
    user,
    setUser,
    workspaces,
    setWorkspaces,
    name,
    setName,
    shareTokenInput,
    setShareTokenInput,
    importName,
    setImportName,
    importSlug,
    setImportSlug,
    importFile,
    setImportFile,
    transferJobs,
    setTransferJobs,
    sharePreview,
    setSharePreview,
    loading,
    setLoading,
    error,
    setError,
    creating,
    setCreating,
    importing,
    setImporting,
    queueingImportJob,
    setQueueingImportJob,
    joining,
    setJoining,
    previewing,
    setPreviewing,
    jobsLoading,
    setJobsLoading,
  };

  const actions = createWorkspaceEntryControllerActions({ router, state });
  useWorkspaceEntryLoad({
    loadTransferJobs: actions.loadTransferJobs,
    router,
    setError,
    setLoading,
    setToken,
    setUser,
    setWorkspaces,
  });

  return {
    ...state,
    suggestedSlug,
    normalizedShareToken,
    handleCreate: (event: FormEvent<HTMLFormElement>) =>
      actions.handleCreate(event, suggestedSlug, setName),
    handleImportWorkspace: actions.handleImportWorkspace,
    handleQueueImportJob: actions.handleQueueImportJob,
    handlePreviewShare: () => actions.handlePreviewShare(shareTokenInput),
    handleAcceptShare: () => actions.handleAcceptShare(shareTokenInput),
    handleLogout: actions.handleLogout,
    handleDownloadTransferJob: actions.handleDownloadTransferJob,
    loadTransferJobs: actions.loadTransferJobs,
  };
}
