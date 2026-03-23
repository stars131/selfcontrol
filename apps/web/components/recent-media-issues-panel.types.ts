"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaIssueCopy } from "../lib/record-panel-ui";
import type {
  MediaProcessingIssue,
  MediaProcessingOverview,
} from "../lib/types";

export type RecentMediaIssuesPanelProps = {
  locale: LocaleCode;
  canWriteWorkspace: boolean;
  workspaceId: string;
  mediaIssueCopy: MediaIssueCopy;
  mediaProcessingOverview: MediaProcessingOverview;
  retryingMediaId: string | null;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
};

export type RecentMediaIssueCardProps = Pick<
  RecentMediaIssuesPanelProps,
  | "locale"
  | "canWriteWorkspace"
  | "workspaceId"
  | "mediaIssueCopy"
  | "retryingMediaId"
  | "formatHistoryTimestampLabel"
  | "onRetryMediaProcessing"
> & {
  issue: MediaProcessingIssue;
};
