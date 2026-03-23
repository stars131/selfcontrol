"use client";

import type { MediaAsset, RecordItem } from "../lib/types";

export type RecordPanelFormState = {
  title: string;
  content: string;
  type_code: string;
  rating: string;
  is_avoid: boolean;
};

export type RecordPanelProps = {
  workspaceId: string;
  records: RecordItem[];
  selectedRecordId: string | null;
  mediaAssets: MediaAsset[];
  onSelectRecord: (recordId: string) => void;
  onSaveRecord: (input: {
    recordId?: string;
    title?: string;
    content: string;
    type_code: string;
    rating?: number | null;
    is_avoid: boolean;
  }) => Promise<void>;
  onDeleteRecord: (recordId: string) => Promise<void>;
  onUploadMedia: (recordId: string, file: File) => Promise<void>;
  onResetFilter: () => Promise<void>;
};
