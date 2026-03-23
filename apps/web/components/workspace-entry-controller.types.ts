"use client";

import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import type { SharePreview, User, Workspace, WorkspaceTransferJob } from "../lib/types";

type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type RouterLike = {
  push: (href: string) => void;
  replace: (href: string) => void;
};

export type WorkspaceEntryControllerState = {
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  token: string | null;
  setToken: StateSetter<string | null>;
  user: User | null;
  setUser: StateSetter<User | null>;
  workspaces: Workspace[];
  setWorkspaces: StateSetter<Workspace[]>;
  name: string;
  setName: StateSetter<string>;
  shareTokenInput: string;
  setShareTokenInput: StateSetter<string>;
  importName: string;
  setImportName: StateSetter<string>;
  importSlug: string;
  setImportSlug: StateSetter<string>;
  importFile: File | null;
  setImportFile: StateSetter<File | null>;
  transferJobs: WorkspaceTransferJob[];
  setTransferJobs: StateSetter<WorkspaceTransferJob[]>;
  sharePreview: SharePreview | null;
  setSharePreview: StateSetter<SharePreview | null>;
  loading: boolean;
  setLoading: StateSetter<boolean>;
  error: string;
  setError: StateSetter<string>;
  creating: boolean;
  setCreating: StateSetter<boolean>;
  importing: boolean;
  setImporting: StateSetter<boolean>;
  queueingImportJob: boolean;
  setQueueingImportJob: StateSetter<boolean>;
  joining: boolean;
  setJoining: StateSetter<boolean>;
  previewing: boolean;
  setPreviewing: StateSetter<boolean>;
  jobsLoading: boolean;
  setJobsLoading: StateSetter<boolean>;
};
