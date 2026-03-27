"use client";
import { getMediaIssueLabel } from "../lib/media-issue-display";
import type { RecentMediaIssueCardIssueLabelTagProps } from "./recent-media-issue-card-issue-label-tag.types";
export function RecentMediaIssueCardIssueLabelTag({ issue, locale }: RecentMediaIssueCardIssueLabelTagProps) { const issueLabel = getMediaIssueLabel(locale, issue); return issueLabel ? <span className="tag">{issueLabel}</span> : null; }
