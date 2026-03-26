import detailCopySource from "./record-panel-detail-copy.json";

import type { LocaleCode } from "./locale";
import type { LocationHistoryEntry, RecordFilterState, RecordItem } from "./types";

type DetailCopy = typeof detailCopySource.en;

const DETAIL_COPY = detailCopySource as Record<LocaleCode, DetailCopy>;

function formatTimestamp(value: string | null | undefined, locale: LocaleCode, unknownLabel: string): string {
  if (!value) {
    return unknownLabel;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString(locale);
}

function formatTimelineDate(value: string, locale: LocaleCode): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

export function getRecordPanelDetailBundle(locale: LocaleCode) {
  const copy = DETAIL_COPY[locale];

  const formatRecordTypeLabel = (value?: string | null) => {
    if (value === "food") {
      return copy.recordTypeFood;
    }
    if (value === "snack") {
      return copy.recordTypeSnack;
    }
    if (value === "bad_experience") {
      return copy.recordTypeBadExperience;
    }
    if (value === "memo") {
      return copy.recordTypeMemo;
    }
    return value ? copy.recordTypeUnknown : copy.recordTypeMemo;
  };

  const formatRecordSourceLabel = (value?: string | null) => {
    if (value === "chat") {
      return copy.recordSourceChat;
    }
    if (value === "imported") {
      return copy.recordSourceImported;
    }
    if (value === "manual") {
      return copy.recordSourceManual;
    }
    return value ? copy.recordSourceUnknown : copy.recordSourceManual;
  };

  const formatRecordStatusLabel = (value?: string | null) => {
    if (value === "archived") {
      return copy.recordStatusArchived;
    }
    if (value === "active") {
      return copy.recordStatusActive;
    }
    return value ? copy.recordStatusUnknown : copy.recordStatusActive;
  };

  const formatReviewStatusLabel = (value?: string | null) => {
    if (value === "confirmed") {
      return copy.reviewConfirmed;
    }
    if (value === "needs_review") {
      return copy.reviewNeedsReview;
    }
    return copy.reviewPending;
  };

  return {
    copy,
    formatFileCountLabel(count: number) {
      if (locale === "zh-CN") {
        return `${count} 个文件`;
      }
      if (locale === "ja") {
        return `${count} 件`;
      }
      return `${count} file${count === 1 ? "" : "s"}`;
    },
    formatRecordSourceLabel,
    formatRecordStatusLabel,
    formatRecordTypeLabel,
    formatReviewStatusLabel,
    summarizeHistoryActionLabel(entry: LocationHistoryEntry) {
      if (entry.action_code === "set") {
        return copy.historyInitialLocation;
      }
      if (entry.action_code === "moved") {
        return copy.historyLocationCorrected;
      }
      if (entry.action_code === "removed") {
        return copy.historyLocationRemoved;
      }
      if (entry.action_code === "review") {
        return copy.historyReviewUpdated;
      }
      return entry.action_code;
    },
    summarizeRecordFilterLabel(filter: RecordFilterState) {
      const parts: string[] = [];
      if (filter.query) {
        parts.push(`${copy.filterText}:${filter.query}`);
      }
      if (filter.typeCode !== "all") {
        parts.push(`${copy.filterType}:${formatRecordTypeLabel(filter.typeCode)}`);
      }
      if (filter.avoidOnly !== "all") {
        parts.push(filter.avoidOnly === "avoid" ? copy.filterAvoidOnly : copy.filterNonAvoid);
      }
      if (filter.placeQuery) {
        parts.push(`${copy.filterPlace}:${filter.placeQuery}`);
      }
      if (filter.reviewStatus !== "all") {
        parts.push(`${copy.filterReview}:${formatReviewStatusLabel(filter.reviewStatus)}`);
      }
      if (filter.mappedOnly !== "all") {
        parts.push(filter.mappedOnly === "mapped" ? copy.filterMapped : copy.filterUnmapped);
      }
      return parts.length ? parts.join(" | ") : copy.allRecords;
    },
    formatHistoryTimestampLabel(value?: string | null) {
      return formatTimestamp(value, locale, copy.unknownTime);
    },
    formatReminderTimestampLabel(value: string) {
      return formatTimestamp(value, locale, copy.unknownTime);
    },
    formatRecordTimestampLabel(record: RecordItem) {
      return formatTimestamp(record.occurred_at || record.created_at, locale, copy.unknownTime);
    },
    formatTimelineDateLabel(value: string) {
      return formatTimelineDate(value, locale);
    },
    formatReminderStatusLabel(status: string) {
      if (status === "completed") {
        return locale === "zh-CN" ? "已完成" : locale === "ja" ? "完了" : "completed";
      }
      if (status === "pending") {
        return locale === "zh-CN" ? "待执行" : locale === "ja" ? "待機中" : "pending";
      }
      if (status === "cancelled") {
        return locale === "zh-CN" ? "已取消" : locale === "ja" ? "取り消し" : "cancelled";
      }
      if (status === "failed") {
        return locale === "zh-CN" ? "失败" : locale === "ja" ? "失敗" : "failed";
      }
      return status;
    },
    formatReminderEnabledLabel(isEnabled: boolean) {
      return isEnabled ? copy.reminderEnabled : copy.reminderPaused;
    },
    formatTimelineCountLabel(count: number) {
      if (locale === "zh-CN") {
        return `当日 ${count} 项`;
      }
      if (locale === "ja") {
        return `当日 ${count} 件`;
      }
      return `${count} item${count === 1 ? "" : "s"} on this day`;
    },
    formatAvoidCountLabel(count: number) {
      if (locale === "en") {
        return `avoid ${count}`;
      }
      return `${copy.avoidLabel} ${count}`;
    },
  };
}
