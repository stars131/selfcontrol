"use client";

import { useRef, useState } from "react";

import type {
  SharePreview,
  User,
  Workspace,
  WorkspaceTransferJob,
} from "../lib/types";
import type { WorkspaceEntryControllerState } from "./workspace-entry-controller.types";

export function useWorkspaceEntryControllerState(): WorkspaceEntryControllerState {
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

  return {
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
}
