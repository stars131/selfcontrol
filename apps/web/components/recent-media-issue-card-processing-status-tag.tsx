"use client";
import { getProcessingStatusLabel } from "../lib/media-issue-display";
import type { RecentMediaIssueCardProcessingStatusTagProps } from "./recent-media-issue-card-processing-status-tag.types";
export function RecentMediaIssueCardProcessingStatusTag({ issue, locale }: RecentMediaIssueCardProcessingStatusTagProps) { return <span className="tag">{getProcessingStatusLabel(locale, issue.processing_status)}</span>; }
