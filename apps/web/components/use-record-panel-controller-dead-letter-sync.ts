"use client";
import { useEffect } from "react";
import type { UseRecordPanelControllerDeadLetterSyncInput } from "./use-record-panel-controller-dead-letter-sync.types";
export function useRecordPanelControllerDeadLetterSync({ actionableDeadLetterIds, setSelectedDeadLetterIds }: UseRecordPanelControllerDeadLetterSyncInput) {
  useEffect(() => {
    setSelectedDeadLetterIds((current) => current.filter((item) => actionableDeadLetterIds.has(item)));
  }, [actionableDeadLetterIds, setSelectedDeadLetterIds]);
}
