import type { LocaleCode } from "./locale";

const STORAGE_PROVIDER_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": { custom: "远程", local: "本地", s3: "S3" },
  en: { custom: "Remote", local: "Local", s3: "S3" },
  ja: { custom: "リモート", local: "ローカル", s3: "S3" },
};

export function getStorageProviderLabel(locale: LocaleCode, providerCode: string): string {
  return STORAGE_PROVIDER_LABELS[locale][providerCode] ?? providerCode;
}
