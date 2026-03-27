import type { LocaleCode } from "./locale";

const MEDIA_STORAGE_HEALTH_STATUS_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": { ok: "正常", ready: "就绪", degraded: "降级", unreachable: "不可达", unhealthy: "异常" },
  en: { ok: "OK", ready: "Ready", degraded: "Degraded", unreachable: "Unreachable", unhealthy: "Unhealthy" },
  ja: { ok: "正常", ready: "準備完了", degraded: "一部異常", unreachable: "到達不可", unhealthy: "異常" },
};

export function getMediaStorageHealthStatusLabel(locale: LocaleCode, status: string): string {
  return MEDIA_STORAGE_HEALTH_STATUS_LABELS[locale][status] ?? status;
}
