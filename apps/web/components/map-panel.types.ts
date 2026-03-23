import type { LocationDraft } from "../lib/map-panel";
import type { LocationFilterState, RecordItem } from "../lib/types";

export type MapPanelProps = {
  records: RecordItem[];
  selectedRecordId: string | null;
  onSelectRecord: (recordId: string | null) => void;
  locationFilter: LocationFilterState;
  filteringRecords: boolean;
  onApplyLocationFilter: (nextFilter: LocationFilterState) => Promise<void>;
  draftLocation?: LocationDraft | null;
  onDraftLocationChange?: (next: LocationDraft) => void;
};
