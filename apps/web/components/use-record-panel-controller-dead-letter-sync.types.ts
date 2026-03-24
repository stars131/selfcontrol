"use client";
import type { Dispatch, SetStateAction } from "react";
export type UseRecordPanelControllerDeadLetterSyncInput = { actionableDeadLetterIds: Set<string>; setSelectedDeadLetterIds: Dispatch<SetStateAction<string[]>> };
