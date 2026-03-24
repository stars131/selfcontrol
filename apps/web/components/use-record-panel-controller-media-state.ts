"use client";

import { useState } from "react";

export function useRecordPanelControllerMediaState() {
  const [uploading, setUploading] = useState(false);
  const [refreshingMediaId, setRefreshingMediaId] = useState<string | null>(null);
  const [retryingMediaId, setRetryingMediaId] = useState<string | null>(null);
  const [bulkRetryingDeadLetter, setBulkRetryingDeadLetter] = useState(false);
  const [downloadingMediaId, setDownloadingMediaId] = useState<string | null>(null);
  const [deletingMediaId, setDeletingMediaId] = useState<string | null>(null);
  const [selectedDeadLetterIds, setSelectedDeadLetterIds] = useState<string[]>([]);
  return {
    uploading,
    setUploading,
    refreshingMediaId,
    setRefreshingMediaId,
    retryingMediaId,
    setRetryingMediaId,
    bulkRetryingDeadLetter,
    setBulkRetryingDeadLetter,
    downloadingMediaId,
    setDownloadingMediaId,
    deletingMediaId,
    setDeletingMediaId,
    selectedDeadLetterIds,
    setSelectedDeadLetterIds,
  };
}
