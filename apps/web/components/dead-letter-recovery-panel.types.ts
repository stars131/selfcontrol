"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaIssueCopy } from "../lib/record-panel-ui";
import type { MediaDeadLetterOverview, MediaProcessingIssue } from "../lib/types";

export type DeadLetterRecoveryPanelProps = {
  locale: LocaleCode;
  canWriteWorkspace: boolean;
  workspaceId: string;
  mediaIssueCopy: MediaIssueCopy;
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  selectedDeadLetterIds: string[];
  bulkRetryingDeadLetter: boolean;
  retryingMediaId: string | null;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkRetrySelected: () => Promise<void>;
  onBulkRetryAll: () => Promise<void>;
  onToggleSelection: (mediaId: string, checked: boolean) => void;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
};

export type DeadLetterRecoveryItemCardProps = {
  item: MediaProcessingIssue;
  locale: LocaleCode;
  canWriteWorkspace: boolean;
  workspaceId: string;
  mediaIssueCopy: MediaIssueCopy;
  selectedDeadLetterIds: string[];
  bulkRetryingDeadLetter: boolean;
  retryingMediaId: string | null;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onToggleSelection: (mediaId: string, checked: boolean) => void;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
};
