"use client";

import type { MediaDeadLetterOverview } from "../lib/types";
import {
  getRecordPanelSelectableDeadLetterIds,
  toggleRecordPanelDeadLetterSelection,
} from "./record-panel-controller-dead-letter-helpers";

export function createRecordPanelControllerDeadLetterSelectionActions({
  mediaDeadLetterOverview,
  setSelectedDeadLetterIds,
}: {
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  function handleToggleDeadLetterSelection(mediaId: string, checked: boolean) {
    setSelectedDeadLetterIds((current) =>
      toggleRecordPanelDeadLetterSelection(current, mediaId, checked),
    );
  }

  function handleSelectAllDeadLetter() {
    setSelectedDeadLetterIds(getRecordPanelSelectableDeadLetterIds(mediaDeadLetterOverview));
  }

  function handleClearDeadLetterSelection() {
    setSelectedDeadLetterIds([]);
  }

  return {
    handleToggleDeadLetterSelection,
    handleSelectAllDeadLetter,
    handleClearDeadLetterSelection,
  };
}
