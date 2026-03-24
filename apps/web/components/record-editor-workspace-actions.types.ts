import type { ChangeEventHandler, FormEventHandler } from "react";

import type { MediaAsset } from "../lib/types";

export type RecordEditorWorkspaceReminderUpdateInput = Partial<{
  title: string | null;
  message: string | null;
  remind_at: string | null;
  status: string;
  is_enabled: boolean;
}>;

export type RecordEditorWorkspaceActionProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDelete: () => void;
  onUpload: ChangeEventHandler<HTMLInputElement>;
  onCreateReminder: () => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onUpdateReminder: (
    reminderId: string,
    input: RecordEditorWorkspaceReminderUpdateInput,
  ) => Promise<void>;
  onBulkRetryAllDeadLetter: () => Promise<void>;
  onBulkRetrySelectedDeadLetter: () => Promise<void>;
  onClearDeadLetterSelection: () => void;
  onDeleteMediaAsset: (mediaId: string) => Promise<void>;
  onDownloadMedia: (asset: MediaAsset) => Promise<void>;
  onRefreshMedia: (mediaId: string) => Promise<void>;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
  onSelectAllDeadLetter: () => void;
  onToggleDeadLetterSelection: (mediaId: string, checked: boolean) => void;
};
