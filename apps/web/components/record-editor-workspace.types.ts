import type { Dispatch, FormEventHandler, SetStateAction } from "react";

import type { LocaleCode } from "../lib/locale";
import type { LocationReviewFormState, RecordFormState, ReminderFormState } from "../lib/record-panel-forms";
import type { MediaIssueCopy, PanelCopy } from "../lib/record-panel-ui";
import type {
  LocationHistoryEntry,
  LocationReview,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  RecordItem,
  ReminderItem,
} from "../lib/types";

export type RecordEditorWorkspaceProps = {
  authToken: string | null;
  canWriteWorkspace: boolean;
  workspaceId: string;
  locale: LocaleCode;
  selectedRecord: RecordItem | null;
  form: RecordFormState;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  locationReviewForm: LocationReviewFormState;
  setLocationReviewForm: Dispatch<SetStateAction<LocationReviewFormState>>;
  reminderForm: ReminderFormState;
  setReminderForm: Dispatch<SetStateAction<ReminderFormState>>;
  panelCopy: PanelCopy;
  channelInAppLabel: string;
  channelLabel: string;
  createReminderLabel: string;
  deleteReminderLabel: string;
  enableReminderLabel: string;
  largestFilePrefixLabel: string;
  markReminderDoneLabel: string;
  noMediaLabel: string;
  noRemindersLabel: string;
  pauseReminderLabel: string;
  reminderNoteLabel: string;
  reminderNotePlaceholder: string;
  reminderSectionDescription: string;
  reminderSectionTitle: string;
  reminderTitleLabel: string;
  reminderTitlePlaceholder: string;
  remindAtLabel: string;
  savingReminderLabel: string;
  untitledReminderLabel: string;
  error: string;
  saving: boolean;
  deleting: boolean;
  uploading: boolean;
  savingReminder: boolean;
  bulkRetryingDeadLetter: boolean;
  downloadingMediaId: string | null;
  refreshingMediaId: string | null;
  retryingMediaId: string | null;
  deletingMediaId: string | null;
  selectedDeadLetterIds: string[];
  selectedRecordMediaSizeLabel: string;
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  mediaIssueCopy: MediaIssueCopy;
  mediaProcessingOverview: MediaProcessingOverview | null;
  mediaStorageSummary: MediaStorageSummary | null;
  reminders: ReminderItem[];
  selectedLocationHistory: LocationHistoryEntry[];
  selectedLocationReview: LocationReview | null;
  formatFileCountLabel: (count: number) => string;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  formatReminderEnabledLabel: (value: boolean) => string;
  formatReminderStatusLabel: (value: string) => string;
  formatReminderTimestampLabel: (value: string) => string;
  formatReviewStatusLabel: (value?: string | null) => string;
  summarizeHistoryActionLabel: (entry: LocationHistoryEntry) => string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDelete: () => void;
  onUpload: React.ChangeEventHandler<HTMLInputElement>;
  onCreateReminder: () => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onUpdateReminder: (
    reminderId: string,
    input: Partial<{
      title: string | null;
      message: string | null;
      remind_at: string | null;
      status: string;
      is_enabled: boolean;
    }>,
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
