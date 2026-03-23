"use client";

import type { PanelCopy } from "../lib/record-panel-ui";
import type { LocationHistoryEntry, LocationReview } from "../lib/types";

export type LocationReviewPanelProps = {
  panelCopy: PanelCopy;
  canWriteWorkspace: boolean;
  hasSelectedRecord: boolean;
  reviewForm: {
    status: string;
    note: string;
  };
  selectedLocationReview: LocationReview | null;
  selectedLocationHistory: LocationHistoryEntry[];
  formatReviewStatusLabel: (value?: string | null) => string;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  summarizeHistoryActionLabel: (entry: LocationHistoryEntry) => string;
  onStatusChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onMarkConfirmed: () => void;
  onMarkNeedsReview: () => void;
  onResetReview: () => void;
};
