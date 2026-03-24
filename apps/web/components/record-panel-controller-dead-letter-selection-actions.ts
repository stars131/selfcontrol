"use client";

import {
  getRecordPanelSelectableDeadLetterIds,
  toggleRecordPanelDeadLetterSelection,
} from "./record-panel-controller-dead-letter-helpers";
import type { RecordPanelControllerDeadLetterSelectionActionInput } from "./record-panel-controller-dead-letter-action-input.types";

export function createRecordPanelControllerDeadLetterSelectionActions({
  mediaDeadLetterOverview,
  setSelectedDeadLetterIds,
}: RecordPanelControllerDeadLetterSelectionActionInput) {
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
