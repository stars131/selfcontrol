import type {
  Workspace,
  WorkspaceImportResult,
  WorkspaceMemberItem,
  WorkspaceTransferJob,
} from "./types";
import { request, requestDownload } from "./api-core";

function appendOptionalTrimmedField(formData: FormData, name: string, value?: string) {
  if (value?.trim()) {
    formData.append(name, value.trim());
  }
}

export async function listWorkspaces(token: string) {
  return request<{ items: Workspace[] }>("/workspaces", { method: "GET" }, token);
}

export async function getWorkspace(token: string, workspaceId: string) {
  return request<{ workspace: Workspace }>(`/workspaces/${workspaceId}`, { method: "GET" }, token);
}

export async function downloadWorkspaceExport(token: string, workspaceId: string) {
  return requestDownload(`/workspaces/${workspaceId}/export`, token);
}

export async function createWorkspace(
  token: string,
  input: { name: string; slug: string; visibility?: string },
) {
  return request<{ workspace: Workspace }>(
    "/workspaces",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function importWorkspaceArchive(
  token: string,
  input: {
    file: File;
    name?: string;
    slug?: string;
  },
) {
  const formData = new FormData();
  formData.append("file", input.file);
  appendOptionalTrimmedField(formData, "name", input.name);
  appendOptionalTrimmedField(formData, "slug", input.slug);
  return request<{ result: WorkspaceImportResult }>(
    "/workspaces/import",
    {
      method: "POST",
      body: formData,
    },
    token,
  );
}

export async function createWorkspaceImportJob(
  token: string,
  input: {
    file: File;
    name?: string;
    slug?: string;
  },
) {
  const formData = new FormData();
  formData.append("file", input.file);
  appendOptionalTrimmedField(formData, "name", input.name);
  appendOptionalTrimmedField(formData, "slug", input.slug);
  return request<{ job: WorkspaceTransferJob; dispatch_mode: string }>(
    "/workspaces/import-jobs",
    {
      method: "POST",
      body: formData,
    },
    token,
  );
}

export async function createWorkspaceExportJob(token: string, workspaceId: string) {
  return request<{ job: WorkspaceTransferJob; dispatch_mode: string }>(
    `/workspaces/${workspaceId}/export-jobs`,
    {
      method: "POST",
    },
    token,
  );
}

export async function listWorkspaceTransferJobs(token: string) {
  return request<{ items: WorkspaceTransferJob[] }>(
    "/workspaces/jobs/transfer",
    { method: "GET" },
    token,
  );
}

export async function getWorkspaceTransferJob(token: string, jobId: string) {
  return request<{ job: WorkspaceTransferJob }>(
    `/workspaces/jobs/transfer/${jobId}`,
    { method: "GET" },
    token,
  );
}

export async function downloadWorkspaceTransferJob(token: string, jobId: string) {
  return requestDownload(`/workspaces/jobs/transfer/${jobId}/download`, token);
}

export async function listWorkspaceMembers(token: string, workspaceId: string) {
  return request<{ items: WorkspaceMemberItem[] }>(
    `/workspaces/${workspaceId}/members`,
    { method: "GET" },
    token,
  );
}

export async function updateWorkspaceMember(
  token: string,
  workspaceId: string,
  memberId: string,
  input: { role: "viewer" | "editor" },
) {
  return request<{ member: WorkspaceMemberItem }>(
    `/workspaces/${workspaceId}/members/${memberId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function deleteWorkspaceMember(token: string, workspaceId: string, memberId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/members/${memberId}`,
    { method: "DELETE" },
    token,
  );
}
