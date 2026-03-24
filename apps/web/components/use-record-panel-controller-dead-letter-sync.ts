"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

export function useRecordPanelControllerDeadLetterSync({
  actionableDeadLetterIds,
  setSelectedDeadLetterIds,
}: {
  actionableDeadLetterIds: Set<string>;
  setSelectedDeadLetterIds: Dispatch<SetStateAction<string[]>>;
}) {
  useEffect(() => {
    setSelectedDeadLetterIds((current) => current.filter((item) => actionableDeadLetterIds.has(item)));
  }, [actionableDeadLetterIds, setSelectedDeadLetterIds]);
}
