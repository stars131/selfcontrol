import type { MediaAsset, MediaDeadLetterOverview, MediaProcessingOverview, MediaStorageSummary, RecordFilterState, RecordItem, ReminderItem, SearchPresetItem, TimelineDay } from "../lib/types";

export type RecordPanelV2DataProps = {
  authToken: string | null; canWriteWorkspace: boolean; workspaceId: string; records: RecordItem[]; timelineDays: TimelineDay[]; selectedRecordId: string | null; mediaAssets: MediaAsset[]; mediaDeadLetterOverview: MediaDeadLetterOverview | null; mediaProcessingOverview: MediaProcessingOverview | null; mediaStorageSummary: MediaStorageSummary | null; reminders: ReminderItem[]; recordFilter: RecordFilterState; searchPresets: SearchPresetItem[]; savingSearchPreset: boolean; filteringRecords: boolean;
};
