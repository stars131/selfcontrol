"use client";
import { useStoredLocale } from "../lib/locale";
import { getMediaTypeLabel } from "../lib/media-type-display";
import type { RecentMediaIssueCardIntroProps } from "./recent-media-issue-card-intro.types";
export function RecentMediaIssueCardIntro({ issue }: RecentMediaIssueCardIntroProps) { const { locale } = useStoredLocale(); return <><div className="eyebrow">{getMediaTypeLabel(locale, issue.media_type)}</div><div>{issue.original_filename}</div></>; }
