import type { LocaleCode } from "./locale";

const MEDIA_TYPE_LABELS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": { audio: "音频", file: "文件", image: "图片", video: "视频" },
  en: { audio: "Audio", file: "File", image: "Image", video: "Video" },
  ja: { audio: "音声", file: "ファイル", image: "画像", video: "動画" },
};

export function getMediaTypeLabel(locale: LocaleCode, mediaType: string): string {
  return MEDIA_TYPE_LABELS[locale][mediaType] ?? mediaType;
}
