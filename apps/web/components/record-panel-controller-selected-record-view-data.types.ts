import type { MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";

export type BuildRecordPanelSelectedRecordViewDataInput = { mediaAssets: MediaAsset[]; mediaDeadLetterOverview: MediaDeadLetterOverview | null; selectedRecord: RecordItem | null };
