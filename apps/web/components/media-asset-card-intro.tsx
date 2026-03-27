"use client";
import { useStoredLocale } from "../lib/locale";
import { getMediaTypeLabel } from "../lib/media-type-display";
import type { MediaAssetCardIntroProps } from "./media-asset-card-intro.types";
export function MediaAssetCardIntro({ asset }: MediaAssetCardIntroProps) { const { locale } = useStoredLocale(); return <><div className="eyebrow">{getMediaTypeLabel(locale, asset.media_type)}</div><div>{asset.original_filename}</div><div className="muted">{asset.mime_type}</div></>; }
